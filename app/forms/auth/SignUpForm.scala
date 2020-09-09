package forms.auth

import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._

/**
 * The form which handles the sign up process.
 */
object SignUpForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "title" -> nonEmptyText,
      "firstName" -> nonEmptyText,
      "lastName" -> nonEmptyText,
      "email" -> email,
      "password" -> nonEmptyText,
      "newsletterFashion" -> boolean,
      "newsletterFineJewelry" -> boolean,
      "newsletterHomeCollection" -> boolean,
      "ageLimit" -> boolean
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
    lastName: String,
    email: String,
    password: String,
    newsletterFashion: Boolean,
    newsletterFineJewelry: Boolean,
    newsletterHomeCollection: Boolean,
    ageLimit: Boolean
  )
}
