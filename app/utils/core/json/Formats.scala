package utils.core.json

import java.time.Instant
import java.util.UUID

import models.core.{
  AgeLimit,
  AddItemGuest,
  AddFirstItemGuest,
  CompleteSignIn,
  PasswordData,
  CreateAccount,
  AccountData,
  Checkout,
  CheckoutData1,
  CheckoutData2,
  CheckoutData3,
  CheckoutData4,
  CheckoutData5,
  CountryAtPurchase,
  LastItemAlert,
  LoginEmail,
  LoginAttempt,
  Order,
  OrderNumber,
  PaymentData,
  PaymentData2,
  ShippingAddressAndPaymentDetails,
  StateOrProvince,
  UserLoginAttempts,
  PreferredCreditCard,
  AdditionalInfo,
  Address,
  BillingAddress,
  BillingAddressMark,
  CreditCard,
  Customer,
  DefaultShippingAddressMark,
  PasswordSurvey,
  Registration,
  Settings,
  SignUpToShop,
  User,
  UserID,
  OrderToReturn,
  OrderToReturn2,
  ReturnData,
  NewsletterFashion,
  NewsletterFineJewelry,
  NewsletterHomeCollection,
  Newsletter,
  SubscribeToNewsletter,
  SubscribeToNewsletter2,
  TelephoneEvening,
  TelephoneDay,
  Item,
  Size,
  Color,
  Composition,
  AddItem,
  EditItemSizes,
  EditItemQty,
  RemoveItem,
  EditItemSizesGuest,
  EditItemQtyGuest,
  RemoveItemGuest,
  ShoppingBag,
  ShoppingID,
  SignIn,
  SignInToShop,
  SignUpEmail,
  WishItem,
  WishItem2,
  Transaction,
  CardData,
  ResponseData,
  TransactionID,
  ResponseCode,
  AuthCode,
  AVSResultCode,
  CVVResultCode,
  CAVVResultCode,
  TransHashSha2,
  RefundTransaction,
  RefundResponseData,
  VoidTransaction
}
import play.api.i18n.Lang
import play.api.libs.json._
import reactivemongo.bson.BSONObjectID
import scala.util.{ Failure, Success, Try }

/**
 * Implicit JSON formats.
 */
trait Formats {

  /**
   * Renames a branch if it exists.
   */
  val RenameBranch: (JsPath, JsPath) => Reads[JsObject] = (oldPath: JsPath, newPath: JsPath) => {
    (__.json.update(newPath.json.copyFrom(oldPath.json.pick)) andThen oldPath.json.prune).orElse(__.json.pick[JsObject])
  }

  /**
   * Renames the field "_id" into the value given as `name` parameter.
   */
  val IDReads: String => Reads[JsObject] = (name: String) => RenameBranch(__ \ '_id, __ \ Symbol(name))

  /**
   * Transforms the field with the given `name` into the "_id" field.
   */
  val IDWrites: String => JsValue => JsObject = (name: String) => (js: JsValue) => {
    js.as[JsObject] - name ++ (js \ name match {
      case JsDefined(v) => Json.obj("_id" -> v)
      case _            => Json.obj()
    })
  }

  /**
   * Converts [[play.api.i18n.Lang]] object to JSON and vice versa.
   */
  implicit object LangFormat extends Format[Lang] {
    def reads(json: JsValue): JsResult[Lang] = JsSuccess(Lang(json.as[String]))
    def writes(o: Lang): JsValue = JsString(o.code)
  }

  /**
   * Converts [[java.util.UUID]] object to JSON and vice versa.
   */
  implicit object UUIDFormat extends Format[UUID] {
    def reads(json: JsValue): JsResult[UUID] = Try(UUID.fromString(json.as[String])) match {
      case Success(id) => JsSuccess(id)
      case Failure(e)  => JsError(e.getMessage)
    }
    def writes(o: UUID): JsValue = JsString(o.toString)
  }

  /**
   * Converts a [[Color]] instance to JSON and vice versa.
   */
  implicit val colorFormat: OFormat[Color] = Json.format

  /**
   * Converts a [[Settings]] instance to JSON and vice versa.
   */
  implicit val settingsFormat: OFormat[Settings] = Json.format

  /**
   * Converts a [[Newsletter]] instance to JSON and vice versa.
   */
  implicit val newslFormat: OFormat[Newsletter] = Json.format

  /**
   * Converts a [[NewsletterFashion]] instance to JSON and vice versa.
   */
  implicit val newslfFormat: OFormat[NewsletterFashion] = Json.format

  /**
   * Converts a [[NewsletterFineJewelry]] instance to JSON and vice versa.
   */
  implicit val newslvFormat: OFormat[NewsletterFineJewelry] = Json.format

  /**
   * Converts a [[NewsletterFashion]] instance to JSON and vice versa.
   */
  implicit val newslhFormat: OFormat[NewsletterHomeCollection] = Json.format

  /**
   * Converts a [[Address]] instance to JSON and vice versa.
   */
  implicit val addressFormat: OFormat[Address] = Json.format

  /**
   * Converts a [[AdditionalInfo]] instance to JSON and vice versa.
   */
  implicit val addInfoFormat: OFormat[AdditionalInfo] = Json.format

  /**
   * Converts a [[BillingAddressMark]] instance to JSON and vice versa.
   */
  implicit val billingAddressMarkFormat: OFormat[BillingAddressMark] = Json.format

  /**
   * Converts a [[DefaultShippingAddressMark]] instance to JSON and vice versa.
   */
  implicit val defShippAddressMarkFormat: OFormat[DefaultShippingAddressMark] = Json.format

  /**
   * Converts a [[TelephoneDay]] instance to JSON and vice versa.
   */
  implicit val telDayFormat: OFormat[TelephoneDay] = Json.format

  /**
   * Converts a [[TelephoneEvening]] instance to JSON and vice versa.
   */
  implicit val telEvFormat: OFormat[TelephoneEvening] = Json.format

  /**
   * Converts a [[StateOrProvince]] instance to JSON and vice versa.
   */
  implicit val stateOrProvinceFormat: OFormat[StateOrProvince] = Json.format

  /**
   * Converts a [[PreferredCreditCard]] instance to JSON and vice versa.
   */
  implicit val prefCCFormat: OFormat[PreferredCreditCard] = Json.format

  /**
   * Converts a [[BillingAddress]] instance to JSON and vice versa.
   */
  implicit val billingAddressFormat: OFormat[BillingAddress] = Json.format

}

/**
 * Implicit JSON formats.
 */
object Formats extends Formats

/**
 * Mongo centric JSON formats.
 */
trait MongoFormats extends Formats {

  /**
   * Converts [[java.time.Instant]] object to JSON and vice versa.
   */
  implicit object InstantFormat extends Format[Instant] {
    def reads(json: JsValue): JsResult[Instant] =
      (__ \ "$date").read[Long].map(Instant.ofEpochMilli).reads(json)
    def writes(o: Instant): JsValue = Json.obj(
      "$date" -> o.toEpochMilli
    )
  }
}

/**
 * API centric JSON formats.
 */
trait APIFormats extends Formats {

  /**
   * Converts [[reactivemongo.bson.BSONObjectID]] object to JSON and vice versa.
   */
  implicit object BSONObjectIDFormat extends Format[BSONObjectID] {
    def reads(json: JsValue): JsResult[BSONObjectID] = BSONObjectID.parse(json.as[String]) match {
      case Success(id) => JsSuccess(id)
      case Failure(e)  => JsError(e.getMessage)
    }
    def writes(o: BSONObjectID): JsValue = JsString(o.stringify)
  }

}
/**
 * Mongo centric JSON formats.
 */
object MongoFormats extends MongoFormats with Formats {

  import reactivemongo.play.json.BSONFormats._

  /**
   * Converts a [[PreferredCreditCard]] instance to JSON and vice versa.
   */
  implicit val prefCrdCard2Format: OFormat[PreferredCreditCard] = Json.format

  /**
   * Converts a [[StateOrProvince]] instance to JSON and vice versa.
   */
  implicit val stateOrProvFormat: OFormat[StateOrProvince] = Json.format

  /**
   * Converts a [[BillingAddress]] instance to JSON and vice versa.
   */
  implicit val billingAddrFormat: OFormat[BillingAddress] = Json.format

  /**
   * Converts a [[Address]] instance to JSON and vice versa.
   */
  implicit val address2Format: OFormat[Address] = Json.format

  /**
   * Converts a [[CreditCard]] instance to JSON and vice versa.
   */
  implicit val creditCard2Format: OFormat[CreditCard] = Json.format

  /**
   * Converts a [[Newsletter]] instance to JSON and vice versa.
   */
  implicit val newsletter2Format: OFormat[Newsletter] = Json.format

  /**
   * Converts a [[Registration]] instance to JSON and vice versa.
   */
  implicit val registrationFormat: OFormat[Registration] = Json.format

  /**
   * Converts a [[Composition]] instance to JSON and vice versa.
   */
  implicit val compositionFormat: OFormat[Composition] = Json.format

  /**
   * Converts a [[Size]] instance to JSON and vice versa.
   */
  implicit val sizeFormat: OFormat[Size] = Json.format

  /**
   * Converts JSON into a [[Item]] instance.
   */
  implicit val itemReads: Reads[Item] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[Item]] instance to JSON.
   */
  implicit val itemWrites: OWrites[Item] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts a [[ReturnData]] instance to JSON and vice versa.
   */
  implicit val returnDataFormat: OFormat[ReturnData] = Json.format

  /**
   * Converts JSON into a [[OrderToReturn]] instance.
   */
  implicit val orderToReturnReads: Reads[OrderToReturn] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[OrderToReturn]] instance to JSON.
   */
  implicit val orderToReturnWrites: OWrites[OrderToReturn] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts JSON into a [[ShoppingBag]] instance.
   */
  implicit val shoppingBagReads: Reads[ShoppingBag] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[ShoppingBag]] instance to JSON.
   */
  implicit val shoppingBagWrites: OWrites[ShoppingBag] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts JSON into a [[OrderNumber]] instance.
   */
  implicit val orderNumberReads: Reads[OrderNumber] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[OrderNumber]] instance to JSON.
   */
  implicit val orderNumberWrites: OWrites[OrderNumber] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts a [[Checkout]] instance to JSON and vice versa.
   */
  implicit val chekoutFormat: OFormat[Checkout] = Json.format

  /**
   * Converts a [[AddItem]] instance to JSON and vice versa.
   */
  implicit val addItemFormat: OFormat[AddItem] = Json.format

  /**
   * Converts a [[CheckoutData1]] instance to JSON and vice versa.
   */
  implicit val chekoutData1Format: OFormat[CheckoutData1] = Json.format

  /**
   * Converts a [[AgeLimit]] instance to JSON and vice versa.
   */
  implicit val ageLimitFormat: OFormat[AgeLimit] = Json.format

  /**
   * Converts a [[CountryAtPurchase]] instance to JSON and vice versa.
   */
  implicit val countryAtPurchaseFormat: OFormat[CountryAtPurchase] = Json.format

  /**
   * Converts a [[Order]] instance to JSON and vice versa.
   */
  implicit val orderFormat: OFormat[Order] = Json.format

  /**
   * Converts JSON into a [[Order]] instance.
   */
  implicit val orderReads: Reads[Order] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[Order]] instance to JSON.
   */
  implicit val orderWrites: OWrites[Order] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts a [[LoginAttempt]] instance to JSON and vice versa.
   */
  implicit val loginAttemptFormat: OFormat[LoginAttempt] = Json.format

  /**
   * Converts a [[UserLoginAttempts]] instance to JSON and vice versa.
   */
  implicit val userLoginAttemptsFormat: OFormat[UserLoginAttempts] = Json.format

  /**
   * Converts JSON into a [[CreditCard]] instance.
   */
  implicit val creditCardReads: Reads[CreditCard] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[CreditCard]] instance to JSON.
   */
  implicit val creditCardWrites: OWrites[CreditCard] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts a [[LastItemAlert]] instance to JSON and vice versa.
   */
  implicit val lastItemAlertFormat: OFormat[LastItemAlert] = Json.format

  /**
   * Converts JSON into a [[Customer]] instance.
   */
  implicit val customerReads: Reads[Customer] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[Customer]] instance to JSON.
   */
  implicit val customerWrites: OWrites[Customer] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts a [[OrderNumber]] instance to JSON and vice versa.
   */
  implicit val orderNumber2Format: OFormat[OrderNumber] = Json.format

  /**
   * Converts JSON into a [[SubscribeToNewsletter]] instance.
   */
  implicit val newsletterReads: Reads[SubscribeToNewsletter] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[SubscribeToNewsletter]] instance to JSON.
   */
  implicit val newsletterWrites: OWrites[SubscribeToNewsletter] = Json.writes.transform(IDWrites("id"))

  /**
   * Transaction data formats
   */

  /**
   * Converts a [[CardData]] instance to JSON and vice versa.
   */
  implicit val cardDataFormat: OFormat[CardData] = Json.format

  /**
   * Converts a [[TransactionID]] instance to JSON and vice versa.
   */
  implicit val transactionIDFormat: OFormat[TransactionID] = Json.format

  /**
   * Converts a [[ResponseCode]] instance to JSON and vice versa.
   */
  implicit val responseCodeFormat: OFormat[ResponseCode] = Json.format

  /**
   * Converts a [[AuthCode]] instance to JSON and vice versa.
   */
  implicit val authCodeFormat: OFormat[AuthCode] = Json.format

  /**
   * Converts a [[AVSResultCode]] instance to JSON and vice versa.
   */
  implicit val avsResultCodeFormat: OFormat[AVSResultCode] = Json.format

  /**
   * Converts a [[CVVResultCode]] instance to JSON and vice versa.
   */
  implicit val cvvResultCodeFormat: OFormat[CVVResultCode] = Json.format

  /**
   * Converts a [[CAVVResultCode]] instance to JSON and vice versa.
   */
  implicit val cavvResultCodeFormat: OFormat[CAVVResultCode] = Json.format

  /**
   * Converts a [[TransHashSha2]] instance to JSON and vice versa.
   */
  implicit val transHashSha2Format: OFormat[TransHashSha2] = Json.format

  /**
   * Converts a [[ResponseData]] instance to JSON and vice versa.
   */
  implicit val responseDataFormat: OFormat[ResponseData] = Json.format

  /**
   * Converts a [[RefundResponseData]] instance to JSON and vice versa.
   */
  implicit val refundRespDataFormat: OFormat[RefundResponseData] = Json.format

  /**
   * Converts a [[RefundTransaction]] instance to JSON and vice versa.
   */
  implicit val refundTransactionFormat: OFormat[RefundTransaction] = Json.format

  /**
   * Converts a [[VoidTransaction]] instance to JSON and vice versa.
   */
  implicit val voidTransactionFormat: OFormat[VoidTransaction] = Json.format

  /**
   * Converts JSON into a [[User]] instance.
   */
  implicit val userReads: Reads[User] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[User]] instance to JSON.
   */
  implicit val userWrites: OWrites[User] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts JSON into a [[Transaction]] instance.
   */
  implicit val transactionReads: Reads[Transaction] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[Transaction]] instance to JSON.
   */
  implicit val transactionWrites: OWrites[Transaction] = Json.writes.transform(IDWrites("id"))

}

/**
 * API centric JSON formats.
 */
object APIFormats extends APIFormats with Formats {

  /**
   * Converts a [[AdditionalInfo]] instance to JSON and vice versa.
   */
  implicit val additionalInfoFormat: OFormat[AdditionalInfo] = Json.format

  /**
   * Converts a [[Address]] instance to JSON and vice versa.
   */
  implicit val addrFormat: OFormat[Address] = Json.format

  /**
   * Converts a [[ShippingAddressAndPaymentDetails]] instance to JSON and vice versa.
   */
  implicit val shippingAddrDetailsFormat: OFormat[ShippingAddressAndPaymentDetails] = Json.format

  /**
   * Converts a [[Newsletter]] instance to JSON and vice versa.
   */
  implicit val newsletterFormat: OFormat[Newsletter] = Json.format

  /**
   * Converts a [[PasswordSurvey]] instance to JSON and vice versa.
   */
  implicit val psFormat: OFormat[PasswordSurvey] = Json.format

  /**
   * Converts a [[Registration]] instance to JSON and vice versa.
   */
  implicit val registrationFormat: OFormat[Registration] = Json.format

  /**
   * Converts a [[Composition]] instance to JSON and vice versa.
   */
  implicit val compositionFormat: OFormat[Composition] = Json.format

  /**
   * Converts a [[Size]] instance to JSON and vice versa.
   */
  implicit val sizeFormat: OFormat[Size] = Json.format

  /**
   * Converts a [[Item]] instance to JSON and vice versa.
   */
  implicit val itemFormat: OFormat[Item] = Json.format

  /**
   * Converts a [[ShoppingBag]] instance to JSON and vice versa.
   */
  implicit val shoppingBagFormat: OFormat[ShoppingBag] = Json.format

  /**
   * Converts a [[Checkout]] instance to JSON and vice versa.
   */
  implicit val chekoutFormat: OFormat[Checkout] = Json.format

  /**
   * Converts a [[CountryAtPurchase]] instance to JSON and vice versa.
   */
  implicit val countryAtPurchaseFormat: OFormat[CountryAtPurchase] = Json.format

  /**
   * Converts a [[Customer]] instance to JSON and vice versa.
   */
  implicit val customerFormat: OFormat[Customer] = Json.format

  /**
   * Converts a [[AgeLimit]] instance to JSON and vice versa.
   */
  implicit val ageLimitFormat: OFormat[AgeLimit] = Json.format

  /**
   * Converts a [[Order]] instance to JSON and vice versa.
   */
  implicit val orderFormat: OFormat[Order] = Json.format

  /**
   * Converts a [[LoginAttempt]] instance to JSON and vice versa.
   */
  implicit val loginAttemptFormat: OFormat[LoginAttempt] = Json.format

  /**
   * Converts a [[UserLoginAttempts]] instance to JSON and vice versa.
   */
  implicit val userLoginAttemptsFormat: OFormat[UserLoginAttempts] = Json.format

  /**
   * Converts a [[CreditCard]] instance to JSON and vice versa.
   */
  implicit val creditCardFormat: OFormat[CreditCard] = Json.format

  /**
   * Converts a [[LastItemAlert]] instance to JSON and vice versa.
   */
  implicit val lastItemAlertFormat: OFormat[LastItemAlert] = Json.format

  /**
   * Converts a [[AddItem]] instance to JSON and vice versa.
   */
  implicit val addItemFormat: OFormat[AddItem] = Json.format

  /**
   * Converts a [[AddItemGuest]] instance to JSON and vice versa.
   */
  implicit val addItemGuestFormat: OFormat[AddItemGuest] = Json.format

  /**
   * Converts a [[AddFirstItemGuest]] instance to JSON and vice versa.
   */
  implicit val addFirstItemGuestFormat: OFormat[AddFirstItemGuest] = Json.format

  /**
   * Converts a [[PaymentData]] instance to JSON and vice versa.
   */
  implicit val paymentDataFormat: OFormat[PaymentData] = Json.format

  /**
   * Converts a [[CheckoutData1]] instance to JSON and vice versa.
   */
  implicit val chekoutData1Format: OFormat[CheckoutData1] = Json.format

  /**
   * Converts a [[CheckoutData2]] instance to JSON and vice versa.
   */
  implicit val chekoutData2Format: OFormat[CheckoutData2] = Json.format

  /**
   * Converts a [[CheckoutData3]] instance to JSON and vice versa.
   */
  implicit val chekoutData3Format: OFormat[CheckoutData3] = Json.format

  /**
   * Converts a [[PaymentData2]] instance to JSON and vice versa.
   */
  implicit val paymentData2Format: OFormat[PaymentData2] = Json.format

  /**
   * Converts a [[CheckoutData4]] instance to JSON and vice versa.
   */
  implicit val chekoutData4Format: OFormat[CheckoutData4] = Json.format

  /**
   * Converts a [[CheckoutData5]] instance to JSON and vice versa.
   */
  implicit val chekoutData5Format: OFormat[CheckoutData5] = Json.format

  /**
   * Converts a [[EditItemSizes]] instance to JSON and vice versa.
   */
  implicit val editItemSizesFormat: OFormat[EditItemSizes] = Json.format

  /**
   * Converts a [[EditItemQty]] instance to JSON and vice versa.
   */
  implicit val editItemQtyFormat: OFormat[EditItemQty] = Json.format

  /**
   * Converts a [[RemoveItem]] instance to JSON and vice versa.
   */
  implicit val removeItemFormat: OFormat[RemoveItem] = Json.format

  /**
   * Converts a [[EditItemSizesGuest]] instance to JSON and vice versa.
   */
  implicit val editItemSizesGuestFormat: OFormat[EditItemSizesGuest] = Json.format

  /**
   * Converts a [[EditItemQtyGuest]] instance to JSON and vice versa.
   */
  implicit val editItemQtyGuestFormat: OFormat[EditItemQtyGuest] = Json.format

  /**
   * Converts a [[RemoveItemGuest]] instance to JSON and vice versa.
   */
  implicit val removeItemGuestFormat: OFormat[RemoveItemGuest] = Json.format

  /**
   * Converts a [[WishItem]] instance to JSON and vice versa.
   */
  implicit val wItemFormat: OFormat[WishItem] = Json.format

  /**
   * Converts a [[WishItem2]] instance to JSON and vice versa.
   */
  implicit val wItem2Format: OFormat[WishItem2] = Json.format

  /**
   * Converts a [[UserID]] instance to JSON and vice versa.
   */
  implicit val userIDFormat: OFormat[UserID] = Json.format

  /**
   * Converts a [[ShoppingID]] instance to JSON and vice versa.
   */
  implicit val shoppingIDFormat: OFormat[ShoppingID] = Json.format

  /**
   * Converts a [[SignIn]] instance to JSON and vice versa.
   */
  implicit val signInFormat: OFormat[SignIn] = Json.format

  /**
   * Converts a [[SignInToShop]] instance to JSON and vice versa.
   */
  implicit val signInToShopFormat: OFormat[SignInToShop] = Json.format

  /**
   * Converts a [[SignUpEmail]] instance to JSON and vice versa.
   */
  implicit val signUpEmailFormat: OFormat[SignUpEmail] = Json.format

  /**
   * Converts a [[SignUpToShop]] instance to JSON and vice versa.
   */
  implicit val signUpToShopFormat: OFormat[SignUpToShop] = Json.format

  /**
   * Converts a [[LoginEmail]] instance to JSON and vice versa.
   */
  implicit val loginEmailFormat: OFormat[LoginEmail] = Json.format

  /**
   * Converts a [[PasswordData]] instance to JSON and vice versa.
   */
  implicit val passwordDataFormat: OFormat[PasswordData] = Json.format

  /**
   * Converts a [[AccountData]] instance to JSON and vice versa.
   */
  implicit val accountDataFormat: OFormat[AccountData] = Json.format

  /**
   * Converts a [[CompleteSignIn]] instance to JSON and vice versa.
   */
  implicit val completeSignInFormat: OFormat[CompleteSignIn] = Json.format

  /**
   * Converts a [[CreateAccount]] instance to JSON and vice versa.
   */
  implicit val createAccountFormat: OFormat[CreateAccount] = Json.format

  /**
   * Converts a [[SubscribeToNewsletter2]] instance to JSON and vice versa.
   */
  implicit val subscribeToNewsletter2Format: OFormat[SubscribeToNewsletter2] = Json.format

  /**
   * Converts a [[SubscribeToNewsletter]] instance to JSON and vice versa.
   */
  implicit val subscribeToNewsletterFormat: OFormat[SubscribeToNewsletter] = Json.format

  /**
   * Converts a [[OrderNumber]] instance to JSON and vice versa.
   */
  implicit val orderNumberFormat: OFormat[OrderNumber] = Json.format

  /**
   * Converts a [[ReturnData]] instance to JSON and vice versa.
   */
  implicit val returnData2Format: OFormat[ReturnData] = Json.format

  /**
   * Converts a [[OrderToReturn]] instance to JSON and vice versa.
   */
  implicit val orderToReturn2Format: OFormat[OrderToReturn] = Json.format

  /**
   * Converts a [[OrderToReturn2]] instance to JSON and vice versa.
   */
  implicit val orderToReturn21Format: OFormat[OrderToReturn2] = Json.format

  /**
   * Converts a [[User]] instance to JSON and vice versa.
   */
  implicit val userFormat: OFormat[User] = Json.format

}
