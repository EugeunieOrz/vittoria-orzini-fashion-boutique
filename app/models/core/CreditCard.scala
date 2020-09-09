package models.core

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import reactivemongo.bson.BSONObjectID

case class CreditCard(
  cardType: String,
  cardNumber: String,
  expMonth: String,
  expYear: String,
  address: BillingAddress,
  prefCrdCard: PreferredCreditCard
)

case class PreferredCreditCard(
  mark: Option[Boolean],
  val description: String = "Mark as preferred Credit Card"
)

case class BillingAddress(
  firstName: String,
  lastName: String,
  address: String,
  zipCode: String,
  city: String,
  state: StateOrProvince,
  country: String
)

case class StateOrProvince(
  content: String,
  val description: String = "State / Province"
)
