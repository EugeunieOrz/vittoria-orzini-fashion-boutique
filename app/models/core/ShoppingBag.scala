package models.core

/** Author: Ievgeniia Ozirna
  *
  * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
  */

import reactivemongo.bson.BSONObjectID

case class ShoppingBag(
  id: BSONObjectID,
  addedItems: Seq[Item],
  total: Double
)

object ShoppingBag {
  def createShoppingBag(item: Item, total: Double): ShoppingBag = ShoppingBag(
    BSONObjectID.generate,
    Seq(item),
    total
  )
}
