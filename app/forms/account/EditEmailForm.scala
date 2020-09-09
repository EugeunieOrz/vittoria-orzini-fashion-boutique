package forms.account

import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._

/**
 * The form which handles the editing user's email process.
 */
object EditEmailForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "email" -> email,
      "password" -> nonEmptyText
    )(Data.apply)(Data.unapply)
  )

  /**
   * The form data.
   *
   * @param email The email of a user.
   * @param password The password of a user.
   */
  case class Data(
    email: String,
    password: String
  )
}
