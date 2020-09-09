package controllers.shopping

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import models.core.{
  AddItemGuest,
  AddFirstItemGuest,
  Color,
  EditItemSizesGuest,
  EditItemQtyGuest,
  Item,
  RemoveItemGuest,
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
class GuestShoppingController @Inject() (
  val controllerComponents: ControllerComponents,
  val silhouette: Silhouette[BoutiqueEnv[User]],
  itemService: ItemService,
  userService: UserService
)(
  implicit
  ex: ExecutionContext
) extends CustomerController {

  /** Shopping bag methods for guest checkout */
  def addProductToGuestShoppingBag: Action[JsValue] = UnsecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[AddItemGuest]
        .fold(
          errors =>
            Future.successful(
              BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          addItem => {
            addItem.shoppingBag.total match {
              case 0.0 => {
                val newItem = Item.createItem(addItem.product, addItem.size, 1)
                val newShoppingBag = ShoppingBag.createShoppingBag(
                  newItem, addItem.product.total
                )
                itemService.retrieve(addItem.product.id, addItem.product.category).flatMap {
                  case Some(item) if (item.inventory > 0) =>
                    Future.successful(
                      Ok(ApiResponse(
                        "shopping.item.added.successfully",
                        Messages("shopping.item.added.successfully"),
                        Json.toJson(newShoppingBag)))
                    )
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
              case _ =>
                itemService.retrieve(addItem.product.id, addItem.product.category).flatMap {
                  case Some(item) if (item.inventory > 0) =>
                    addNewItemGuest(addItem, item, addItem.shoppingBag)
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
  private def addNewItemGuest(
    addItem: AddItemGuest,
    item: Item,
    shoppingB: ShoppingBag
  )(
    implicit
    request: RequestHeader
  ): Future[Result] = {
    /**
     * If we have an item with the same id and size in the shopping bag,
     * update the item's inventory and size quantity in the "products" collection
     * and update the item's inventory, size quantity and total price
     * in the shopping bag.
     */
    val newItem = Item.createItem(addItem.product, addItem.size, 1)
    val id = addItem.product.id
    if (shoppingB.addedItems.exists(a => a.id == id)) {
      val addedItem = shoppingB.addedItems.find(a => a.id == id).get
      // Item in the bag with the same size and item inventory >= 1
      if (addedItem.size.exists(i => i.number == addItem.size) &&
        item.size.filter(i => i.number == addItem.size).exists(i => i.quantity >= 1)) {

        val updatedShoppingBag = shoppingB.copy(
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
        )

        Future.successful(
          Ok(ApiResponse(
            "shopping.item.added.successfully",
            Messages("shopping.item.added.successfully"),
            Json.toJson(updatedShoppingBag)))
        )

      } else if (!addedItem.size.exists(i => i.number == addItem.size) &&
        item.size.filter(i => i.number == addItem.size).exists(i => i.quantity >= 1)) {
        /**
         * If we have an item with the same id but another size in the shopping bag,
         * update the item's inventory, total price and add a new size to Seq[Size] of
         * the existing item in the shopping bag.
         */
        val updatedShoppingBag = shoppingB.copy(
          addedItems = shoppingB.addedItems.collect {
            case a if (a.id == id) =>
              a.copy(
                size = addedItem.size :+ Size(
                  addItem.size, 1, "Available to be shipped"
                ),
                inventory = addedItem.inventory + 1,
                total = addedItem.total + addedItem.price
              )
            case a if (a.id != id) => a
          },
          total = shoppingB.total + addedItem.price
        )
        Future.successful(
          Ok(ApiResponse(
            "shopping.item.added.successfully",
            Messages("shopping.item.added.successfully"),
            Json.toJson(updatedShoppingBag)))
        )
      } else {
        println("Some other option")
        Future.successful(
          BadRequest(ApiResponse(
            "shopping.bag.not.available",
            Messages("shopping.bag.not.available")))
        )
      }
    } else {
      // If we don't have an item in the shopping bag with the same id
      val updatedShoppingBag = shoppingB.copy(
        addedItems = shoppingB.addedItems :+ newItem,
        total = shoppingB.total + newItem.total
      )
      Future.successful(
        Ok(ApiResponse(
          "shopping.item.added.successfully",
          Messages("shopping.item.added.successfully"),
          Json.toJson(updatedShoppingBag)))
      )
    } //2
  }

  def editProductInGuestShoppingBag: Action[JsValue] = UnsecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[EditItemSizesGuest]
        .fold(
          errors =>
            Future.successful(BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          editItem => editItem.shoppingBag match {
            case Some(shoppingB) =>
              val id = editItem.itemID
              if (shoppingB.addedItems.exists(a => a.id == id)) {
                val addedItem = shoppingB.addedItems.find(i => i.id == id).get
                itemService.retrieve(id, editItem.category).flatMap {
                  case Some(item) =>
                    if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                      s => s.quantity >= editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                    ) && addedItem.size.exists(i => i.number == editItem.sizeToAdd)) {
                      println("We have enough qty of the selected size")
                      println("We already have the selected size in a seq")
                      val index = addedItem.size.find(s => s.number == editItem.sizeToRemove)
                        .map(s => addedItem.size.indexOf(s)).get

                      val updatedShoppingBag = shoppingB.copy(
                        addedItems = shoppingB.addedItems.collect {
                          case a if (a.id == id) =>
                            a.copy(
                              size = changeSeqSizeToPlusQty(
                                removeElementFromSeq(addedItem.size, index),
                                editItem.sizeToAdd,
                                editItem.qty)
                            )
                          case a if (a.id != id) => a
                        }
                      )
                      Future.successful(
                        Ok(ApiResponse(
                          "shopping.item.saved", Messages("shopping.item.saved"),
                          Json.toJson(updatedShoppingBag)
                        ))
                      )

                    } else if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                      s => s.quantity >= editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                    ) && addedItem.size.exists(i => i.number != editItem.sizeToAdd)) {
                      println("We have qty of the selected size more or equal to the qty of sizeToRemove")
                      println("We don't have the selected size in a seq")

                      val updatedShoppingBag = shoppingB.copy(
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
                      )
                      Future.successful(
                        Ok(ApiResponse(
                          "shopping.item.saved", Messages("shopping.item.saved"),
                          Json.toJson(updatedShoppingBag)
                        ))
                      )

                    } else if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                      s => s.quantity > 0 &&
                        s.quantity < editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                    ) && addedItem.size.exists(i => i.number == editItem.sizeToAdd)) {
                      println("We have qty of the selected size less than the qty of sizeToRemove")
                      println("We already have the selected size in a seq")
                      val itemQty = item.size.find(s => s.number == editItem.sizeToAdd).get.quantity

                      val updatedShoppingBag = shoppingB.copy(
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
                      )
                      Future.successful(
                        Ok(ApiResponse(
                          "shopping.item.saved", Messages("shopping.item.saved"),
                          Json.toJson(updatedShoppingBag)
                        ))
                      )

                    } else if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                      s => s.quantity > 0 &&
                        s.quantity < editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                    ) && addedItem.size.exists(i => i.number != editItem.sizeToAdd)) {
                      println("We have qty of the selected size less than the qty of sizeToRemove")
                      println("We don't have the selected size in a seq")
                      val itemQty = item.size.find(s => s.number == editItem.sizeToAdd).get.quantity

                      val updatedShoppingBag = shoppingB.copy(
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
                      )
                      Future.successful(
                        Ok(ApiResponse(
                          "shopping.item.saved", Messages("shopping.item.saved"),
                          Json.toJson(updatedShoppingBag)
                        ))
                      )

                    } else if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                      s => s.quantity == 0 &&
                        s.quantity < editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                    ) && addedItem.size.exists(i => i.number == editItem.sizeToAdd)) {
                      println("We have 0 qty of the selected size")
                      println("We already have the selected size in a seq")
                      Future.successful(
                        Ok(ApiResponse(
                          "shopping.item.out.of.stock", Messages("shopping.item.out.of.stock")
                        ))
                      )
                    } else if (item.size.filter(s => s.number == editItem.sizeToAdd).exists(
                      s => s.quantity == 0 &&
                        s.quantity < editItem.qty + getSizeQty(addedItem.size, editItem.sizeToAdd)
                    ) && addedItem.size.exists(i => i.number != editItem.sizeToAdd)) {
                      println("We have 0 qty of the selected size")
                      println("We don't have the selected size in a seq")
                      Future.successful(
                        Ok(ApiResponse(
                          "shopping.item.out.of.stock", Messages("shopping.item.out.of.stock")
                        ))
                      )
                    } else {
                      println("else")
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
        )
  }

  def editProductQtyInGuestShoppingBag: Action[JsValue] = UnsecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[EditItemQtyGuest]
        .fold(
          errors =>
            Future.successful(BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          editItem => editItem.shoppingBag match {
            case Some(shoppingB) =>
              val id = editItem.itemID
              if (shoppingB.addedItems.exists(a => a.id == id)) {
                val addedItem = shoppingB.addedItems.find(a => a.id == id).get
                val size = addedItem.size.find(s => s.number == editItem.size).get
                itemService.retrieve(id, editItem.category).flatMap {
                  case Some(item) =>
                    if (shoppingB.addedItems.size > 1) {
                      println("We have more than one item in the shopping bag")
                      //
                      if (item.size.filter(s => s.number == editItem.size)
                        .exists(s => s.quantity >= size.quantity + 1) &&
                        addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity > 0) &&
                        editItem.qtyToAdd == 1) {
                        println("We have enough qty of the selected size")
                        println("We already have some quantity of the selected size in the bag")
                        println("We increase qty of the selected size by 1")

                        val updatedShoppingBag = shoppingB.copy(
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
                        )
                        Future.successful(
                          Ok(ApiResponse(
                            "shopping.item.saved",
                            Messages("shopping.item.saved"),
                            Json.toJson(updatedShoppingBag)))
                        )

                      } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                        addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity > 1) &&
                        editItem.qtyToAdd == -1) {
                        println("We have qty of the selected size more than 1")
                        println("We decrease qty of the selected size by 1")

                        val updatedShoppingBag = shoppingB.copy(
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
                        )
                        Future.successful(
                          Ok(ApiResponse(
                            "shopping.item.saved",
                            Messages("shopping.item.saved"),
                            Json.toJson(updatedShoppingBag)))
                        )

                      } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                        addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity == 1) &&
                        editItem.qtyToAdd == -1 && addedItem.size.length > 1) {
                        println("We have qty of the selected size equal to 1")
                        println("We decrease qty of the selected size by 1")
                        println("We have multiple sizes in a seq")

                        val updatedShoppingBag = shoppingB.copy(
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
                        )
                        Future.successful(
                          Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                            Json.toJson(updatedShoppingBag)))
                        )

                      } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                        addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity == 1) &&
                        editItem.qtyToAdd == -1 && addedItem.size.length == 1) {
                        println("We have qty of the selected size equal to 1")
                        println("We decrease qty of the selected size by 1")
                        println("Only one size remained in the seq")
                        val i = shoppingB.addedItems.indexOf(addedItem)

                        val updatedShoppingBag = shoppingB.copy(
                          addedItems = removeElementFromSeq(shoppingB.addedItems, i),
                          total = shoppingB.total - addedItem.total
                        )
                        Future.successful(
                          Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                            Json.toJson(updatedShoppingBag)))
                        )

                      } else {
                        println("We have 0 qty of the selected size - case 1")
                        println("Item size seq = " + item.size)
                        println("AddedItem size seq = " + addedItem.size)
                        println("EditItem qty To Add = " + editItem.qtyToAdd)
                        // item.size.exists(s => s.number == editItem.size && s.quantity == 0
                        Future.successful(Ok(ApiResponse(
                          "shopping.item.out.of.stock",
                          Messages("shopping.item.out.of.stock"))))
                      }
                      //
                    } else if (shoppingB.addedItems.length == 1) {
                      println("We have only one item in the shopping bag")
                      if (item.size.filter(s => s.number == editItem.size)
                        .exists(s => s.quantity >= size.quantity + 1) &&
                        addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity > 0) &&
                        editItem.qtyToAdd == 1) {
                        println("We have enough qty of the selected size")
                        println("We increase qty of the selected size by 1")

                        val updatedShoppingBag = shoppingB.copy(
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
                        )
                        Future.successful(
                          Ok(ApiResponse(
                            "shopping.item.saved",
                            Messages("shopping.item.saved"),
                            Json.toJson(updatedShoppingBag)))
                        )

                      } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                        addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity > 1) &&
                        editItem.qtyToAdd == -1) {
                        println("We have qty of the selected size more than 1")
                        println("We decrease qty of the selected size by 1")

                        val updatedShoppingBag = shoppingB.copy(
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
                        )
                        Future.successful(
                          Ok(ApiResponse(
                            "shopping.item.saved", Messages("shopping.item.saved"),
                            Json.toJson(updatedShoppingBag)))
                        )

                      } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                        addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity == 1) &&
                        editItem.qtyToAdd == -1 && addedItem.size.length > 1) {
                        println("We have qty of the selected size equal to 1")
                        println("We decrease qty of the selected size by 1")
                        println("We have multiple sizes in a seq")

                        val updatedShoppingBag = shoppingB.copy(
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
                        )
                        Future.successful(
                          Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                            Json.toJson(updatedShoppingBag)))
                        )

                      } else if (item.size.filter(s => s.number == editItem.size).exists(s => s.quantity >= 0) &&
                        addedItem.size.filter(s => s.number == editItem.size).exists(s => s.quantity == 1) &&
                        editItem.qtyToAdd == -1 && addedItem.size.length == 1) {
                        println("We have qty of the selected size equal to 1")
                        println("We decrease qty of the selected size by 1")
                        println("Only one size remained in the seq")

                        Future.successful(
                          Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed")))
                        )
                      } else {
                        // item.size.exists(s => s.number == editItem.size && s.quantity == 0
                        println("We have 0 qty of the selected size - case 2")
                        println("Item size seq = " + item.size)
                        println("AddedItem size seq = " + addedItem.size)
                        println("EditItem qty To Add = " + editItem.qtyToAdd)
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
        )
  }

  def removeItemFromGuestShoppingBag: Action[JsValue] = UnsecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[RemoveItemGuest]
        .fold(
          errors =>
            Future.successful(BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          removeItem => removeItem.shoppingBag match {
            case Some(shoppingB) =>
              val id = removeItem.itemID
              if (shoppingB.addedItems.exists(a => a.id == id)) {
                val addedItem = shoppingB.addedItems.find(a => a.id == id).get
                itemService.retrieve(id, removeItem.category).flatMap {
                  case Some(item) =>
                    if (shoppingB.addedItems.size > 1) {
                      println("We have more than one item in the bag")
                      //
                      if (addedItem.size.length >= 1 &&
                        addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity > 1)) {
                        println("the item with multiple sizes, more than 1 qty of size to remove")

                        val updatedShoppingBag = shoppingB.copy(
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
                        )
                        Future.successful(
                          Ok(ApiResponse(
                            "shopping.item.removed", Messages("shopping.item.removed"),
                            Json.toJson(updatedShoppingBag)
                          ))
                        )

                      } else if (addedItem.size.length > 1 &&
                        addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity == 1)) {
                        println("the item with multiple sizes, 1 qty of size to remove")

                        val updatedShoppingBag = shoppingB.copy(
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
                        )
                        Future.successful(
                          Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                            Json.toJson(updatedShoppingBag)))
                        )
                      } else if (addedItem.size.length == 1 &&
                        addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity == 1)) {
                        println("There is more than one item in the bag")
                        println("the item with one size, 1 qty of size to remove")
                        val i = shoppingB.addedItems.indexOf(addedItem)

                        val updatedShoppingBag = shoppingB.copy(
                          addedItems = removeElementFromSeq(shoppingB.addedItems, i),
                          total = shoppingB.total - addedItem.total
                        )
                        Future.successful(
                          Ok(ApiResponse("shopping.item.removed", Messages("shopping.item.removed"),
                            Json.toJson(updatedShoppingBag)))
                        )

                      } else {
                        Future.successful(
                          BadRequest(ApiResponse(
                            "shopping.item.not.available",
                            Messages("shopping.item.not.available")))
                        )
                      }
                      //
                    } else if (shoppingB.addedItems.size == 1) {
                      println("We have only one item in the bag")
                      //
                      if (addedItem.size.length >= 1 &&
                        addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity > 1)) {
                        println("the item with multiple sizes, more than 1 qty of size to remove")

                        val updatedShoppingBag = shoppingB.copy(
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
                        )
                        Future.successful(
                          Ok(ApiResponse(
                            "shopping.item.removed", Messages("shopping.item.removed"),
                            Json.toJson(updatedShoppingBag)))
                        )

                      } else if (addedItem.size.length > 1 &&
                        addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity == 1)) {
                        println("the item with multiple sizes, 1 qty of size to remove")

                        val updatedShoppingBag = shoppingB.copy(
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
                        )
                        Future.successful(
                          Ok(ApiResponse(
                            "shopping.item.removed", Messages("shopping.item.removed"),
                            Json.toJson(updatedShoppingBag)))
                        )

                      } else if (addedItem.size.length == 1 &&
                        addedItem.size.filter(i => i.number == removeItem.size).exists(i => i.quantity == 1)) {
                        println("the item with one size, 1 qty of size to remove")

                        Future.successful(
                          Ok(ApiResponse(
                            "shopping.item.removed", Messages("shopping.item.removed")))
                        )
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
        )
  }

}
