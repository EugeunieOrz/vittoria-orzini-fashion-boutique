package forms.auth

import play.api.data.Form
import play.api.data.Forms._

/**
 * The form which handles the submission of the credentials.
 */
object EmailForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "email" -> email
    )(Data.apply)(Data.unapply)
  )

  case class Data(
    email: String
  )
}
