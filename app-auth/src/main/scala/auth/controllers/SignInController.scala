package auth.controllers

import java.time.Clock

import auth.forms.SignInForm
import auth.utils.json.APIFormats._
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.util.Credentials
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers._
import core.controllers.ApiController
import core.models.{ Address, CreditCard, Newsletter, User }
import core.models.services.UserService
import core.utils.DefaultEnv
import core.utils.json.APIFormats._
import javax.inject.Inject
import net.ceedubs.ficus.Ficus._
import org.joda.time.DateTime
import play.api.Configuration
import play.api.i18n.{ Messages, MessagesProvider }
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future }

/**
 * The `Sign In` controller.
 *
 * @param controllerComponents  The Play controller components.
 * @param silhouette            The Silhouette stack.
 * @param userService           The user service implementation.
 * @param creditCardsService     The credit cards service implementation.
 * @param newsletterService      The newsletter subscription service implementation.
 * @param addressesService       The addresses service implementation.
 * @param credentialsProvider   The credentials provider.
 * @param configuration         The Play configuration.
 * @param clock                 The clock instance.
 * @param ex                    The execution context.
 */
class SignInController @Inject() (
  val controllerComponents: ControllerComponents,
  silhouette: Silhouette[DefaultEnv],
  userService: UserService,
  credentialsProvider: CredentialsProvider,
  configuration: Configuration,
  clock: Clock
)(
  implicit
  ex: ExecutionContext
) extends ApiController {

  /**
   * Sign in a user.
   *
   * @return A Play result.
   */
  def signIn: Action[AnyContent] = silhouette.UnsecuredAction.async { implicit request =>
    SignInForm.form.bindFromRequest.fold(
      form => Future.successful(BadRequest(
        ApiResponse("auth.signIn.form.invalid", Messages("invalid.form"), form.errors)
      )),
      data => {
        credentialsProvider.authenticate(Credentials(data.email, data.password)).flatMap { loginInfo =>
          userService.retrieve(loginInfo).flatMap {
            case Some(user) =>
              handleActiveUser(
                user,
                loginInfo,
                data.rememberMe
              )
            case None =>
              Future.failed(new IdentityNotFoundException("Couldn't find user"))
          }
        }.recover {
          case _: ProviderException =>
            BadRequest(ApiResponse("auth.signIn.credentials", Messages("auth.invalid.credentials")))
        }
      }
    )
  }

  /**
   * Handles the active user.
   *
   * @param user       The active user.
   * @param addresses  The addresses of the active user.
   * @param newsletter The newsletter subscription data of the active user.
   * @param creditCards The credit cards of the active user.
   * @param loginInfo  The login info for the current authentication.
   * @param rememberMe True if the cookie should be a persistent cookie, false otherwise.
   * @param request    The current request header.
   * @return A Play result.
   */
  private def handleActiveUser(
    user: User,
    loginInfo: LoginInfo,
    rememberMe: Boolean
  )(implicit request: RequestHeader): Future[Result] = {
    for {
      authenticator <- silhouette.env.authenticatorService.create(loginInfo)
      cookie <- silhouette.env.authenticatorService.init(configureAuthenticator(rememberMe, authenticator))
      result <- silhouette.env.authenticatorService.embed(
        cookie,
        Ok(ApiResponse(
          "auth.signIn.successful",
          Messages("auth.signed.in"),
          Json.toJson((user))
        ))
      )
    } yield {
      silhouette.env.eventBus.publish(LoginEvent(user, request))
      result
    }
  }

  /**
   * Changes the default authenticator config if the remember me flag was activated during sign-in.
   *
   * @param rememberMe    True if the cookie should be a persistent cookie, false otherwise.
   * @param authenticator The authenticator instance.
   * @return The changed authenticator if the remember me flag was activated, otherwise the unchanged authenticator.
   */
  private def configureAuthenticator(rememberMe: Boolean, authenticator: DefaultEnv#A): DefaultEnv#A = {
    if (rememberMe) {
      val c = configuration.underlying
      val configPath = "silhouette.authenticator.rememberMe"
      val authenticatorExpiry = c.as[FiniteDuration](s"$configPath.authenticatorExpiry").toMillis
      val instant = clock.instant().plusMillis(authenticatorExpiry)
      val expirationDateTime = new DateTime(instant.toEpochMilli)

      authenticator.copy(
        expirationDateTime = expirationDateTime,
        idleTimeout = c.getAs[FiniteDuration](s"$configPath.authenticatorIdleTimeout"),
        cookieMaxAge = c.getAs[FiniteDuration](s"$configPath.cookieMaxAge")
      )
    } else {
      authenticator
    }
  }
}
