package controllers.account

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import com.google.inject.name.Named
import java.util.UUID
import forms.account.{
  AddNewAddressForm,
  DateOfBirthForm,
  EditEmailForm,
  EditNameForm,
  ChangePasswordForm,
  NewsletterForm
}
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.util.{ PasswordHasher, PasswordHasherRegistry, PasswordInfo }
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import models.core.{
  AdditionalInfo,
  Address,
  BillingAddressMark,
  DefaultShippingAddressMark,
  Newsletter,
  NewsletterFashion,
  NewsletterFineJewelry,
  NewsletterHomeCollection,
  SubscribeToNewsletter,
  TelephoneDay,
  TelephoneEvening,
  User
}
import models.core.services.UserService
import utils.core.json.APIFormats._
import utils.silhouette.{ BoutiqueEnv, CustomerController }
import utils.core.JSRouter
import utils.core.SomeMethods._
import javax.inject.Inject
import net.ceedubs.ficus.Ficus._
import models.newsletter.services.{ NewsletterService, NewsletterTaskService }
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
 * @param authInfoRepository     The auth info repository.
 * @param passwordHasherRegistry The password hasher registry.
 * @param silhouette            The Silhouette stack.
 * @param userService           The user service implementation.
 * @param ex                    The execution context.
 */
class DetailsController @Inject() (
  val controllerComponents: ControllerComponents,
  val silhouette: Silhouette[BoutiqueEnv[User]],
  @Named("customer-auth-info-repository") authInfoRepository: AuthInfoRepository,
  newsletterService: NewsletterService,
  newsletterTaskService: NewsletterTaskService,
  passwordHasher: PasswordHasher,
  passwordHasherRegistry: PasswordHasherRegistry,
  userService: UserService
)(
  implicit
  ex: ExecutionContext
) extends CustomerController {

  /**
   * Updates user's date of birth.
   *
   * @return A Play result.
   */
  def updateDetails(userID: BSONObjectID): Action[AnyContent] =
    SecuredAction.async { implicit request =>
      DateOfBirthForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("account.details.invalid", Messages("account.details.invalid"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            val updatedUser = user.copy(
              dateOfBirth = Some(data.bday + "/" + data.bmonth + "/" + data.byear)
            )
            userService.save(updatedUser).map { usr =>
              Ok(ApiResponse(
                "account.details.updated",
                Messages("account.details.updated"),
                Json.toJson(usr)))
            }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }.recover {
          case _: ProviderException =>
            BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
        }
      )
    }

  /**
   * Updates user's title and name.
   *
   * @return A Play result.
   */
  def editName(userID: BSONObjectID): Action[AnyContent] =
    SecuredAction.async { implicit request =>
      EditNameForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("account.details.invalid", Messages("account.details.invalid"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            val updatedUser = user.copy(
              title = Some(data.title),
              firstName = Some(data.firstName),
              lastName = Some(data.lastName)
            )
            userService.save(updatedUser).map { usr =>
              Ok(ApiResponse(
                "account.details.updated",
                Messages("account.details.updated"),
                Json.toJson(usr)))
            }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }.recover {
          case _: ProviderException =>
            BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
        }
      )
    }

  /**
   * Updates user's email.
   *
   * @return A Play result.
   */
  def editEmail(userID: BSONObjectID): Action[AnyContent] =
    SecuredAction.async { implicit request =>
      EditEmailForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("account.details.invalid", Messages("account.details.invalid"), form.errors)
        )),
        data => {
          userService.retrieve(userID).flatMap {
            case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
              authInfoRepository.find[PasswordInfo](user.loginInfo(0)).flatMap { p =>
                if (!p.isEmpty && passwordHasher.matches(p.get, data.password)) {
                  val loginInfoUpdated = LoginInfo(CredentialsProvider.ID, data.email)
                  val passwordInfo = passwordHasherRegistry.current.hash(data.password)
                  for {
                    usr <- userService.save(user.copy(
                      loginInfo = user.loginInfo.updated(0, loginInfoUpdated),
                      email = Some(data.email)
                    ))
                    _ <- authInfoRepository.remove[PasswordInfo](usr.loginInfo(0))
                    _ <- authInfoRepository.add[PasswordInfo](loginInfoUpdated, passwordInfo)
                    authenticator <- env.authenticatorService.create(loginInfoUpdated)
                    token <- env.authenticatorService.init(authenticator)
                    result <- env.authenticatorService.embed(
                      token,
                      Ok(ApiResponse(
                        "account.details.updated",
                        Messages("account.details.updated"),
                        Json.toJson(usr)))
                    )
                  } yield {
                    env.eventBus.publish(SignUpEvent(usr, request))
                    env.eventBus.publish(LoginEvent(usr, request))
                    result
                  }
                } else {
                  Future.successful(
                    BadRequest(ApiResponse("account.invalid.password", Messages("account.invalid.password")))
                  )
                }
              }
            case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
          }.recover {
            case _: ProviderException =>
              BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
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
    SecuredAction.async { implicit request =>
      ChangePasswordForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("account.details.invalid", Messages("account.details.invalid"), form.errors)
        )),
        data => {
          userService.retrieve(userID).flatMap {
            case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
              authInfoRepository.find[PasswordInfo](user.loginInfo(0)).flatMap { p =>
                if (!p.isEmpty && passwordHasher.matches(p.get, data.oldPassword)) {
                  val passwordInfo = passwordHasherRegistry.current.hash(data.password)
                  for {
                    _ <- authInfoRepository.update[PasswordInfo](user.loginInfo(0), passwordInfo)
                    authenticator <- env.authenticatorService.create(user.loginInfo(0))
                    token <- env.authenticatorService.init(authenticator)
                    result <- env.authenticatorService.embed(
                      token,
                      Ok(ApiResponse(
                        "account.details.updated",
                        Messages("account.details.updated"),
                        Json.toJson(user)))
                    )
                  } yield {
                    env.eventBus.publish(SignUpEvent(user, request))
                    env.eventBus.publish(LoginEvent(user, request))
                    result
                  }
                } else {
                  Future.successful(
                    BadRequest(ApiResponse("account.details.invalid", Messages("account.details.invalid")))
                  )
                }
              }
            case None =>
              Future.failed(new IdentityNotFoundException("Couldn't find user."))
          }.recover {
            case _: ProviderException =>
              BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
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
    SecuredAction.async { implicit request =>
      NewsletterForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("account.details.invalid", Messages("account.details.invalid"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            val updatedUser = user.copy(
              newsletters = Some(Newsletter(
                newsletterFashion = NewsletterFashion(data.newsletterFashion),
                newsletterFineJewelry = NewsletterFineJewelry(data.newsletterFineJewelry),
                newsletterHomeCollection = NewsletterHomeCollection(data.newsletterHomeCollection)
              ))
            )
            newsletterService.retrieve(user.email.get).flatMap {
              case Some(n) => newsletterService.save(n.copy(
                newsletterFashion = NewsletterFashion(data.newsletterFashion),
                newsletterFineJewelry = NewsletterFineJewelry(data.newsletterFineJewelry),
                newsletterHomeCollection = NewsletterHomeCollection(data.newsletterHomeCollection)
              ))
              case None =>
                val newsl = SubscribeToNewsletter(
                  id = BSONObjectID.generate,
                  email = user.email.get,
                  lang = user.registration.lang,
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
                  user.registration.lang,
                  user.email.get,
                  data.newsletterFashion,
                  data.newsletterFineJewelry,
                  data.newsletterHomeCollection
                )
            }
            userService.save(updatedUser).map { usr =>
              val updatedUser = user.copy(
                newsletters = Some(Newsletter(
                  newsletterFashion = NewsletterFashion(data.newsletterFashion),
                  newsletterFineJewelry = NewsletterFineJewelry(data.newsletterFineJewelry),
                  newsletterHomeCollection = NewsletterHomeCollection(data.newsletterHomeCollection)
                ))
              )
              Ok(ApiResponse(
                "account.details.updated",
                Messages("account.details.updated"),
                Json.toJson(usr)))
            }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }.recover {
          case _: ProviderException =>
            BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
        }
      )
    }

  /**
   * Adds a new address to the user's address book in My Account.
   *
   * @return A Play result.
   */
  def addNewAddress(userID: BSONObjectID): Action[AnyContent] =
    SecuredAction.async { implicit request =>
      AddNewAddressForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("account.details.invalid", Messages("account.details.invalid"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            val newAddress = Address(
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
            )
            user.addressBook match {
              case Some(addressesSeq) =>
                val newSeqOfAddresses = newAddress +: addressesSeq
                val updatedUser = user.copy(
                  addressBook = Some(newSeqOfAddresses)
                )
                userService.save(updatedUser).map { usr =>
                  Ok(ApiResponse(
                    "account.address.saved",
                    Messages("account.address.saved"),
                    Json.toJson(updatedUser)))
                }
              case None =>
                val updatedUser2 = user.copy(
                  addressBook = Some(Seq(newAddress))
                )
                userService.save(updatedUser2).map { usr =>
                  Ok(ApiResponse(
                    "account.address.saved",
                    Messages("account.address.saved"),
                    Json.toJson(updatedUser2)))
                }
            }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }.recover {
          case _: ProviderException =>
            BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
        }
      )
    }

  /**
   * Edits address to the user's address book in My Account.
   *
   * @return A Play result.
   */
  def editAddress(userID: BSONObjectID, index: Int): Action[AnyContent] =
    SecuredAction.async { implicit request =>
      AddNewAddressForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("account.details.invalid", Messages("account.details.invalid"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            val newAddress = Address(
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
            )
            user.addressBook match {
              case Some(addressesSeq) =>
                val newSeqOfAddresses = addressesSeq.updated(index, newAddress)
                val updatedUser = user.copy(
                  addressBook = Some(newSeqOfAddresses)
                )
                userService.save(updatedUser).map { usr =>
                  Ok(ApiResponse(
                    "account.address.saved",
                    Messages("account.address.saved"),
                    Json.toJson(updatedUser)))
                }
              case None =>
                val updatedUser2 = user.copy(
                  addressBook = Some(Seq(newAddress))
                )
                userService.save(updatedUser2).map { usr =>
                  Ok(ApiResponse(
                    "account.address.saved",
                    Messages("account.address.saved"),
                    Json.toJson(updatedUser2)))
                }
            }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }.recover {
          case _: ProviderException =>
            BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
        }
      )
    }

  /**
   * Removes address from the user's address book.
   *
   * @return A Play result.
   */
  def removeAddress(userID: BSONObjectID, indexToRemoveAddress: Int): Action[AnyContent] =
    SecuredAction.async { implicit request =>
      userService.retrieve(userID).flatMap {
        case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
          user.addressBook match {
            case Some(addresses) =>
              val seqUpdated = removeElementFromSeq(addresses, indexToRemoveAddress)
              val updatedUser = user.copy(
                addressBook = Some(seqUpdated)
              )
              userService.save(updatedUser).map { usr =>
                Ok(ApiResponse(
                  "account.address.deleted",
                  Messages("account.addresses.deleted"),
                  Json.toJson(updatedUser)))
              }
            case None =>
              Future.successful(BadRequest(ApiResponse(
                "account.details.invalid", Messages("account.details.invalid"))))
          }
        case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
      }.recover {
        case _: ProviderException =>
          BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
      }
    }

}
