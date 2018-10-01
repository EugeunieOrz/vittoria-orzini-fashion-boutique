package admin.forms

import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._

/**
 * The form which handles the editing newsletter subscription information process.
 */
object NewsletterForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "consent" -> boolean,
      "updates" -> optional(boolean),
      "newsletterFashion" -> optional(boolean),
      "newsletterVintage" -> optional(boolean),
      "newsletterHomeCollection" -> optional(boolean)
    )(Data.apply)(Data.unapply)
  )

  /**
   * The form data.
   *
   * @param consent The consent of the user to processing his information for marketing purposes.
   * @param updates The consent of the user to newsletter subscription.
   * @param newsletterFashion
   * @param newsletterVintage
   * @param newsletterHomeCollection
   */
  case class Data(
    consent: Boolean,
    updates: Option[Boolean],
    newsletterFashion: Option[Boolean],
    newsletterVintage: Option[Boolean],
    newsletterHomeCollection: Option[Boolean]
  )
}
