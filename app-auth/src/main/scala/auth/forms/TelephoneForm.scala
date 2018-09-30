package auth.forms

import play.api.data.Form
import play.api.data.Forms._

/**
 * The form which handles the submission of the credentials.
 */
object TelephoneForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "telephone" -> nonEmptyText
    )(Data.apply)(Data.unapply)
  )

  case class Data(
    telephone: String
  )
}
