package controllers.shopping

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import models.core.{
  AddItem,
  Color,
  EditItemSizes,
  EditItemQty,
  Item,
  RemoveItem,
  Size,
  ShoppingBag,
  User
}
import models.core.services.UserService
import utils.core.json.APIFormats._
import utils.silhouette.{ BoutiqueEnv, CustomerController }
import utils.core.JSRouter
import utils.core.SomeMethods._
import models.shopping.services.ItemService
import javax.inject.Inject
import net.ceedubs.ficus.Ficus._
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import org.joda.time.DateTime
import play.api.i18n.{ Messages, MessagesProvider }
import play.api.libs.json._
import play.api.mvc._
import reactivemongo.bson.BSONObjectID
import com.mohiva.play.silhouette.api._

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future }

/**
 * The `Shopping` controller.
 *
 * @param controllerComponents    The Play controller components.
 * @param silhouette              The Silhouette stack.
 * @param userService             The user service implementation.
 * @param dressesService          The dresses service implementation.
 * @param eveningService          The evening service implementation.
 * @param jacketsService          The jackets service implementation.
 * @param ex                      The execution context.
 */
class ShoppingController @Inject() (
  val controllerComponents: ControllerComponents,
  val silhouette: Silhouette[BoutiqueEnv[User]],
  itemService: ItemService,
  userService: UserService
)(
  implicit
  ex: ExecutionContext
) extends CustomerController {

  def addProductToShoppingBag: Action[JsValue] = SecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[AddItem]
        .fold(
          errors =>
            Future.successful(
              BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          addItem => {
            val newItem = Item.createItem(addItem.product, addItem.size, addItem.quantity)

            val newShoppingBag = ShoppingBag.createShoppingBag(
              newItem, addItem.product.total
            )

            itemService.retrieve(addItem.product.id, addItem.product.category).flatMap {
              case Some(item) if (item.inventory > 0) =>
                addNewItem(addItem, newShoppingBag, item, newItem)
              case Some(item) if (item.inventory == 0) =>
                itemService.save(item.copy(
                  availability = "Not Available"
                ), item.category)
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
   * Add a new item to shopping bag.
   *
   * @param addItem     The item sent from front-end.
   * @param newItem   The item to add to shopping bag.
   * @param item        The item available for shopping.
   * @param request     The request header.
   * @return A future to wait for the computation to complete.
   */
  private def addNewItem(
    addItem: AddItem,
    newShoppingBag: ShoppingBag,
    item: Item,
    newItem: Item
  )(
    implicit
    request: RequestHeader
  ): Future[Result] =
    userService.retrieve(addItem.userID).flatMap { //1
      /**
       * If we have an item with the same id and size in the shopping bag,
       * update the item's inventory, size quantity and total price
       * in the user's shopping bag.
       */
      case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
        val id = addItem.product.id
        user.shoppingBag match { //2
          case Some(shoppingB) =>
            if (shoppingB.addedItems.exists(a => a.id == id)) {
              val addedItem = shoppingB.addedItems.find(a => a.id == id).get

              // Item in the bag with the same size and item inventory >= 1
              if (addedItem.size.exists(i => i.number == addItem.size) &&
                item.size.filter(i => i.number == addItem.size).exists(i => i.quantity >= 1)) {
                  userService.save(
                    user.copy(
                      shoppingBag = Some(shoppingB.copy(
                        addedItems = shoppingB.addedItems.collect {
                          case a if (a.id == id) =>
                            a.copy(
                              size = changeSeqSizeToPlus(addedItem.size, addItem.size),
                              inventory = addedItem.inventory + 1,
                              total = addedItem.total + addedItem.price
                            )
                          case a if (a.id != id) => a
                        },
                        total = shoppingB.total + addedItem.price
                      ))
                    )
                  ).map { usr =>
                    Ok(ApiResponse(
                      "shopping.item.added.successfully",
                      Messages("shopping.item.added.successfully"), Json.toJson(usr)))
                  }
              } else if (!addedItem.size.exists(i => i.number == addItem.size) &&
                item.size.filter(i => i.number == addItem.size).exists(i => i.quantity >= 1)) {
                /**
                 * If we have an item with the same id but another size in the shopping bag,
                 * update the item's inventory, total price and add a new size to Seq[Size] of
                 * the existing item in the shopping bag.
                 */
                userService.save(
                  user.copy(
                    shoppingBag = Some(shoppingB.copy(
                      addedItems = shoppingB.addedItems.collect {
                        case a if (a.id == id) =>
                          a.copy(
                            size = addedItem.size :+ Size(
                              addItem.size, addItem.quantity, "Available to be shipped"
                            ),
                            inventory = addedItem.inventory + 1,
                            total = addedItem.total + addedItem.price
                          )
                        case a if (a.id != id) => a
                      },
                      total = shoppingB.total + addedItem.price
                    ))
                  )
                ).map { usr =>
                    Ok(ApiResponse(
                      "shopping.item.added.successfully",
                      Messages("shopping.item.added.successfully"), Json.toJson(usr)))
                  }
              } else {
                Future.successful(
                  BadRequest(ApiResponse(
                    "shopping.bag.not.available",
                    Messages("shopping.bag.not.available")))
                )
              }
            } else {
              // If we don't have an item in the shopping bag with the same id
              userService.save(
                user.copy(
                  shoppingBag = Some(shoppingB.copy(
                    addedItems = shoppingB.addedItems :+ newItem,
                    total = shoppingB.total + newItem.total
                  ))
                )
              ).map { usr =>
                  Ok(ApiResponse(
                    "shopping.item.added.successfully",
                    Messages("shopping.item.added.successfully"),
                    Json.toJson(usr)))
                }
            }

          case None =>
            userService.save(
              user.copy(
                shoppingBag = Some(newShoppingBag)
              )
            ).map { usr =>
                Ok(ApiResponse(
                  "shopping.item.added.successfully",
                  Messages("shopping.item.added.successfully"), Json.toJson(usr)))
              }
        } //2
      case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
    } //1
    .recover {
      case _: ProviderException =>
        BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
    }

  def editProductInShoppingBag: Action[JsValue] = SecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[EditItemSizes]
        .fold(
          errors =>
            Future.successful(BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          editItem =>
            userService.retrieve(editItem.userID).flatMap {
              case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
                val id = editItem.itemID
                user.shoppingBag match {
                  case Some(shoppingB) =>
                    if (shoppingB.addedItems.exists(a => a.id == id)) {
                      val addedItem = shoppingB.addedItems.find(i => i.id == id).get

                      itemService.retrieve(id, editItem.category).flatMap {
                        case Some(item) =>
                          if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                            s => s.quantity >= editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                          ) && addedItem.size.exists(i => i.number == editItem.sizeToAdd)) {
                            /**
                             * We have enough qty of the selected size
                             * We already have the selected size in a seq
                             */
                            val index = addedItem.size.find(s => s.number == editItem.sizeToRemove)
                              .map(s => addedItem.size.indexOf(s)).get
                            userService.save(
                              user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = shoppingB.addedItems.collect {
                                    case a if (a.id == id) =>
                                      a.copy(
                                        size = changeSeqSizeToPlusQty(
                                          removeElementFromSeq(addedItem.size, index),
                                          editItem.sizeToAdd,
                                          editItem.qty
                                        )
                                      )
                                    case a if (a.id != id) => a
                                  }
                                ))
                              )
                            ).map { usr =>
                                Ok(ApiResponse(
                                  "shopping.item.saved", Messages("shopping.item.saved"), Json.toJson(usr)
                                ))
                              }
                          } else if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                            s => s.quantity >= editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                          ) && addedItem.size.exists(i => i.number != editItem.sizeToAdd)) {
                            /**
                             * We have qty of the selected size more or equal to the qty of sizeToRemove
                             * We don't have the selected size in a seq
                             */
                            userService.save(
                              user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = shoppingB.addedItems.collect {
                                    case a if (a.id == id) =>
                                      a.copy(
                                        size = changeSeqSizeQty(
                                          addedItem.size, editItem.sizeToRemove,
                                          editItem.sizeToAdd, editItem.qty
                                        )
                                      )
                                    case a if (a.id != id) => a
                                  }
                                ))
                              )
                            ).map { usr =>
                                Ok(ApiResponse(
                                  "shopping.item.saved", Messages("shopping.item.saved"), Json.toJson(usr)
                                ))
                              }
                          } else if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                            s => s.quantity > 0 &&
                              s.quantity < editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                          ) && addedItem.size.exists(i => i.number == editItem.sizeToAdd)) {
                            /**
                             * We have qty of the selected size less than the qty of sizeToRemove
                             * We already have the selected size in a seq
                             */
                            val itemQty = item.size.find(s => s.number == editItem.sizeToAdd).get.quantity
                            userService.save(
                              user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = shoppingB.addedItems.collect {
                                    case a if (a.id == id) =>
                                      a.copy(
                                        size = changeSeqSizeToPlusQty(
                                          addedItem.size.filter(i => i.number != editItem.sizeToRemove),
                                          editItem.sizeToAdd,
                                          itemQty
                                        ),
                                        inventory = addedItem.inventory - editItem.qty + itemQty,
                                        total = addedItem.total -
                                          item.price * editItem.qty +
                                          item.price * itemQty
                                      )
                                    case a if (a.id != id) => a
                                  },
                                  total = shoppingB.total -
                                    item.price * editItem.qty +
                                    item.price * itemQty
                                ))
                              )
                            ).map { usr =>
                                Ok(ApiResponse(
                                  "shopping.item.saved", Messages("shopping.item.saved"), Json.toJson(usr)
                                ))
                              }
                          } else if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                            s => s.quantity > 0 &&
                              s.quantity < editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                          ) && addedItem.size.exists(i => i.number != editItem.sizeToAdd)) {
                            /**
                             * We have qty of the selected size less than the qty of sizeToRemove
                             * We don't have the selected size in a seq
                             */
                            val itemQty = item.size.find(s => s.number == editItem.sizeToAdd).get.quantity
                            userService.save(
                              user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = shoppingB.addedItems.collect {
                                    case a if (a.id == id) =>
                                      a.copy(
                                        size = changeSeqSizeQty(
                                          addedItem.size,
                                          editItem.sizeToRemove,
                                          editItem.sizeToAdd,
                                          itemQty
                                        ),
                                        inventory = addedItem.inventory - editItem.qty + itemQty,
                                        total = addedItem.total -
                                          item.price * editItem.qty +
                                          item.price * itemQty
                                      )
                                    case a if (a.id != id) => a
                                  },
                                  total = shoppingB.total -
                                    item.price * editItem.qty +
                                    item.price * itemQty
                                ))
                              )
                            ).map { usr =>
                                Ok(ApiResponse(
                                  "shopping.item.saved", Messages("shopping.item.saved"), Json.toJson(usr)
                                ))
                              }
                          } else if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                            s => s.quantity == 0 &&
                              s.quantity < editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                          ) && addedItem.size.exists(i => i.number == editItem.sizeToAdd)) {
                            /**
                             * We have 0 qty of the selected size
                             * We already have the selected size in a seq
                             */
                            Future.successful(
                              Ok(ApiResponse(
                                "shopping.item.out.of.stock", Messages("shopping.item.out.of.stock")
                              ))
                            )
                          } else if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                            s => s.quantity == 0 &&
                              s.quantity < editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                          ) && addedItem.size.exists(i => i.number != editItem.sizeToAdd)) {
                            /**
                             * We have 0 qty of the selected size
                             * We don't have the selected size in a seq
                             */
                            Future.successful(
                              Ok(ApiResponse(
                                "shopping.item.out.of.stock", Messages("shopping.item.out.of.stock")
                              ))
                            )
                          } else {
                            Future.successful(
                              Ok(ApiResponse(
                                "shopping.item.out.of.stock", Messages("shopping.item.out.of.stock")
                              ))
                            )
                          }
                        case None => Future.successful(
                          BadRequest(
                            ApiResponse(
                              "shopping.item.not.available", Messages("shopping.item.not.available"))
                          )
                        )
                      }

                    } else {
                      Future.successful(
                        BadRequest(
                          ApiResponse(
                            "shopping.item.not.available", Messages("shopping.item.not.available"))
                        )
                      )
                    }
                  case None => Future.successful(
                    BadRequest(ApiResponse(
                      "shopping.bag.not.available", Messages("shopping.bag.not.available")))
                  )
                }
              case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
            }.recover {
              case _: ProviderException =>
                BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
            }
        )
  }

  def editProductQtyInShoppingBag: Action[JsValue] = SecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[EditItemQty]
        .fold(
          errors =>
            Future.successful(BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          editItem => userService.retrieve(editItem.userID).flatMap {
            case Some(user) if (user.loginInfo.exists(_.providerID == CredentialsProvider.ID)) =>
              val id = editItem.itemID
              user.shoppingBag match {
                case Some(shoppingB) =>
                  if (shoppingB.addedItems.exists(a => a.id == id)) {
                    val addedItem = shoppingB.addedItems.find(a => a.id == id).get
                    val size = addedItem.size.find(s => s.number == editItem.size).get

                    itemService.retrieve(id, editItem.category).flatMap {
                      case Some(item) =>
                        if (shoppingB.addedItems.size > 1) {
                          /**
                           * We have more than one item in the shopping bag
                           */
                          if (item.size.filter(s => s.number == editItem.size)
                            .exists(s => s.quantity >= size.quantity + 1) &&
                            addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity > 0) &&
                            editItem.qtyToAdd == 1) {
                            /**
                             * We have enough qty of the selected size
                             * We already have some quantity of the selected size in the bag
                             * We increase qty of the selected size by 1
                             */
                            userService.save(
                              user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = shoppingB.addedItems.collect {
                                    case a if (a.id == id) =>
                                      a.copy(
                                        size = changeSeqSizeToPlus(addedItem.size, editItem.size),
                                        inventory = addedItem.inventory + 1,
                                        total = addedItem.total + addedItem.price
                                      )
                                    case a if (a.id != id) => a
                                  },
                                  total = shoppingB.total + addedItem.price
                                ))
                              )
                            ).map { usr =>
                                Ok(ApiResponse(
                                  "shopping.item.saved",
                                  Messages("shopping.item.saved"), Json.toJson(usr)))
                              }
                          } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                            addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity > 1) &&
                            editItem.qtyToAdd == -1) {

                           /**
                            * We have qty of the selected size more than 1
                            * We decrease qty of the selected size by 1
                            */
                            userService.save(
                              user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = shoppingB.addedItems.collect {
                                    case a if (a.id == id) =>
                                      a.copy(
                                        size = changeSeqSizeToMinus(addedItem.size, editItem.size),
                                        inventory = addedItem.inventory - 1,
                                        total = addedItem.total - addedItem.price
                                      )
                                    case a if (a.id != id) => a
                                  },
                                  total = shoppingB.total - addedItem.price
                                ))
                              )
                            ).map { usr =>
                                Ok(ApiResponse(
                                  "shopping.item.saved",
                                  Messages("shopping.item.saved"),
                                  Json.toJson(usr)))
                              }
                          } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                            addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity == 1) &&
                            editItem.qtyToAdd == -1 && addedItem.size.length > 1) {

                            /**
                             * We have qty of the selected size equal to 1
                             * We decrease qty of the selected size by 1
                             * We have multiple sizes in a seq
                             */
                            userService.save(user.copy(
                              shoppingBag = Some(shoppingB.copy(
                                addedItems = shoppingB.addedItems.collect {
                                  case a if (a.id == id) =>
                                    a.copy(
                                      size = addedItem.size.filter(i => i.number != editItem.size),
                                      inventory = addedItem.inventory - 1,
                                      total = addedItem.total - addedItem.price
                                    )
                                  case a if (a.id != id) => a
                                },
                                total = shoppingB.total - addedItem.price
                              ))
                            )).map { usr =>
                              Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                                Json.toJson(usr)))
                            }
                          } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                            addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity == 1) &&
                            editItem.qtyToAdd == -1 && addedItem.size.length == 1) {

                            /**
                             * We have qty of the selected size equal to 1
                             * We decrease qty of the selected size by 1
                             * Only one size remained in the seq
                             */
                            val i = shoppingB.addedItems.indexOf(addedItem)
                            userService.save(user.copy(
                              shoppingBag = Some(shoppingB.copy(
                                addedItems = removeElementFromSeq(shoppingB.addedItems, i),
                                total = shoppingB.total - addedItem.total
                              ))
                            )).map { usr =>
                              Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                                Json.toJson(usr)))
                            }
                          } else {
                            /**
                             * We have 0 qty of the selected size - case 1
                             * item.size.exists(s => s.number == editItem.size && s.quantity == 0
                             */
                            Future.successful(Ok(ApiResponse(
                              "shopping.item.out.of.stock",
                              Messages("shopping.item.out.of.stock"))))
                          }
                          //
                        } else if (shoppingB.addedItems.length == 1) {
                          /**
                           * We have only one item in the shopping bag
                           */
                          if (item.size.filter(s => s.number == editItem.size)
                            .exists(s => s.quantity >= size.quantity + 1) &&
                            addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity > 0) &&
                            editItem.qtyToAdd == 1) {

                            /**
                             * We have enough qty of the selected size
                             * We increase qty of the selected size by 1
                             */
                            userService.save(user.copy(
                              shoppingBag = Some(shoppingB.copy(
                                addedItems = shoppingB.addedItems.collect {
                                  case a if (a.id == id) =>
                                    a.copy(
                                      size = changeSeqSizeToPlus(addedItem.size, editItem.size),
                                      inventory = addedItem.inventory + 1,
                                      total = addedItem.total + addedItem.price
                                    )
                                  case a if (a.id != id) => a
                                },
                                total = shoppingB.total + addedItem.price
                              ))
                            )).map { usr =>
                              Ok(ApiResponse(
                                "shopping.item.saved",
                                Messages("shopping.item.saved"), Json.toJson(usr)))
                            }
                          } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                            addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity > 1) &&
                            editItem.qtyToAdd == -1) {
                              /**
                               * We have qty of the selected size more than 1
                               * We decrease qty of the selected size by 1
                               */
                            userService.save(user.copy(
                              shoppingBag = Some(shoppingB.copy(
                                addedItems = shoppingB.addedItems.collect {
                                  case a if (a.id == id) =>
                                    a.copy(
                                      size = changeSeqSizeToMinus(addedItem.size, editItem.size),
                                      inventory = addedItem.inventory - 1,
                                      total = addedItem.total - addedItem.price
                                    )
                                  case a if (a.id != id) => a
                                },
                                total = shoppingB.total - addedItem.price
                              ))
                            )).map { usr =>
                              Ok(ApiResponse(
                                "shopping.item.saved", Messages("shopping.item.saved"),
                                Json.toJson(usr)))
                            }
                          } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                            addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity == 1) &&
                            editItem.qtyToAdd == -1 && addedItem.size.length > 1) {
                              /**
                               * We have qty of the selected size equal to 1
                               * We decrease qty of the selected size by 1
                               * We have multiple sizes in a seq
                               */
                            userService.save(user.copy(
                              shoppingBag = Some(shoppingB.copy(
                                addedItems = shoppingB.addedItems.collect {
                                  case a if (a.id == id) =>
                                    a.copy(
                                      size = addedItem.size.filter(i => i.number != editItem.size),
                                      inventory = addedItem.inventory - 1,
                                      total = addedItem.total - addedItem.price
                                    )
                                  case a if (a.id != id) => a
                                },
                                total = shoppingB.total - addedItem.price
                              ))
                            )).map { usr =>
                              Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                                Json.toJson(usr)))
                            }
                          } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                            addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity == 1) &&
                            editItem.qtyToAdd == -1 && addedItem.size.length == 1) {
                              /**
                               * We have qty of the selected size equal to 1
                               * We decrease qty of the selected size by 1
                               * Only one size remained in the seq
                               */
                            userService.save(user.copy(
                              shoppingBag = None
                            )).map { usr =>
                              Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                                Json.toJson(usr)))
                            }
                          } else {
                            /**
                             * We have 0 qty of the selected size - case 2
                             * item.size.exists(s => s.number == editItem.size && s.quantity == 0
                             */
                            Future.successful(Ok(ApiResponse(
                              "shopping.item.out.of.stock",
                              Messages("shopping.item.out.of.stock"))))
                          }
                        } else {
                          Future.successful(
                            BadRequest(ApiResponse(
                              "shopping.item.not.available", Messages("shopping.item.not.available")
                            ))
                          )
                        }

                      case None => Future.successful(
                        BadRequest(ApiResponse(
                          "shopping.item.not.available", Messages("shopping.item.not.available")
                        ))
                      )
                    }
                  } else {
                    Future.successful(
                      BadRequest(ApiResponse(
                        "shopping.item.not.available", Messages("shopping.item.not.available")
                      ))
                    )
                  }
                case None => Future.successful(
                  BadRequest(ApiResponse(
                    "shopping.bag.not.available", Messages("shopping.bag.not.available")
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

  def removeItemFromShoppingBag: Action[JsValue] = SecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[RemoveItem]
        .fold(
          errors =>
            Future.successful(BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          removeItem => {
            userService.retrieve(removeItem.userID).flatMap {
              case Some(user) if (user.loginInfo.exists(_.providerID == CredentialsProvider.ID)) =>
                val id = removeItem.itemID
                user.shoppingBag match {
                  case Some(shoppingB) =>
                    if (shoppingB.addedItems.exists(a => a.id == id)) {
                      val addedItem = shoppingB.addedItems.find(a => a.id == id).get
                      itemService.retrieve(id, removeItem.category).flatMap {
                        case Some(item) =>
                          if (shoppingB.addedItems.size > 1) {
                            /**
                             * We have more than one item in the bag
                             */
                            if (addedItem.size.length >= 1 &&
                              addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity > 1)) {
                                /**
                                 * the item with multiple sizes, more than 1 qty of size to remove
                                 */
                              userService.save(user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = shoppingB.addedItems.collect {
                                    case a if (a.id == id) =>
                                      a.copy(
                                        size = changeSeqSizeToMinus(addedItem.size, removeItem.size),
                                        inventory = addedItem.inventory - 1,
                                        total = addedItem.total - addedItem.price
                                      )
                                    case a if (a.id != id) => a
                                  },
                                  total = shoppingB.total - addedItem.price
                                ))
                              )).map { usr =>
                                Ok(ApiResponse(
                                  "shopping.item.removed", Messages("shopping.item.removed"),
                                  Json.toJson(usr)
                                ))
                              }
                            } else if (addedItem.size.length > 1 &&
                              addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity == 1)) {
                                /**
                                 * the item with multiple sizes, 1 qty of size to remove
                                 */
                              userService.save(user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = shoppingB.addedItems.collect {
                                    case a if (a.id == id) =>
                                      a.copy(
                                        size = addedItem.size.filter(i => i.number != removeItem.size),
                                        inventory = addedItem.inventory - 1,
                                        total = addedItem.total - addedItem.price
                                      )
                                    case a if (a.id != id) => a
                                  },
                                  total = shoppingB.total - addedItem.price
                                ))
                              )).map { usr =>
                                Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                                  Json.toJson(usr)))
                              }
                            } else if (addedItem.size.length == 1 &&
                              addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity == 1)) {
                                /**
                                 * There is more than one item in the bag
                                 * the item with one size, 1 qty of size to remove
                                 */
                              val i = shoppingB.addedItems.indexOf(addedItem)
                              userService.save(user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = removeElementFromSeq(shoppingB.addedItems, i),
                                  total = shoppingB.total - addedItem.total
                                ))
                              )).map {
                                savedItem =>
                                  Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                                    Json.toJson(savedItem)))
                              }
                            } else {
                              Future.successful(
                                BadRequest(ApiResponse(
                                  "shopping.item.not.available",
                                  Messages("shopping.item.not.available")))
                              )
                            }

                          } else if (shoppingB.addedItems.size == 1) {
                            /**
                             * We have only one item in the bag
                             */

                            if (addedItem.size.length >= 1 &&
                              addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity > 1)) {
                                /**
                                 * the item with multiple sizes, more than 1 qty of size to remove
                                 */
                              userService.save(user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = shoppingB.addedItems.collect {
                                    case a if (a.id == id) =>
                                      a.copy(
                                        size = changeSeqSizeToMinus(addedItem.size, removeItem.size),
                                        inventory = addedItem.inventory - 1,
                                        total = addedItem.total - addedItem.price
                                      )
                                    case a if (a.id != id) => a
                                  },
                                  total = shoppingB.total - addedItem.price
                                ))
                              )).map { usr =>
                                Ok(ApiResponse(
                                  "shopping.item.removed", Messages("shopping.item.removed"),
                                  Json.toJson(usr)))
                              }
                            } else if (addedItem.size.length > 1 &&
                              addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity == 1)) {
                                /**
                                 * the item with multiple sizes, 1 qty of size to remove
                                 */
                              userService.save(user.copy(
                                shoppingBag = Some(shoppingB.copy(
                                  addedItems = shoppingB.addedItems.collect {
                                    case a if (a.id == id) =>
                                      a.copy(
                                        size = addedItem.size.filter(i => i.number != removeItem.size),
                                        inventory = addedItem.inventory - 1,
                                        total = addedItem.total - addedItem.price
                                      )
                                    case a if (a.id != id) => a
                                  },
                                  total = shoppingB.total - addedItem.price
                                ))
                              )).map { usr =>
                                Ok(ApiResponse(
                                  "shopping.item.removed", Messages("shopping.item.removed"),
                                  Json.toJson(usr)))
                              }
                            } else if (addedItem.size.length == 1 &&
                              addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity == 1)) {
                                /**
                                 * the item with one size, 1 qty of size to remove
                                 */
                              userService.save(user.copy(
                                shoppingBag = None
                              )).map { usr =>
                                Ok(ApiResponse(
                                  "shopping.item.removed", Messages("shopping.item.removed"),
                                  Json.toJson(usr)))
                              }
                            } else {
                              Future.successful(
                                BadRequest(ApiResponse(
                                  "shopping.item.not.available",
                                  Messages("shopping.item.not.available")))
                              )
                            }
                            //
                          } else {
                            Future.successful(BadRequest(ApiResponse(
                              "shopping.item.not.available", Messages("shopping.item.not.available")
                            )))
                          }
                        case None => Future.successful(BadRequest(ApiResponse(
                          "shopping.item.not.available", Messages("shopping.item.not.available")
                        )))
                      }
                    } else {
                      Future.successful(BadRequest(ApiResponse(
                        "shopping.item.not.available", Messages("shopping.item.not.available")
                      )))
                    }
                  case None => Future.successful(BadRequest(ApiResponse(
                    "shopping.bag.not.available", Messages("shopping.bag.not.available")
                  )))
                }
              case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
            }.recover {
              case _: ProviderException =>
                BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
            }
          }
        )
  }

}
