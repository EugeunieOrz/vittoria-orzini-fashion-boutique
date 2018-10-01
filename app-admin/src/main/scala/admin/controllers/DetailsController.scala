package admin.controllers

import java.util.UUID
import admin.forms.{ AddNewAddressForm, DateOfBirthForm, EditEmailForm, EditNameForm, ChangePasswordForm, NewsletterForm }
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.AvatarService
import com.mohiva.play.silhouette.api.util.Credentials
import com.mohiva.play.silhouette.api.util.{ PasswordHasher, PasswordHasherRegistry, PasswordInfo }
import com.mohiva.play.silhouette.impl.exceptions.{ IdentityNotFoundException, InvalidPasswordException }
import com.mohiva.play.silhouette.impl.providers._
import core.controllers.ApiController
import core.models.{ AdditionalInfo, Address, Addresses, BillingAddressMark, DefaultShippingAddressMark, NewsletterFashion, NewsletterVintage, NewsletterHomeCollection, TelephoneDay, TelephoneEvening, Updates, User }
import core.models.services.{ AddressesService, NewsletterService, UserService }
import core.utils.DefaultEnv
import core.utils.json.APIFormats._
import javax.inject.Inject
import net.ceedubs.ficus.Ficus._
import org.joda.time.DateTime
import play.api.i18n.{ Messages, MessagesProvider }
import play.api.libs.json.Json
import play.api.mvc._
import reactivemongo.bson.BSONObjectID

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future }

/**
 * The `Details` controller.
 *
 * @param controllerComponents  The Play controller components.
 * @param credentialsProvider   The credentials provider.
 * @param authInfoRepository     The auth info repository.
 * @param avatarService          The avatar service implementation.
 * @param newsletterService      The newsletter subscription service implementation.
 * @param addressesService       The addresses service implementation.
 * @param passwordHasherRegistry The password hasher registry.
 * @param silhouette            The Silhouette stack.
 * @param userService           The user service implementation.
 * @param ex                    The execution context.
 */
class DetailsController @Inject() (
  val controllerComponents: ControllerComponents,
  credentialsProvider: CredentialsProvider,
  authInfoRepository: AuthInfoRepository,
  avatarService: AvatarService,
  newsletterService: NewsletterService,
  addressesService: AddressesService,
  passwordHasher: PasswordHasher,
  passwordHasherRegistry: PasswordHasherRegistry,
  silhouette: Silhouette[DefaultEnv],
  userService: UserService
)(
  implicit
  ex: ExecutionContext
) extends ApiController {

  /**
   * Updates user's date of birth.
   *
   * @return A Play result.
   */
  def updateDetails(userID: BSONObjectID): Action[AnyContent] =
    silhouette.SecuredAction.async { implicit request =>
      DateOfBirthForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("admin.dateOfBirth.form.invalid", Messages("invalid.form"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            val updatedUser = user.copy(
              dateOfBirth = Some(data.bday + "/" + data.bmonth + "/" + data.byear)
            )
            userService.save(updatedUser).map { usr =>
              Ok(ApiResponse(
                "admin.details.update.successful",
                Messages("admin.details.update"),
                Json.toJson(usr)))
            }
          case _ => Future.successful(
            BadRequest(ApiResponse("admin.details.invalid", Messages("admin.details.invalid")))
          )
        }
      )
    }

  /**
   * Updates user's title and name.
   *
   * @return A Play result.
   */
  def editName(userID: BSONObjectID): Action[AnyContent] =
    silhouette.SecuredAction.async { implicit request =>
      EditNameForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("admin.editName.form.invalid", Messages("invalid.form"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            val updatedUser = user.copy(
              title = Some(data.title),
              firstName = Some(data.firstName),
              lastName = Some(data.lastName),
              name = Some(data.firstName + " " + data.lastName)
            )
            userService.save(updatedUser).map { usr =>
              Ok(ApiResponse(
                "admin.details.update.successful",
                Messages("admin.details.update"),
                Json.toJson(usr)))
            }
          case _ => Future.successful(
            BadRequest(ApiResponse("admin.details.invalid", Messages("admin.details.invalid")))
          )
        }
      )
    }

  /**
   * Updates user's email.
   *
   * @return A Play result.
   */
  def editEmail(userID: BSONObjectID): Action[AnyContent] =
    silhouette.SecuredAction.async { implicit request =>
      EditEmailForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("admin.editEmail.form.invalid", Messages("invalid.form"), form.errors)
        )),
        data => {
          userService.retrieve(userID).flatMap {
            case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
              authInfoRepository.find[PasswordInfo](user.loginInfo(0)).flatMap { p =>
                if (!p.isEmpty && passwordHasher.matches(p.get, data.password)) {
                  val loginInfoUpdated = LoginInfo(CredentialsProvider.ID, data.email)
                  val passwordInfo = passwordHasherRegistry.current.hash(data.password)
                  for {
                    avatar <- avatarService.retrieveURL(data.email)
                    usr <- userService.save(user.copy(
                      loginInfo = user.loginInfo.updated(0, loginInfoUpdated),
                      email = Some(data.email),
                      avatarURL = avatar
                    ))
                    _ <- authInfoRepository.remove[PasswordInfo](usr.loginInfo(0))
                    _ <- authInfoRepository.add[PasswordInfo](loginInfoUpdated, passwordInfo)
                    authenticator <- silhouette.env.authenticatorService.create(loginInfoUpdated)
                    token <- silhouette.env.authenticatorService.init(authenticator)
                    result <- silhouette.env.authenticatorService.embed(
                      token,
                      Ok(ApiResponse(
                        "admin.details.update.successful",
                        Messages("admin.details.update"),
                        Json.toJson(usr)))
                    )
                  } yield {
                    silhouette.env.eventBus.publish(SignUpEvent(usr, request))
                    silhouette.env.eventBus.publish(LoginEvent(usr, request))
                    result
                  }
                } else {
                  Future.successful(
                    BadRequest(ApiResponse("admin.invalid.password", Messages("admin.invalid.password")))
                  )
                }
              }
            case None =>
              Future.failed(new IdentityNotFoundException("Couldn't find user."))
          }
        }
      )
    }

  /**
   * Updates user's password.
   *
   * @return A Play result.
   */
  def changePassword(userID: BSONObjectID): Action[AnyContent] =
    silhouette.SecuredAction.async { implicit request =>
      ChangePasswordForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("admin.changePassword.form.invalid", Messages("invalid.form"), form.errors)
        )),
        data => {
          userService.retrieve(userID).flatMap {
            case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
              authInfoRepository.find[PasswordInfo](user.loginInfo(0)).flatMap { p =>
                if (!p.isEmpty && passwordHasher.matches(p.get, data.oldPassword)) {
                  val passwordInfo = passwordHasherRegistry.current.hash(data.password)
                  for {
                    _ <- authInfoRepository.update[PasswordInfo](user.loginInfo(0), passwordInfo)
                    authenticator <- silhouette.env.authenticatorService.create(user.loginInfo(0))
                    token <- silhouette.env.authenticatorService.init(authenticator)
                    result <- silhouette.env.authenticatorService.embed(
                      token,
                      Ok(ApiResponse(
                        "admin.details.update.successful",
                        Messages("admin.details.update"),
                        Json.toJson(user)))
                    )
                  } yield {
                    silhouette.env.eventBus.publish(SignUpEvent(user, request))
                    silhouette.env.eventBus.publish(LoginEvent(user, request))
                    result
                  }
                } else {
                  Future.successful(
                    BadRequest(ApiResponse("admin.invalid.password", Messages("admin.invalid.password")))
                  )
                }
              }
            case None =>
              Future.failed(new IdentityNotFoundException("Couldn't find user."))
          }
        }
      )
    }

  /**
   * Updates user's newsletter subscription.
   *
   * @return A Play result.
   */
  def updateNewsletter(userID: BSONObjectID): Action[AnyContent] =
    silhouette.SecuredAction.async { implicit request =>
      NewsletterForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("admin.newsletter.form.invalid", Messages("invalid.form"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            newsletterService.retrieve(userID).flatMap {
              case Some(newsletter) if newsletter.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
                val updatedNewsletter = newsletter.copy(
                  updates = Some(Updates(data.updates)),
                  newsletterFashion = Some(NewsletterFashion(data.newsletterFashion)),
                  newsletterVintage = Some(NewsletterVintage(data.newsletterVintage)),
                  newsletterHomeCollection = Some(NewsletterHomeCollection(data.newsletterHomeCollection))
                )
                newsletterService.save(updatedNewsletter).map { newsl =>
                  Ok(ApiResponse(
                    "admin.details.update.successful",
                    Messages("admin.details.update"),
                    Json.toJson(newsl)))
                }
              case _ => Future.successful(
                BadRequest(ApiResponse("admin.details.invalid", Messages("admin.details.invalid")))
              )
            }
          case _ => Future.successful(
            BadRequest(ApiResponse("admin.details.invalid", Messages("admin.details.invalid")))
          )
        }
      )
    }

  /**
   * Adds a new address to the user's address book in My Account.
   *
   * @return A Play result.
   */
  def addNewAddress(userID: BSONObjectID): Action[AnyContent] =
    silhouette.SecuredAction.async { implicit request =>
      AddNewAddressForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("admin.addnewaddress.form.invalid", Messages("invalid.form"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            addressesService.retrieve(userID).flatMap {
              case Some(addresses) =>
                val savedAdresses = addresses.copy(
                  addresses = Some(Seq(Address(
                    firstName = data.firstName,
                    lastName = data.lastName,
                    addInf = AdditionalInfo(
                      descr = data.additional
                    ),
                    address = data.address,
                    zipCode = data.zipCode,
                    city = data.city,
                    country = data.country,
                    state = data.province,
                    email = data.email,
                    dayTel = TelephoneDay(
                      telephone = data.dayTelephone
                    ),
                    eveningTel = TelephoneEvening(
                      telephone = data.eveningTelephone
                    ),
                    mark1 = DefaultShippingAddressMark(
                      checked = data.defShipAddr
                    ),
                    mark2 = BillingAddressMark(
                      checked = data.preferBillAddr
                    )
                  )))
                )
                addressesService.save(savedAdresses).map { addr =>
                  Ok(ApiResponse(
                    "admin.addresses.saved.successful",
                    Messages("admin.addresses.saved"),
                    Json.toJson(addr)))
                }
              case _ => Future.successful(
                BadRequest(ApiResponse("admin.details.invalid", Messages("admin.details.invalid")))
              )
            }
          case _ => Future.successful(
            BadRequest(ApiResponse("admin.details.invalid", Messages("admin.details.invalid")))
          )
        }
      )
    }

}
