package models.core

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import reactivemongo.bson.BSONObjectID
import java.time.Instant

case class Transaction(
  id: BSONObjectID,
  dateTime: Instant,
  order: Order,
  customer: User,
  cardData: CardData,
  responseData: Option[ResponseData],
  refundTransaction: Option[RefundTransaction],
  voidTransaction: Option[VoidTransaction],
  settled: Boolean
)

case class VoidTransaction(
  id: BSONObjectID,
  dateTime: Instant,
  responseCode: Option[String],
  authCode: Option[String],
  transactionID: Option[String],
  resultCode: Option[String]
)

case class RefundTransaction(
  id: BSONObjectID,
  dateTime: Instant,
  responseData: Option[RefundResponseData]
)

case class RefundResponseData(
  transactionID: TransactionID,
  responseCode: Option[ResponseCode],
  messageCode: Option[String],
  description: Option[String],
  authCode: Option[AuthCode],
  errorCode: Option[String],
  errorMessage: Option[String]
)

case class CardData(
  lastFourDigits: String,
  expiryDate: String
)

case class ResponseData(
  transactionID: TransactionID,
  responseCode: Option[ResponseCode],
  messageCode: Option[String],
  description: Option[String],
  authCode: Option[AuthCode],
  avsResultCode: Option[AVSResultCode],
  cvvResultCode: Option[CVVResultCode],
  cavResultCode: Option[CAVVResultCode],
  accountNumber: Option[String],
  accountType: Option[String],
  transHashSha2: Option[TransHashSha2],
  errorCode: Option[String],
  errorMessage: Option[String]
)

case class TransactionID(
  code: String,
  description: String = "The Authorize.Net assigned identification number for a transaction."
)

case class ResponseCode(
  code: String,
  description: String = "The overall status of the transaction."
)

case class AuthCode(
  code: String,
  description: String = "The authorization code granted by the card issuing bank for this transaction."
)

case class AVSResultCode(
  code: String,
  description: String = "Address Verification Service (AVS) response code."
)

case class CVVResultCode(
  code: String,
  description: String = "Card code verification (CCV) response code."
)

case class CAVVResultCode(
  code: String,
  description: String = "Cardholder authentication verification response code.",
  note: String = "Not for MasterCard transactions"
)

case class TransHashSha2(
  code: String,
  description: String = "The SHA-512 hash returned in transaction responses, which you can use to confirm that the transaction response came from Authorize.Net."
)
