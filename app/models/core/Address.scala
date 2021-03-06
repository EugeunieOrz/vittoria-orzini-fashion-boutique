package models.core

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

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
  zipCode: String,
  city: String,
  country: String,
  state: String,
  email: String,
  dayTel: TelephoneDay,
  eveningTel: TelephoneEvening,
  mark1: DefaultShippingAddressMark,
  mark2: BillingAddressMark
)

case class TelephoneDay(
  val name: String = "Telephone (day)",
  telephone: String
)

case class TelephoneEvening(
  val name: String = "Telephone (evening)",
  telephone: Option[String]
)

case class AdditionalInfo(
  val name: String = "Additional information for delivery",
  descr: Option[String]
)

case class DefaultShippingAddressMark(
  checked: Option[Boolean],
  val description: String = "Mark as default shipping address"
)

case class BillingAddressMark(
  checked: Option[Boolean],
  val description: String = "Save as preferred billing address in My Account"
)

case class ShippingAddressAndPaymentDetails(
  firstName: String,
  lastName: String,
  additional: String,
  address: String,
  zipCode: String,
  city: String,
  country: String,
  province: String,
  email: String,
  telephone: String,
  code: String,
  name: String
)
