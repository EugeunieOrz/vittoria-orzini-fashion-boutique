package controllers.account

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import java.util.UUID
import forms.account.AddNewCardForm
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import models.core.{
  BillingAddress,
  CreditCard,
  PreferredCreditCard,
  StateOrProvince,
  UserID,
  User
}
import models.core.services.UserService
import utils.core.json.APIFormats._
import utils.silhouette.{ BoutiqueEnv, CustomerController }
import utils.core.JSRouter
import utils.core.SomeMethods._
import javax.inject.Inject
import net.ceedubs.ficus.Ficus._
import org.joda.time.DateTime
import play.api.i18n.{ Messages, MessagesProvider }
import play.api.libs.json._
import play.api.mvc._
import reactivemongo.bson.BSONObjectID
import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future }

/**
 * The `Details` controller.
 *
 * @param controllerComponents  The Play controller components.
 * @param silhouette            The Silhouette stack.
 * @param userService           The user service implementation.
 * @param ex                    The execution context.
 */
class CardWalletController @Inject() (
  val controllerComponents: ControllerComponents,
  val silhouette: Silhouette[BoutiqueEnv[User]],
  userService: UserService
)(
  implicit
  ex: ExecutionContext
) extends CustomerController {

  /**
   * Adds a new card to the user's card wallet in My Account.
   *
   * @return A Play result.
   */
  def addNewCard(userID: BSONObjectID, cardType: String): Action[AnyContent] =
    SecuredAction.async { implicit request =>
      AddNewCardForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("account.details.invalid", Messages("account.details.invalid"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>

            val newCard = CreditCard(
              cardType = cardType,
              cardNumber = data.cardNumber,
              expMonth = data.month,
              expYear = data.year,
              address = BillingAddress(
                firstName = data.firstName,
                lastName = data.lastName,
                address = data.address,
                zipCode = data.zipCode,
                city = data.city,
                country = data.country,
                state = StateOrProvince(
                  content = data.province
                )
              ),
              prefCrdCard = PreferredCreditCard(
                mark = data.prefCrdCard
              )
            )
            user.cardWallet match {
              case Some(cards) =>
                val newSeq = cards :+ newCard
                userService.save(
                  user.copy(
                    cardWallet = Some(newSeq)
                  )
                ).map { usr =>
                    Ok(ApiResponse(
                      "account.cardwallet.updated",
                      Messages("account.cardwallet.updated"),
                      Json.toJson(usr)))
                  }
              case None => userService.save(
                user.copy(
                  cardWallet = Some(Seq(newCard))
                )
              ).map { usr =>
                  Ok(ApiResponse(
                    "account.cardwallet.updated",
                    Messages("account.cardwallet.updated"),
                    Json.toJson(usr)))
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
   * Edits credit card in the user's card wallet in My Account.
   *
   * @return A Play result.
   */
  def editCard(userID: BSONObjectID, index: Int, cardType: String): Action[AnyContent] =
    SecuredAction.async { implicit request =>
      AddNewCardForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(
          ApiResponse("account.details.invalid", Messages("account.details.invalid"), form.errors)
        )),
        data => userService.retrieve(userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>

            val newCard = CreditCard(
              cardType = cardType,
              cardNumber = data.cardNumber,
              expMonth = data.month,
              expYear = data.year,
              address = BillingAddress(
                firstName = data.firstName,
                lastName = data.lastName,
                address = data.address,
                zipCode = data.zipCode,
                city = data.city,
                country = data.country,
                state = StateOrProvince(
                  content = data.province
                )
              ),
              prefCrdCard = PreferredCreditCard(
                mark = data.prefCrdCard
              )
            )
            user.cardWallet match {
              case Some(cards) =>
                val newSeq = cards.updated(index, newCard)
                userService.save(
                  user.copy(
                    cardWallet = Some(newSeq)
                  )
                ).map { usr =>
                    Ok(ApiResponse(
                      "account.cardwallet.updated",
                      Messages("account.cardwallet.updated"),
                      Json.toJson(usr)))
                  }
              case None =>
                userService.save(
                  user.copy(
                    cardWallet = Some(Seq(newCard))
                  )
                ).map { usr =>
                    Ok(ApiResponse(
                      "account.cardwallet.updated",
                      Messages("account.cardwallet.updated"),
                      Json.toJson(usr)))
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
   * Removes credit card from the user's card wallet.
   *
   * @return A Play result.
   */
  def removeCard(userID: BSONObjectID, indexToRemoveCard: Int): Action[AnyContent] =
    SecuredAction.async { implicit request =>
      userService.retrieve(userID).flatMap {
        case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
          user.cardWallet match {
            case Some(cards) =>
              val seqUpdated = removeElementFromSeq(cards, indexToRemoveCard)
              userService.save(
                user.copy(
                  cardWallet = Some(seqUpdated)
                )
              ).map { usr =>
                  Ok(ApiResponse(
                    "account.card.deleted",
                    Messages("account.card.deleted"),
                    Json.toJson(usr)))
                }
            case None =>
              Future.successful(BadRequest(ApiResponse(
                "account.details.invalid", Messages("account.details.invalid")
              )))
          }
        case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
      }.recover {
        case _: ProviderException =>
          BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
      }
    }

}
