package forms.newsletter

import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._

/**
 * The form which handles the editing newsletter subscription information process.
 */
object UnsubscribeNewsletterForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "newsletterFashion" -> boolean,
      "newsletterFineJewelry" -> boolean,
      "newsletterHomeCollection" -> boolean
    )(Data.apply)(Data.unapply)
  )

  /**
   * The form data.
   *
   * @param newsletterFashion
   * @param newsletterFineJewelry
   * @param newsletterHomeCollection
   */
  case class Data(
    newsletterFashion: Boolean,
    newsletterFineJewelry: Boolean,
    newsletterHomeCollection: Boolean
  )
}
