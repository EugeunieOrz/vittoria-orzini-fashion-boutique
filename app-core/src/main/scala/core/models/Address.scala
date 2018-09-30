package core.models

import reactivemongo.bson.BSONObjectID

/**
 * The Address object.
 *
 * @param id           The unique ID of the user.
 */
case class Address(
  firstName: String,
  lastName: String,
  addInf: AdditionalInfo,
  address: String,
  zipcode: String,
  city: String,
  country: String,
  state: String,
  email: String,
  dayTel: TelephoneDay,
  eveningTel: TelephoneEvening,
  mark1: DefaultShippingAddress,
  mark2: BillingAddress
)

case class TelephoneDay(
  val name: String = "Telephone (day)",
  telephone: String
)

case class TelephoneEvening(
  val name: String = "Telephone (evening)",
  telephone: String
)

case class AdditionalInfo(
  val name: String = "Additional information for delivery",
  descr: Option[String]
)

case class DefaultShippingAddress(
  checked: Option[Boolean],
  val description: String = "Mark as default shipping address"
)

case class BillingAddress(
  checked: Option[Boolean],
  val description: String = "Save as preferred billing address in My Account"
)

case class Addresses(
  id: BSONObjectID,
  addresses: Option[Seq[Address]]
)
