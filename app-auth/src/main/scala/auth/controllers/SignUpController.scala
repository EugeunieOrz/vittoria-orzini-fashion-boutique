package auth.controllers

import java.time.Clock

import auth.forms.SignUpForm
import auth.utils.json.APIFormats._
import auth.models.services.AuthTokenService
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.AvatarService
import com.mohiva.play.silhouette.api.util.PasswordHasherRegistry
import com.mohiva.play.silhouette.impl.providers._
import core.controllers.ApiController
import core.models.services.UserService
import core.models.{ Address, Config, CreditCard, Registration, Settings, Updates, User, NewsletterFashion, NewsletterVintage, NewsletterHomeCollection, Newsletter }
import core.utils.{ DefaultEnv, JSRouter }
import core.utils.json.APIFormats._
import javax.inject.Inject
import org.joda.time.DateTime
import net.ceedubs.ficus.Ficus._
import play.api.Configuration
import play.api.http.HeaderNames
import play.api.i18n.Messages
import play.api.libs.json.Json
import play.api.libs.mailer.{ Email, MailerClient }
import play.api.mvc._
import reactivemongo.bson.BSONObjectID

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future }
import scala.language.postfixOps

/**
 * The `Sign Up` controller.
 *
 * @param controllerComponents   The Play controller components.
 * @param silhouette             The Silhouette stack.
 * @param userService            The user service implementation.
 * @param authInfoRepository     The auth info repository implementation.
 * @param authTokenService       The auth token service implementation.
 * @param avatarService          The avatar service implementation.
 * @param passwordHasherRegistry The password hasher registry.
 * @param mailerClient           The mailer client.
 * @param configuration          The Play configuration.
 * @param clock                  The clock instance.
 * @param jsRouter               The JS router helper.
 * @param ex                     The execution context.
 */
class SignUpController @Inject() (
  val controllerComponents: ControllerComponents,
  silhouette: Silhouette[DefaultEnv],
  userService: UserService,
  authInfoRepository: AuthInfoRepository,
  authTokenService: AuthTokenService,
  avatarService: AvatarService,
  passwordHasherRegistry: PasswordHasherRegistry,
  mailerClient: MailerClient,
  configuration: Configuration,
  clock: Clock,
  jsRouter: JSRouter
)(
  implicit
  ex: ExecutionContext
) extends ApiController {

  /**
   * Sign up a user.
   *
   * @return A Play result.
   */
  def signUp: Action[AnyContent] = silhouette.UnsecuredAction.async { implicit request =>
    SignUpForm.form.bindFromRequest.fold(
      form => Future.successful(BadRequest(
        ApiResponse("auth.signUp.form.invalid", Messages("invalid.form"), form.errors)
      )),
      data => {
        val loginInfo = LoginInfo(CredentialsProvider.ID, data.email)
        val userID = BSONObjectID.generate
        val user = User(
          id = userID,
          loginInfo = Seq(loginInfo),
          title = Some(data.title),
          firstName = Some(data.firstName),
          lastName = Some(data.lastName),
          name = Some(data.firstName + " " + data.lastName),
          email = Some(data.email),
          avatarURL = None,
          registration = Registration(
            lang = request.lang,
            ip = request.remoteAddress,
            host = request.headers.get(HeaderNames.HOST),
            userAgent = request.headers.get(HeaderNames.USER_AGENT),
            dateTime = clock.instant()
          ),
          settings = Settings(
            lang = request.lang,
            timeZone = None
          ),
          dateOfBirth = None,
          passwordSurvey = None,
          addressBook = None,
          creditWallet = None,
          newsletters = Some(Seq(Newsletter(
            updates = Some(Updates(data.updates)),
            newsletterFashion = Some(NewsletterFashion(data.newsletterFashion)),
            newsletterVintage = Some(NewsletterVintage(data.newsletterVintage)),
            newsletterHomeCollection = Some(NewsletterHomeCollection(data.newsletterHomeCollection))
          )))
        )
        userService.retrieve(loginInfo).flatMap {
          case Some(customer) => {
            handleExistingUser(data, customer)
            Future.successful(Created(ApiResponse("auth.email.already.in.use", Messages("auth.email.already.in.use"))))
          }
          case None => {
            signUpNewUser(data, loginInfo, user)
          }
        }
      }
    )
  }

  /**
   * Handle an existing user.
   *
   * @param data    The form data.
   * @param user    The user data.
   * @param request The request header.
   * @return A future to wait for the computation to complete.
   */
  private def handleExistingUser(data: SignUpForm.Data, user: User)(
    implicit
    request: RequestHeader
  ): Future[Unit] = Future {
    val url = jsRouter.absoluteURL("/auth/sign-in")
    mailerClient.send(Email(
      subject = Messages("auth.email.already.signed.up.subject"),
      from = Messages("email.from"),
      to = Seq(data.email),
      bodyText = Some(auth.views.txt.emails.alreadySignedUp(user, url).body),
      bodyHtml = Some(auth.views.html.emails.alreadySignedUp(user, url).body)
    ))
  }

  /**
   * Sign up a new user.
   *
   * @param data       The form data.
   * @param loginInfo  The login info.
   * @param user       The new user.
   * @param request    The request header.
   * @return A future to wait for the computation to complete.
   */
  private def signUpNewUser(
    data: SignUpForm.Data,
    loginInfo: LoginInfo,
    user: User
  )(
    implicit
    request: RequestHeader
  ): Future[Result] = {
    val authInfo = passwordHasherRegistry.current.hash(data.password)
    for {
      avatar <- avatarService.retrieveURL(data.email)
      user <- userService.save(user.copy(avatarURL = avatar))
      _ <- authInfoRepository.add(loginInfo, authInfo)
      authenticator <- silhouette.env.authenticatorService.create(loginInfo)
      cookie <- silhouette.env.authenticatorService.init(configureAuthenticator(true, authenticator))
      result <- silhouette.env.authenticatorService.embed(
        cookie,
        Ok(ApiResponse(
          "auth.signIn.successful",
          Messages("auth.signed.in"),
          Json.toJson((user))
        ))
      )
    } yield {
      val url = jsRouter.absoluteURL("/auth/account/activation/")
      mailerClient.send(Email(
        subject = Messages("auth.email.sign.up.subject"),
        from = Messages("email.from"),
        to = Seq(data.email),
        bodyText = Some(auth.views.txt.emails.signUp(user, url).body),
        bodyHtml = Some(auth.views.html.emails.signUp(user, url).body)
      ))
      silhouette.env.eventBus.publish(SignUpEvent(user, request))
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
