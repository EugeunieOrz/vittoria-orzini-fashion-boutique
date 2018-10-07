package core.models

/**
 * The Credit Card object.
 *
 */

case class CreditCard(
  creditCardType: String,
  creditCardNum: String,
  expirDate: String,
  address: BillingAddress,
  markAsPreferred: PreferredCreditCard
)

case class PreferredCreditCard(
  mark: Boolean,
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
