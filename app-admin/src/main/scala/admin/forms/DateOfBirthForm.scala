package admin.forms

import play.api.data.Form
import play.api.data.Forms._

/**
 * The form which handles the submission of the credentials.
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

  case class Data(
    bday: String,
    bmonth: String,
    byear: String
  )
}
