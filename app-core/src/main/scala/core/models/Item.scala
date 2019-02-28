package core.models

import play.api.libs.json.Json
import play.api.libs.json._
import reactivemongo.bson.BSONObjectID

/**
 * The product object.
 *
 * @param id           The unique ID of the item.
 * @param name         The name of the product.
 * @param description  The description of the product.
 * @param quantity     The quantity of the product.
 * @param price        The price of the product.
 * @param attributes   The additional information about the product.
 */
case class Item(
  id: BSONObjectID,
  name: String,
  description: String,
  details: Seq[String],
  composition: Seq[String],
  color: String,
  size: Seq[Size],
  inventory: Double,
  price: Double,
  currency: String,
  nameOfImg: Int,
  stateOfProduct: String
)

case class Size(
  number: String,
  quantity: Double
)
