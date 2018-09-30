package auth.forms

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
      "day" -> nonEmptyText,
      "month" -> nonEmptyText,
      "year" -> nonEmptyText
    )(Data.apply)(Data.unapply)
  )

  case class Data(
    day: String,
    month: String,
    year: String
  )
}
