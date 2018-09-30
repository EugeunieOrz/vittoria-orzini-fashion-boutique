package core.models

import reactivemongo.bson.BSONObjectID

/**
 * The Address object.
 *
 * @param id           The unique ID of the user.
 */
case class Address(
  id: BSONObjectID,
  firstName: String,
  lastName: String,
  addInf: AdditionalInfo,
  address: String,
  zipcode: String,
  city: String,
  country: String,
  state: String,
  email: String,
  dayTel: String,
  eveningTel: String,
  mark1: DefaultShippingAddress,
  mark2: BillingAddress
)

case class AdditionalInfo(
  name: String,
  descr: Option[String]
)

case class DefaultShippingAddress(
  checked: Option[Boolean],
  description: String
)

case class BillingAddress(
  checked: Option[Boolean],
  description: String
)
