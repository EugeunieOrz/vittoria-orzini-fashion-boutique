package core.utils.json

import java.time.Instant
import java.util.UUID

import core.models.{ StateOrProvince, PreferredCreditCard, AdditionalInfo, Address, Addresses, BillingAddress, BillingAddressMark, Config, CreditCards, CreditCard, DefaultShippingAddressMark, PasswordSurvey, Registration, Settings, Updates, User, NewsletterFashion, NewsletterVintage, NewsletterHomeCollection, NewsletterSubscription, TelephoneEvening, TelephoneDay }
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
   * Converts a [[Settings]] instance to JSON and vice versa.
   */
  implicit val settingsFormat: OFormat[Settings] = Json.format

  /**
   * Converts a [[Updates]] instance to JSON and vice versa.
   */
  implicit val updatesFormat: OFormat[Updates] = Json.format

  /**
   * Converts a [[Config]] instance to JSON and vice versa.
   */
  implicit val configFormat: OFormat[Config] = Json.format

  /**
   * Converts a [[NewsletterFashion]] instance to JSON and vice versa.
   */
  implicit val newslfFormat: OFormat[NewsletterFashion] = Json.format

  /**
   * Converts a [[NewsletterVintage]] instance to JSON and vice versa.
   */
  implicit val newslvFormat: OFormat[NewsletterVintage] = Json.format

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
   * Converts a [[BillingAddress]] instance to JSON and vice versa.
   */
  implicit val billingAddressFormat: OFormat[BillingAddress] = Json.format

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
   * Converts a [[CreditCard]] instance to JSON and vice versa.
   */
  implicit val ccFormat: OFormat[CreditCard] = Json.format
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
   * Converts a [[Registration]] instance to JSON and vice versa.
   */
  implicit val registrationFormat: OFormat[Registration] = Json.format

  /**
   * Converts JSON into a [[User]] instance.
   */
  implicit val userReads: Reads[User] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[User]] instance to JSON.
   */
  implicit val userWrites: OWrites[User] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts JSON into a [[NewsletterSubscription]] instance.
   */
  implicit val newsletterReads: Reads[NewsletterSubscription] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[NewsletterSubscription]] instance to JSON.
   */
  implicit val newsletterWrites: OWrites[NewsletterSubscription] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts JSON into a [[Addresses]] instance.
   */
  implicit val addressesReads: Reads[Addresses] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[Address]] instance to JSON.
   */
  implicit val addressesWrites: OWrites[Addresses] = Json.writes.transform(IDWrites("id"))

  /**
   * Converts JSON into a [[CreditCards]] instance.
   */
  implicit val creditCardsReads: Reads[CreditCards] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[CreditCards]] instance to JSON.
   */
  implicit val creditCardsWrites: OWrites[CreditCards] = Json.writes.transform(IDWrites("id"))
}

/**
 * API centric JSON formats.
 */
object APIFormats extends APIFormats with Formats {

  /**
   * Converts a [[PasswordSurvey]] instance to JSON and vice versa.
   */
  implicit val psFormat: OFormat[PasswordSurvey] = Json.format

  /**
   * Converts a [[Registration]] instance to JSON and vice versa.
   */
  implicit val registrationFormat: OFormat[Registration] = Json.format

  /**
   * Converts a [[User]] instance to JSON and vice versa.
   */
  implicit val userFormat: OFormat[User] = Json.format

  /**
   * Converts a [[NewsletterSubscription]] instance to JSON and vice versa.
   */
  implicit val newsletterFormat: OFormat[NewsletterSubscription] = Json.format

  /**
   * Converts a [[Addresses]] instance to JSON and vice versa.
   */
  implicit val addressesFormat: OFormat[Addresses] = Json.format

  /**
   * Converts a [[CreditCards]] instance to JSON and vice versa.
   */
  implicit val creditCardsFormat: OFormat[CreditCards] = Json.format
}
