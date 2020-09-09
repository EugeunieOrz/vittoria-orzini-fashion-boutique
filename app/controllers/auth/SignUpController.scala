package controllers.auth

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import java.time.Clock
import com.google.inject.name.Named
import forms.auth.SignUpForm
import utils.auth.json.APIFormats._
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.util.PasswordHasherRegistry
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import com.mohiva.play.silhouette.impl.authenticators.CookieAuthenticator
import com.mohiva.play.silhouette.api.Authenticator.Implicits._
import models.core.services.UserService
import models.core.{
  AccountData,
  Address,
  CreateAccount,
  CreditCard,
  Registration,
  Settings,
  SignUpEmail,
  SignUpToShop,
  User,
  NewsletterFashion,
  NewsletterFineJewelry,
  NewsletterHomeCollection,
  Newsletter,
  AgeLimit,
  SubscribeToNewsletter
}
import utils.core.json.APIFormats._
import utils.silhouette.{ BoutiqueEnv, CustomerController }
import utils.core.JSRouter
import javax.inject.Inject
import org.joda.time.DateTime
import net.ceedubs.ficus.Ficus._
import models.newsletter.services.{ NewsletterService, NewsletterTaskService }
import play.api.Configuration
import play.api.http.HeaderNames
import play.api.i18n.{ Lang, Messages, MessagesApi }
import play.api.libs.json._
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
 * @param passwordHasherRegistry The password hasher registry.
 * @param mailerClient           The mailer client.
 * @param configuration          The Play configuration.
 * @param clock                  The clock instance.
 * @param jsRouter               The JS router helper.
 * @param ex                     The execution context.
 */
class SignUpController @Inject() (
  val controllerComponents: ControllerComponents,
  val silhouette: Silhouette[BoutiqueEnv[User]],
  @Named("customer-auth-info-repository") authInfoRepository: AuthInfoRepository,
  @Named("customer-credentials-provider") credentialsProvider: CredentialsProvider,
  passwordHasherRegistry: PasswordHasherRegistry,
  userService: UserService,
  mailerClient: MailerClient,
  messagesApi: MessagesApi,
  newsletterService: NewsletterService,
  newsletterTaskService: NewsletterTaskService,
  configuration: Configuration,
  clock: Clock,
  jsRouter: JSRouter
)(
  implicit
  ex: ExecutionContext
) extends CustomerController {

  implicit val messagesApi2 = messagesApi

  /**
   * Sign up a user.
   *
   * @return A Play result.
   */
  def signUp: Action[AnyContent] = UnsecuredAction.async { implicit request =>
    SignUpForm.form.bindFromRequest.fold(
      form => Future.successful(BadRequest(
        ApiResponse("invalid.form", Messages("invalid.form"), form.errors)
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
          email = Some(data.email),
          accountStatus = "Active",
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
          ageLimit = Some(AgeLimit(data.ageLimit)),
          dateOfBirth = None,
          passwordSurvey = None,
          loginAttempts = None,
          addressBook = None,
          cardWallet = None,
          newsletters = Some(Newsletter(
            newsletterFashion = NewsletterFashion(data.newsletterFashion),
            newsletterFineJewelry = NewsletterFineJewelry(data.newsletterFineJewelry),
            newsletterHomeCollection = NewsletterHomeCollection(data.newsletterHomeCollection)
          )),
          wishlist = None,
          orders = None,
          shoppingBag = None,
          notifications = None
        )
        userService.retrieve(loginInfo).flatMap {
          case Some(customer) => {
            // subscribe to a newsletter according to newsletter preferences of the user
            if (data.newsletterFashion == true ||
            data.newsletterFineJewelry == true ||
            data.newsletterHomeCollection == true) {
              newsletterService.retrieve(data.email).flatMap {
                case Some(n) => newsletterService.save(n.copy(
                  newsletterFashion = NewsletterFashion(data.newsletterFashion),
                  newsletterFineJewelry = NewsletterFineJewelry(data.newsletterFineJewelry),
                  newsletterHomeCollection = NewsletterHomeCollection(data.newsletterHomeCollection)
                ))
                case None =>
                  val newsl = SubscribeToNewsletter(
                    id = BSONObjectID.generate,
                    email = data.email,
                    lang = request.lang,
                    newsletterFashion = NewsletterFashion(
                      isChecked = data.newsletterFashion
                    ),
                    newsletterFineJewelry = NewsletterFineJewelry(
                      isChecked = data.newsletterFineJewelry
                    ),
                    newsletterHomeCollection = NewsletterHomeCollection(
                      isChecked = data.newsletterHomeCollection
                    )
                  )
                  newsletterService.save(newsl)
                  newsletterTaskService.create(
                    request.lang,
                    data.email,
                    data.newsletterFashion,
                    data.newsletterFineJewelry,
                    data.newsletterHomeCollection
                  )
              }
            }
            // subscribe to a newsletter according to newsletter preferences of the user
            handleExistingUser(data, request.lang, customer)
            Future.successful(Created(ApiResponse(
              "auth.email.already.in.use",
              Messages("auth.email.already.in.use"))))
          }
          case None => {
            signUpNewUser(data, request.lang, loginInfo, user)
          }
        }
      }
    )
  }

  /**
   * Sign up a user with a shopping bag.
   *
   * @return A Play result.
   */
  def signUpToShop: Action[JsValue] = UnsecuredAction(parse.json).async { implicit request =>
    request.body.validate[SignUpToShop].fold(
      errors => Future.successful(
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
      data => {
        val loginInfo = LoginInfo(CredentialsProvider.ID, data.data.email)
        val userID = BSONObjectID.generate
        val user = User(
          id = userID,
          loginInfo = Seq(loginInfo),
          title = Some(data.data.title),
          firstName = Some(data.data.firstName),
          lastName = Some(data.data.lastName),
          email = Some(data.data.email),
          accountStatus = "Active",
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
          ageLimit = Some(AgeLimit(
            ageLimit = data.data.ageLimit
          )),
          dateOfBirth = None,
          passwordSurvey = None,
          loginAttempts = None,
          addressBook = None,
          cardWallet = None,
          newsletters = Some(Newsletter(
            newsletterFashion = NewsletterFashion(data.data.newsletterFashion),
            newsletterFineJewelry = NewsletterFineJewelry(data.data.newsletterFineJewelry),
            newsletterHomeCollection = NewsletterHomeCollection(data.data.newsletterHomeCollection)
          )),
          wishlist = None,
          orders = None,
          shoppingBag = Some(data.shoppingBag),
          notifications = None
        )
        userService.retrieve(loginInfo).flatMap {
          case Some(customer) => {
            // subscribe to a newsletter according to newsletter preferences of the user
            if (data.data.newsletterFashion == true ||
            data.data.newsletterFineJewelry == true ||
            data.data.newsletterHomeCollection == true) {
              newsletterService.retrieve(data.data.email).flatMap {
                case Some(n) => newsletterService.save(n.copy(
                  newsletterFashion = NewsletterFashion(data.data.newsletterFashion),
                  newsletterFineJewelry = NewsletterFineJewelry(data.data.newsletterFineJewelry),
                  newsletterHomeCollection = NewsletterHomeCollection(data.data.newsletterHomeCollection)
                ))
                case None =>
                  val newsl = SubscribeToNewsletter(
                    id = BSONObjectID.generate,
                    email = data.data.email,
                    lang = request.lang,
                    newsletterFashion = NewsletterFashion(
                      isChecked = data.data.newsletterFashion
                    ),
                    newsletterFineJewelry = NewsletterFineJewelry(
                      isChecked = data.data.newsletterFineJewelry
                    ),
                    newsletterHomeCollection = NewsletterHomeCollection(
                      isChecked = data.data.newsletterHomeCollection
                    )
                  )
                  newsletterService.save(newsl)
                  newsletterTaskService.create(
                    request.lang,
                    data.data.email,
                    data.data.newsletterFashion,
                    data.data.newsletterFineJewelry,
                    data.data.newsletterHomeCollection
                  )
              }
            }
            handleExistingUserShopping(data, request.lang, customer)
            Future.successful(Created(ApiResponse(
              "auth.email.already.in.use", Messages("auth.email.already.in.use"))))
          }
          case None => {
            signUpNewUserShopping(data, request.lang, loginInfo, user)
          }
        }
      }
    )
  }

  /**
   * Sign up a user with a shopping bag.
   *
   * @return A Play result.
   */
  def createAccount: Action[JsValue] = UnsecuredAction(parse.json).async { implicit request =>
    request.body.validate[CreateAccount].fold(
      errors => Future.successful(
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
      data => {
        val loginInfo = LoginInfo(CredentialsProvider.ID, data.data.email)
        val userID = BSONObjectID.generate
        val user = User(
          id = userID,
          loginInfo = Seq(loginInfo),
          title = Some(data.data.title),
          firstName = Some(data.data.firstName),
          lastName = Some(data.data.lastName),
          email = Some(data.data.email),
          accountStatus = "Active",
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
          ageLimit = Some(AgeLimit(
            ageLimit = data.data.ageLimit
          )),
          dateOfBirth = None,
          passwordSurvey = None,
          loginAttempts = None,
          addressBook = None,
          cardWallet = None,
          newsletters = None,
          wishlist = None,
          orders = None,
          shoppingBag = Some(data.shoppingBag),
          notifications = None
        )
        val data2 = SignUpToShop(
          data = SignUpEmail(
            title = data.data.title,
            firstName = data.data.firstName,
            lastName = data.data.lastName,
            email = data.data.email,
            password = data.data.password,
            newsletterFashion = false,
            newsletterFineJewelry = false,
            newsletterHomeCollection = false,
            ageLimit = data.data.ageLimit
          ),
          shoppingBag = data.shoppingBag
        )
        userService.retrieve(loginInfo).flatMap {
          case Some(customer) => {
            handleExistingUserShopping(data2, request.lang, customer)
            Future.successful(Created(ApiResponse(
              "auth.email.already.in.use", Messages("auth.email.already.in.use"))))
          }
          case None => {
            signUpNewUserShopping(data2, request.lang, loginInfo, user)
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
  private def handleExistingUser(
    data: SignUpForm.Data,
    lang: Lang,
    user: User
  )(
    implicit
    request: RequestHeader
  ): Future[Unit] = Future {
    val url = jsRouter.absoluteURL("/auth/sign-in")
    mailerClient.send(Email(
      subject = messagesApi("auth.email.already.signed.up.subject")(lang),
      from = messagesApi("email.from")(lang),
      to = Seq(data.email),
      bodyText = Some(twirl.core.views.txt.emails.alreadySignedUp(user, url)(messagesApi, lang).body),
      bodyHtml = Some(twirl.core.views.html.emails.alreadySignedUp(user, url)(messagesApi, lang).body)
    ))
  }

  /**
   * Handle an existing user.
   *
   * @param data    The form data.
   * @param user    The user data.
   * @param request The request header.
   * @return A future to wait for the computation to complete.
   */
  private def handleExistingUserShopping(
    data: SignUpToShop,
    lang: Lang,
    user: User
  )(
    implicit
    request: RequestHeader
  ): Future[Unit] = Future {
    val url = jsRouter.absoluteURL("/auth/sign-in")
    mailerClient.send(Email(
      subject = messagesApi("auth.email.already.signed.up.subject")(lang),
      from = messagesApi("email.from")(lang),
      to = Seq(data.data.email),
      bodyText = Some(twirl.core.views.txt.emails.alreadySignedUp(user, url)(messagesApi, lang).body),
      bodyHtml = Some(twirl.core.views.html.emails.alreadySignedUp(user, url)(messagesApi, lang).body)
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
    lang: Lang,
    loginInfo: LoginInfo,
    user: User
  )(
    implicit
    request: RequestHeader
  ): Future[Result] = {
    println("creating account")
    val authInfo = passwordHasherRegistry.current.hash(data.password)
    for {
      user <- userService.save(user)
      _ <- authInfoRepository.add(loginInfo, authInfo)
      authenticator <- env.authenticatorService.create(loginInfo)
      cookie <- env.authenticatorService.init(configureAuthenticator(true, authenticator))
      result <- env.authenticatorService.embed(
        cookie,
        Ok(ApiResponse(
          "auth.signed.in",
          Messages("auth.signed.in"),
          Json.toJson((user))
        ))
      )
    } yield {
      mailerClient.send(Email(
        subject = messagesApi("auth.email.sign.up.subject")(lang),
        from = messagesApi("email.from")(lang),
        to = Seq(data.email),
        bodyText = Some(twirl.core.views.txt.emails.signUp(user)(messagesApi, lang).body),
        bodyHtml = Some(twirl.core.views.html.emails.signUp(user)(messagesApi, lang).body)
      ))
      env.eventBus.publish(SignUpEvent(user, request))
      env.eventBus.publish(LoginEvent(user, request))
      result
    }
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
  private def signUpNewUserShopping(
    data: SignUpToShop,
    lang: Lang,
    loginInfo: LoginInfo,
    user: User
  )(
    implicit
    request: RequestHeader
  ): Future[Result] = {
    val authInfo = passwordHasherRegistry.current.hash(data.data.password)
    for {
      user <- userService.save(user)
      _ <- authInfoRepository.add(loginInfo, authInfo)
      authenticator <- env.authenticatorService.create(loginInfo)
      cookie <- env.authenticatorService.init(configureAuthenticator(true, authenticator))
      result <- env.authenticatorService.embed(
        cookie,
        Ok(ApiResponse(
          "auth.signed.in",
          Messages("auth.signed.in"),
          Json.toJson((user))
        ))
      )
    } yield {
      mailerClient.send(Email(
        subject = messagesApi("auth.email.sign.up.subject")(lang),
        from = messagesApi("email.from")(lang),
        to = Seq(data.data.email),
        bodyText = Some(twirl.core.views.txt.emails.signUp(user)(messagesApi, lang).body),
        bodyHtml = Some(twirl.core.views.html.emails.signUp(user)(messagesApi, lang).body)
      ))
      env.eventBus.publish(SignUpEvent(user, request))
      env.eventBus.publish(LoginEvent(user, request))
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
  private def configureAuthenticator(rememberMe: Boolean, authenticator: CookieAuthenticator): CookieAuthenticator = {
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
