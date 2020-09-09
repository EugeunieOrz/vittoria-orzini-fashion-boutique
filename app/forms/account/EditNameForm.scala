package forms.account

import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._

/**
 * The form which handles the editing user's name process.
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
   * @param title      The title of a user.
   * @param firstName The first name of the user.
   * @param lastName The last name of the user.
   */
  case class Data(
    title: String,
    firstName: String,
    lastName: String
  )
}
