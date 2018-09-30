package admin.forms

import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._

/**
 * The form which handles the sign up process.
 */
object EditNameForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "title" -> nonEmptyText,
      "firstName" -> nonEmptyText,
      "lastName" -> nonEmptyText
    )(Data.apply)(Data.unapply)
  )

  /**
   * The form data.
   *
   * @param name The name of a user.
   * @param email The email of the user.
   * @param password The password of the user.
   */
  case class Data(
    title: String,
    firstName: String,
    lastName: String
  )
}
