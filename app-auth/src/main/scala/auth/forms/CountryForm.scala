package auth.forms

import play.api.data.Form
import play.api.data.Forms._

/**
 * The form which handles the submission of the credentials.
 */
object CountryForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "country" -> nonEmptyText
    )(Data.apply)(Data.unapply)
  )

  case class Data(
    country: String
  )
}
