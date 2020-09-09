package forms.account

import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._

/**
 * The form which handles the adding a new address process.
 */
object AddNewAddressForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "firstName" -> nonEmptyText,
      "lastName" -> nonEmptyText,
      "additional" -> optional(text),
      "address" -> nonEmptyText,
      "zipCode" -> nonEmptyText,
      "city" -> nonEmptyText,
      "country" -> nonEmptyText,
      "province" -> nonEmptyText,
      "email" -> email,
      "dayTelephone" -> nonEmptyText,
      "eveningTelephone" -> optional(text),
      "defShipAddr" -> optional(boolean),
      "preferBillAddr" -> optional(boolean)
    )(Data.apply)(Data.unapply)
  )

  /**
   * The form data.
   *
   * @param firstName        The first name of a user.
   * @param lastName         The last name of the user.
   * @param additional       The additional information for delivery of the user.
   * @param address          The address of a user.
   * @param zipCode          The zip code of a user.
   * @param city             The city of a user.
   * @param country          The country of a user.
   * @param province         The state / province of a user.
   * @param email            The email of a user.
   * @param dayTelephone     The day telephone of a user.
   * @param eveningTelephone The evening telephone (optional) of a user.
   * @param defShipAddr      Indicates the default shipping address of a user.
   * @param preferBillAddr   Indicates the preferred billing address of a user.
   */
  case class Data(
    firstName: String,
    lastName: String,
    additional: Option[String],
    address: String,
    zipCode: String,
    city: String,
    country: String,
    province: String,
    email: String,
    dayTelephone: String,
    eveningTelephone: Option[String],
    defShipAddr: Option[Boolean],
    preferBillAddr: Option[Boolean]
  )
}
