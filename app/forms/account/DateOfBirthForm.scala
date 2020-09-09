package forms.account

import play.api.data.Form
import play.api.data.Forms._

/**
 * The form which handles the editing date of birth.
 */
object DateOfBirthForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "bday" -> nonEmptyText,
      "bmonth" -> nonEmptyText,
      "byear" -> nonEmptyText
    )(Data.apply)(Data.unapply)
  )

  /**
   * The form data.
   *
   * @param bday   The day of birth of a user.
   * @param bmonth The month of birth of a user.
   * @param byear The year of birth of a user.
   */
  case class Data(
    bday: String,
    bmonth: String,
    byear: String
  )
}
