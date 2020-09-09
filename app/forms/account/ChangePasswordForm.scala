package forms.account

import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._

/**
 * The form which handles the changing password process.
 */
object ChangePasswordForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "oldPassword" -> nonEmptyText,
      "password" -> nonEmptyText
    )(Data.apply)(Data.unapply)
  )

  /**
   * The form data.
   *
   * @param oldPassword The old password of a user.
   * @param password    The password of the user.
   */
  case class Data(
    oldPassword: String,
    password: String
  )
}
