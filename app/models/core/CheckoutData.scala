package models.core

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import play.api.data.Form
import play.api.data.Forms._
import reactivemongo.bson.BSONObjectID

object CheckoutForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "firstName" -> nonEmptyText,
      "lastName" -> nonEmptyText,
      "additional" -> text,
      "address" -> nonEmptyText,
      "zipCode" -> nonEmptyText,
      "city" -> nonEmptyText,
      "country" -> nonEmptyText,
      "province" -> nonEmptyText,
      "email" -> nonEmptyText,
      "telephone" -> nonEmptyText,
      "cardNumber" -> nonEmptyText,
      "month" -> nonEmptyText,
      "year" -> nonEmptyText,
      "code" -> nonEmptyText,
      "name" -> nonEmptyText
    )(Data.apply)(Data.unapply)
  )

  case class Data(
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
    cardNumber: String,
    month: String,
    year: String,
    code: String,
    name: String
  )
}

case class CheckoutData1(
  countryByIP: String,
  data: Checkout,
  userID: BSONObjectID
)

case class CheckoutData2(
  cardType: String,
  countryByIP: String,
  data: PaymentData,
  shippingAddress: String,
  userID: BSONObjectID
)

case class CheckoutData3(
  countryByIP: String,
  creditCard: String,
  data: ShippingAddressAndPaymentDetails,
  userID: BSONObjectID
)

case class CheckoutData4(
  countryByIP: String,
  creditCard: String,
  shippingAddress: String,
  data: PaymentData2,
  userID: BSONObjectID
)

case class CheckoutData5(
  countryByIP: String,
  data: Checkout,
  shoppingBag: ShoppingBag
)

case class Checkout(
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
  cardNumber: String,
  month: String,
  year: String,
  code: String,
  name: String
)

case class PaymentData(
  cardNumber: String,
  month: String,
  year: String,
  code: String,
  name: String
)

case class PaymentData2(
  code: String,
  name: String
)

case class CountryAtPurchase(
  country: String,
  description: String = "Country at the moment of purchase"
)
