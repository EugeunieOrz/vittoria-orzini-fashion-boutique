package core.models

object CreditCardType extends Enumeration {
  type CreditCardType = Value
  val VISA, MASTERCARD, AMERICANEXPRESS, JCB = Value
}
