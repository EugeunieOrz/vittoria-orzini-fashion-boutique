package controllers.account

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import java.util.UUID
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import models.core.{ Color, Item, LastItemAlert, Size, WishItem, WishItem2, User }
import models.core.services.UserService
import utils.core.json.APIFormats._
import utils.silhouette.{ BoutiqueEnv, CustomerController }
import utils.core.JSRouter
import utils.core.SomeMethods._
import models.shopping.services.ItemService
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
 * @param productService        The products service.
 * @param silhouette            The Silhouette stack.
 * @param userService           The user service implementation.
 * @param ex                    The execution context.
 */
class WishlistController @Inject() (
  val controllerComponents: ControllerComponents,
  val silhouette: Silhouette[BoutiqueEnv[User]],
  itemService: ItemService,
  userService: UserService
)(
  implicit
  ex: ExecutionContext
) extends CustomerController {

  def checkForLastItem: Action[JsValue] = SecuredAction(parse.json).async { implicit request =>
    request.body.validate[WishItem2]
      .fold(
        errors =>
          Future.successful(
            BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
        wishItem => userService.retrieve(wishItem.userID).flatMap {
          case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
            val wishItemID = wishItem.productID
            val category = wishItem.category
            itemService.retrieve(wishItemID, category).flatMap {
              case Some(item) =>
                val size = wishItem.size
                val itemSize = item.size
                if (itemSize.filter(i => i.number == size).exists(i => i.quantity > 1)) {
                  Future.successful(Ok(ApiResponse(
                    "wishlist.one.more.item.in.stock",
                    Messages("wishlist.one.more.item.in.stock")
                  )))
                } else if (itemSize.filter(i => i.number == size).exists(i => i.quantity == 1)) {
                  itemService.save(item.copy(
                    size = itemSize.collect {
                      case s if (s.number == size) => s.copy(availability = "Last Item")
                      case s if (s.number != size) => s
                    }
                  ), category).map { i =>
                    Ok(ApiResponse(
                      "wishlist.last.item.remained",
                      Messages("wishlist.last.item.remained")
                    ))
                  }
                } else {
                  Future.successful(Ok(ApiResponse(
                    "shopping.item.out.of.stock",
                    Messages("shopping.item.out.of.stock")
                  )))
                }
              case None => Future.successful(Ok(ApiResponse(
                "shopping.item.not.available",
                Messages("shopping.item.not.available")
              )))
            }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }.recover {
          case _: ProviderException =>
            BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
        }
      )
  }

  def setLastItemAlert: Action[JsValue] = SecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[LastItemAlert]
        .fold(
          errors =>
            Future.successful(
              BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          data => userService.retrieve(data.userID).flatMap {
            case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
              itemService.retrieve(data.productID, data.category).flatMap {
                case Some(item) =>
                  if (item.size.filter(i => i.number == data.size).exists(i => i.quantity > 1)) {
                    user.notifications match {
                      case Some(n) =>
                        if (n.filter(i => i.productID == data.productID).exists(i => i.size == data.size)) {
                          userService.save(user.copy(
                            notifications = Some(
                              n.collect {
                                case i if (i.productID == data.productID && i.size == data.size) =>
                                  i.copy(
                                    lastItemAlert = data.lastItemAlert,
                                    received = data.received,
                                    received2 = data.received2,
                                    stateOfProduct = data.stateOfProduct
                                  )
                                case i if (i.productID == data.productID && i.size != data.size) => i
                                case i if (i.productID != data.productID)                        => i
                              }
                            )
                          )).map { usr =>
                            println(usr.notifications)
                            Ok(ApiResponse(
                              "account.notifications.updated",
                              Messages("account.notifications.updated"),
                              Json.toJson(usr)))
                          }
                        } else {
                          val newSeq = n :+ data
                          userService.save(
                            user.copy(
                              notifications = Some(newSeq)
                            )
                          ).map { usr =>
                              Ok(ApiResponse(
                                "account.notifications.updated",
                                Messages("account.notifications.updated"),
                                Json.toJson(usr)))
                            }
                        }
                      case None => userService.save(
                        user.copy(
                          notifications = Some(Seq(data))
                        )
                      ).map { usr =>
                          Ok(ApiResponse(
                            "account.notifications.updated",
                            Messages("account.notifications.updated"),
                            Json.toJson(usr)))
                        }
                    }
                  } else if (item.size.filter(i => i.number == data.size).exists(i => i.quantity == 1)) {
                    user.notifications match {
                      case Some(n) =>
                        if (n.filter(i => i.productID == data.productID).exists(i => i.size == data.size)) {
                          userService.save(user.copy(
                            notifications = Some(
                              n.collect {
                                case i if (i.productID == data.productID && i.size == data.size) =>
                                  i.copy(
                                    lastItemAlert = data.lastItemAlert,
                                    received = data.received,
                                    received2 = data.received2,
                                    stateOfProduct = data.stateOfProduct
                                  )
                                case i if (i.productID == data.productID && i.size != data.size) => i
                                case i if (i.productID != data.productID)                        => i
                              }
                            )
                          )).map { usr =>
                            Ok(ApiResponse(
                              "account.notifications.updated",
                              Messages("account.notifications.updated"),
                              Json.toJson(usr)))
                          }
                        } else {
                          val newSeq = n :+ data
                          userService.save(
                            user.copy(
                              notifications = Some(newSeq)
                            )
                          ).map { usr =>
                              Ok(ApiResponse(
                                "account.notifications.updated",
                                Messages("account.notifications.updated"),
                                Json.toJson(usr)))
                            }
                        }
                      case None => userService.save(
                        user.copy(
                          notifications = Some(Seq(data))
                        )
                      ).map { usr =>
                          Ok(ApiResponse(
                            "account.notifications.updated",
                            Messages("account.notifications.updated"),
                            Json.toJson(usr)))
                        }
                    }
                  } else {
                    user.notifications match {
                      case Some(n) =>
                        if (n.filter(i => i.productID == data.productID).exists(i => i.size == data.size)) {
                          userService.save(user.copy(
                            notifications = Some(
                              n.collect {
                                case i if (i.productID == data.productID && i.size == data.size) =>
                                  i.copy(
                                    lastItemAlert = data.lastItemAlert,
                                    received = data.received,
                                    received2 = data.received2,
                                    stateOfProduct = data.stateOfProduct
                                  )
                                case i if (i.productID == data.productID && i.size != data.size) => i
                                case i if (i.productID != data.productID)                        => i
                              }
                            )
                          )).map { usr =>
                            Ok(ApiResponse(
                              "account.notifications.updated",
                              Messages("account.notifications.updated"),
                              Json.toJson(usr)))
                          }
                        } else {
                          val newSeq = n :+ data
                          userService.save(
                            user.copy(
                              notifications = Some(newSeq)
                            )
                          ).map { usr =>
                              Ok(ApiResponse(
                                "account.notifications.updated",
                                Messages("account.notifications.updated"),
                                Json.toJson(usr)))
                            }
                        }
                      case None => userService.save(
                        user.copy(
                          notifications = Some(Seq(data))
                        )
                      ).map { usr =>
                          Ok(ApiResponse(
                            "account.notifications.updated",
                            Messages("account.notifications.updated"),
                            Json.toJson(usr)))
                        }
                    }
                  }
                case None => Future.successful(
                  Ok(ApiResponse(
                    "shopping.item.not.available",
                    Messages("shopping.item.not.available")
                  ))
                )
              }
            case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
          }.recover {
            case _: ProviderException =>
              BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
          }
        )
  }

  def addProductToWishList: Action[JsValue] = SecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[WishItem]
        .fold(
          errors =>
            Future.successful(
              BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          addItem => {
            val wItem = Item.createItem(addItem.product, addItem.size, 1)
            val category = addItem.category
            itemService.retrieve(addItem.product.id, category).flatMap {
              case Some(item) if (item.inventory > 0) =>
                addNewItemToWishlist(addItem, wItem, item)
              case Some(item) if (item.inventory == 1) =>
                itemService.save(item.copy(
                  availability = "Last Item"
                ), category)
                addNewItemToWishlist(addItem, wItem, item)
              case Some(item) if (item.inventory == 0) =>
                itemService.save(item.copy(
                  availability = "Not Available"
                ), category)
                Future.successful(
                  BadRequest(ApiResponse(
                    "shopping.item.out.of.stock",
                    Messages("shopping.item.out.of.stock")))
                )
              case None => Future.successful(
                BadRequest(ApiResponse(
                  "shopping.item.not.available",
                  Messages("shopping.item.not.available")))
              )
            }
          }
        )
  }

  /**
   * Add a new item to user's wishlist.
   *
   * @param addItem     The item originally added to wish list at front-end.
   * @param wItem       The newly created user's wishlist item.
   * @param item        The item available for shopping.
   * @param request     The request header.
   * @return A future to wait for the computation to complete.
   */
  private def addNewItemToWishlist(
    addItem: WishItem,
    wItem: Item,
    item: Item
  )(
    implicit
    request: RequestHeader
  ): Future[Result] = {
    userService.retrieve(addItem.userID).flatMap {
      case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
        val id = addItem.product.id
        user.wishlist match {
          case Some(wSeq) if (0 to 50 contains wSeq.length) =>
            if (wSeq.exists(i => i.id == id) &&
              wSeq.filter(w => w.id == id)
              .exists(it => it.size.exists(i => i.number == addItem.size))) {
              // wishlist item with the same id and size
              Future.successful(
                Ok(ApiResponse(
                  "wishlist.item.already.added",
                  Messages("wishlist.item.already.added")))
              )
            } else if (wSeq.exists(i => i.id == id) &&
              wSeq.filter(w => w.id == id)
              .exists(it => it.size.exists(i => i.number != addItem.size))) {
              // we have item with the same id but different size
              val newSeqOfW = wItem +: wSeq
              val updatedUser = user.copy(
                wishlist = Some(newSeqOfW)
              )
              userService.save(updatedUser).map { usr =>
                Ok(ApiResponse(
                  "wishlist.item.added.successfully",
                  Messages("wishlist.item.added.successfully"),
                  Json.toJson(updatedUser)))
              }
            } else if (wSeq.exists(i => i.id != id)) {
              // we don't have item with the same id in the wishlist
              val newSeqOfW = wItem +: wSeq
              val updatedUser = user.copy(
                wishlist = Some(newSeqOfW)
              )
              userService.save(updatedUser).map { usr =>
                Ok(ApiResponse(
                  "wishlist.item.added.successfully",
                  Messages("wishlist.item.added.successfully"),
                  Json.toJson(updatedUser)))
              }
            } else {
              Future.successful(
                Ok(ApiResponse(
                  "wishlist.item.could.not.be.added",
                  Messages("wishlist.item.could.not.be.added")))
              )
            }

          case Some(wSeq) if (wSeq.length > 50) =>
            Future.successful(
              Ok(ApiResponse(
                "wishlist.item.could.not.be.added",
                Messages("wishlist.item.could.not.be.added")))
            )

          case None =>
            val updatedUser2 = user.copy(
              wishlist = Some(Seq(wItem))
            )
            userService.save(updatedUser2).map { usr =>
              Ok(ApiResponse(
                "wishlist.item.added.successfully",
                Messages("wishlist.item.added.successfully"),
                Json.toJson(updatedUser2)))
            }
        }

      case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
    }.recover {
      case _: ProviderException =>
        BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
    }
  }

  /**
   * Removes the selected item from the user's wish list.
   *
   * @return A Play result.
   */
  def removeItemFromWishList: Action[JsValue] =
    SecuredAction(parse.json).async { implicit request =>
      request.body.validate[WishItem]
        .fold(
          errors =>
            Future.successful(
              BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          wItem =>
            userService.retrieve(wItem.userID).flatMap {
              case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
                // remove item from wishlist and remove notifications for the removed item
                (user.wishlist, user.notifications) match {
                  case (Some(w: Seq[Item]), Some(n: Seq[LastItemAlert])) if(w.length > 1) =>
                    // wishlist.length > 1, notifications
                    val index = w.indexOf(wItem.product)
                    val seqUpdated = removeElementFromSeq(w, index)
                    userService.save(user.copy(
                      wishlist = Some(seqUpdated),
                      notifications = Some(n.collect {
                        case notif if(notif.productID == wItem.product.id) => notif.copy(
                          lastItemAlert = false,
                          received = false,
                          received2 = false
                        )
                        case notif if(notif.productID != wItem.product.id) => notif
                      })
                    )).map { usr =>
                        Ok(ApiResponse(
                          "wishlist.item.removed",
                          Messages("wishlist.item.removed"),
                          Json.toJson(usr)))
                      }
                  case (Some(w: Seq[Item]), Some(n: Seq[LastItemAlert])) if(w.length == 1) =>
                  // wishlist.length = 1, notifications
                    userService.save(user.copy(
                      wishlist = None,
                      notifications = Some(n.collect {
                        case notif if(notif.productID == wItem.product.id) => notif.copy(
                          lastItemAlert = false,
                          received = false,
                          received2 = false
                        )
                        case notif if(notif.productID != wItem.product.id) => notif
                      })
                    )).map { usr =>
                        Ok(ApiResponse(
                          "wishlist.item.removed",
                          Messages("wishlist.item.removed"),
                          Json.toJson(usr)))
                      }
                  case (Some(w: Seq[Item]), None) if(w.length > 1) =>
                    // wishlist.length > 1, no notifications
                    val index = w.indexOf(wItem.product)
                    val seqUpdated = removeElementFromSeq(w, index)
                    userService.save(user.copy(
                      wishlist = Some(seqUpdated)
                    )).map { usr =>
                        Ok(ApiResponse(
                          "wishlist.item.removed",
                          Messages("wishlist.item.removed"),
                          Json.toJson(usr)))
                      }
                  case (Some(w: Seq[Item]), None) if(w.length == 1) =>
                  // wishlist.length = 1, no notifications
                  userService.save(user.copy(
                    wishlist = None
                  )).map { usr =>
                      Ok(ApiResponse(
                        "wishlist.item.removed",
                        Messages("wishlist.item.removed"),
                        Json.toJson(usr)))
                    }
                  case (None, Some(n: Seq[LastItemAlert])) =>
                    userService.save(user.copy(
                      notifications = Some(n.collect {
                        case notif if(notif.productID == wItem.product.id) => notif.copy(
                          lastItemAlert = false,
                          received = false,
                          received2 = false
                        )
                        case notif if(notif.productID != wItem.product.id) => notif
                      })
                    ))
                    Future.successful(BadRequest(ApiResponse(
                      "wishlist.not.found", Messages("wishlist.not.found"))))
                  case (None, None) => Future.successful(BadRequest(ApiResponse(
                    "wishlist.not.found", Messages("wishlist.not.found"))))
                }
              case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
            }.recover {
              case _: ProviderException =>
                BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
            }
        )
    }

  def receiveLastItemAlert: Action[JsValue] =
    SecuredAction(parse.json).async {
      implicit request =>
        request.body.validate[LastItemAlert]
          .fold(
            errors =>
              Future.successful(
                BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
            data => userService.retrieve(data.userID).flatMap {
              case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
                user.notifications match {
                  case Some(notifs) =>
                  user.wishlist match {
                    case Some(wishlist) =>
                      val wItem = wishlist.find(w => w.id == data.productID).get
                      val size = wItem.size.find(s => s.number == data.size).get
                      userService.save(user.copy(
                        wishlist = Some(wishlist.collect {
                          case w if(w.id == data.productID) => w.copy(size = w.size.collect {
                            case s if(s.number == data.size) => s.copy(
                              availability = data.stateOfProduct
                            )
                            case s if(s.number == data.size) => s
                          })
                          case w if(w.id != data.productID) => w
                        })
                      ))
                    case None => Future.successful(println("Wishlist not found"))
                  }
                  userService.save(user.copy(
                    notifications = Some(
                      notifs.collect {
                        case n if (n.productID == data.productID && n.size == data.size) =>
                          n.copy(
                            received = data.received,
                            received2 = data.received2,
                            stateOfProduct = data.stateOfProduct
                          )
                        case n if (n.productID != data.productID) => n
                      }
                    )
                  )).map { usr =>
                    Ok(ApiResponse(
                      "account.notifications.updated",
                      Messages("account.notifications.updated"),
                      Json.toJson(usr)
                    ))
                  }
                  case None => Future.successful(
                    BadRequest(ApiResponse("account.details.invalid", Messages("account.details.invalid")))
                  )
                }
              case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
            }.recover {
              case _: ProviderException =>
                BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
            }
          )
    }
}
