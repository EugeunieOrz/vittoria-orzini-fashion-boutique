package controllers.auth

import com.google.inject.name.Named
import java.time.{ Clock, LocalDateTime, ZoneId }
import java.util.UUID
import javax.inject.Inject
import models.auth.AuthToken
import models.auth.services.AuthTokenService
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.util.{ PasswordHasherRegistry, PasswordInfo }
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import models.core.{ LoginEmail, LoginAttempt, PasswordSurvey, UserLoginAttempts, User }
import models.core.services.UserService
import utils.core.json.APIFormats._
import utils.silhouette.{ BoutiqueEnv, CustomerController }
import utils.core.JSRouter
import net.ceedubs.ficus.Ficus._
import play.api.Configuration
import play.api.data.Forms._
import play.api.data._
import play.api.i18n.{ Lang, Messages, MessagesApi, MessagesProvider }
import play.api.libs.mailer.{ Email, MailerClient }
import play.api.mvc.{ Action, AnyContent, ControllerComponents, Result }
import play.api.libs.json._
import play.api.libs.functional.syntax._
import reactivemongo.bson.BSONObjectID

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future }

/**
 * The `Password` controller.
 *
 * @param controllerComponents   The Play controller components.
 * @param silhouette             The Silhouette stack.
 * @param userService            The user service implementation.
 * @param authInfoRepository     The auth info repository.
 * @param authTokenService       The auth token service implementation.
 * @param passwordHasherRegistry The password hasher registry.
 * @param mailerClient           The mailer client.
 * @param configuration          The Play configuration.
 * @param jsRouter               The JS router helper.
 * @param ex                     The execution context.
 */
class PasswordController @Inject() (
  val controllerComponents: ControllerComponents,
  val silhouette: Silhouette[BoutiqueEnv[User]],
  userService: UserService,
  @Named("customer-auth-info-repository") authInfoRepository: AuthInfoRepository,
  authTokenService: AuthTokenService,
  passwordHasherRegistry: PasswordHasherRegistry,
  mailerClient: MailerClient,
  messagesApi: MessagesApi,
  configuration: Configuration,
  jsRouter: JSRouter,
  clock: Clock
)(
  implicit
  ex: ExecutionContext
) extends CustomerController {

  /**
   * Requests an email with password recovery instructions.
   *
   * It sends an email to the given address if it exists in the database. Otherwise we do not show the user
   * a notice for not existing email addresses to prevent the leak of existing email addresses.
   *
   * @return A Play result.
   */
  def recover: Action[AnyContent] = UnsecuredAction.async { implicit request =>
    Form("email" -> email).bindFromRequest.fold(
      form => Future.successful(BadRequest(
        ApiResponse("invalid.form", Messages("invalid.form"), form.errors)
      )),
      email => {
        val loginInfo = LoginInfo(CredentialsProvider.ID, email)
        val result = Ok(
          ApiResponse(
            "auth.reset.email.sent",
            Messages("auth.reset.email.sent"), Json.toJson(email)))
        userService.retrieve(loginInfo).flatMap {
          case Some(user) =>
            val c = configuration.underlying
            val tokenExpiry = c.getAs[FiniteDuration](s"auth.authToken.expiry").getOrElse(5 minutes)
            authTokenService.create(user.id, tokenExpiry).map { authToken =>
              val url = jsRouter.absoluteURL("/auth/password/recovery/" + authToken.id)
              if (user.title == "SIG." || user.title == "SIG.NA" || user.title == "SIG.RA") {
                mailerClient.send(Email(
                  subject = messagesApi("auth.email.reset.password.subject")(Lang("it")),
                  from = messagesApi("email.from")(Lang("it")),
                  to = Seq(email),
                  bodyText = Some(twirl.core.views.txt.emails.resetPassword(
                    user, url)(messagesApi, Lang("it")).body),
                  bodyHtml = Some(twirl.core.views.html.emails.resetPassword(
                    user, url)(messagesApi, Lang("it")).body)
                ))
              } else {
                mailerClient.send(Email(
                  subject = messagesApi("auth.email.reset.password.subject")(Lang("en")),
                  from = messagesApi("email.from")(Lang("en")),
                  to = Seq(email),
                  bodyText = Some(twirl.core.views.txt.emails.resetPassword(
                    user, url)(messagesApi, Lang("en")).body),
                  bodyHtml = Some(twirl.core.views.html.emails.resetPassword(
                    user, url)(messagesApi, Lang("en")).body)
                ))
              }
              result
            }
          case None => Future.successful(result)
        }
      }
    )
  }

  /**
   * Resets the password.
   *
   * @param token The token to identify a user.
   * @return A Play result.
   */
  def reset(token: UUID): Action[AnyContent] = UnsecuredAction.async { implicit request =>
    validateToken(token, authToken =>
      Form("password" -> nonEmptyText).bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("invalid.form", Messages("invalid.form"), form.errors)
        )),
        password => userService.retrieve(authToken.userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            val passwordInfo = passwordHasherRegistry.current.hash(password)
            val loginInfo = user.loginInfo.find(_.providerID == CredentialsProvider.ID).get
            userService.save(user.copy(accountStatus = "Active"))
            authInfoRepository.update[PasswordInfo](loginInfo, passwordInfo).map { _ =>
              Ok(ApiResponse(
                "auth.password.reset", Messages("auth.password.reset"), authToken.userID.toString))
            }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }
      )
    )
  }

  /**
   * An action that validates if a token is valid.
   *
   * @param token The token to validate.
   * @return A Play result.
   */
  def validate(token: UUID): Action[AnyContent] = UnsecuredAction.async { implicit request =>
    validateToken(token, _ => {
      Future.successful(Ok(ApiResponse("auth.valid.reset.link", Messages("auth.valid.reset.link"))))
    })
  }

  /**
   * A helper function which validates the reset token and either returns a HTTP 400 result in case of
   * invalidity or a block that returns another result in case of validity.
   *
   * @param token            The token to validate.
   * @param f                The block to execute if the token is valid.
   * @param messagesProvider The Play messages provider.
   * @return A Play result.
   */
  private def validateToken(token: UUID, f: AuthToken => Future[Result])(
    implicit
    messagesProvider: MessagesProvider
  ): Future[Result] = {
    authTokenService.validate(token).flatMap {
      case Some(authToken) => f(authToken)
      case None =>
        Future.successful(
          BadRequest(ApiResponse("auth.invalid.reset.link", Messages("auth.invalid.reset.link")))
        )
    }
  }

  /**
   * Persists password survey's data.
   *
   * @param userID The user's id.
   * @return A Play result.
   */
  def submitPasswordSurvey: Action[AnyContent] =
    UnsecuredAction.async { implicit request =>
      request.body.asJson.map { json =>
        json.validate[PasswordSurvey] match {
          case JsSuccess(value, _) =>
            userService.retrieve(value.userID).flatMap {
              case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
                userService.save(user.copy(passwordSurvey =
                  Some(user.passwordSurvey.getOrElse(Seq("")) :+ value.psInfo))).map { _ =>
                  Ok(ApiResponse("auth.password.survey", Messages("auth.password.survey")))
                }
              case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
            }
          case e: JsError => Future.successful(
            BadRequest(ApiResponse(
              "auth.invalid.survey",
              Messages("auth.invalid.survey"), JsError.toJson(e).toString()))
          )
        }
      }
      Future.successful(Ok(ApiResponse(
        "auth.password.survey", Messages("auth.password.survey"))))
    }

}
