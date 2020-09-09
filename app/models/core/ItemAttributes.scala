package models.core

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import reactivemongo.bson.BSONObjectID

case class Color(
  color: String,
  imgIndex: String
)
case class Composition(
  fabric: String,
  percentage: String
)

case class Size(
  number: String,
  quantity: Int,
  availability: String = "Available to be shipped by 12/12/2019"
)

case class AddItem(
  product: Item,
  size: String,
  quantity: Int,
  userID: BSONObjectID
)

case class AddItemGuest(
  product: Item,
  size: String,
  shoppingBag: ShoppingBag
)

case class AddFirstItemGuest(
  product: Item,
  size: String,
  quantity: Int
)

case class EditItemSizes(
  itemID: BSONObjectID,
  sizeToAdd: String,
  sizeToRemove: String,
  qty: Int,
  category: String,
  userID: BSONObjectID
)

case class EditItemSizesGuest(
  itemID: BSONObjectID,
  sizeToAdd: String,
  sizeToRemove: String,
  qty: Int,
  category: String,
  shoppingBag: Option[ShoppingBag]
)

case class EditItemQty(
  itemID: BSONObjectID,
  size: String,
  qtyToAdd: Int,
  category: String,
  userID: BSONObjectID
)

case class EditItemQtyGuest(
  itemID: BSONObjectID,
  size: String,
  qtyToAdd: Int,
  category: String,
  shoppingBag: Option[ShoppingBag]
)

case class RemoveItem(
  itemID: BSONObjectID,
  size: String,
  category: String,
  userID: BSONObjectID
)

case class RemoveItemGuest(
  itemID: BSONObjectID,
  size: String,
  category: String,
  shoppingBag: Option[ShoppingBag]
)

case class WishItem(
  product: Item,
  category: String,
  size: String,
  userID: BSONObjectID
)

case class WishItem2(
  productID: BSONObjectID,
  category: String,
  size: String,
  userID: BSONObjectID
)

case class ShoppingID(
  id: BSONObjectID
)
