package core.models

import com.mohiva.play.silhouette.api.LoginInfo
import reactivemongo.bson.BSONObjectID

/**
 * The Newsletter Subscription object.
 *
 * @param id                          The unique ID of the user.
 * @param loginInfo                   The login Info of the user.
 * @param updates                     The updates data.
 * @param newsletterFashion           The Fashion newsletter subscription data.
 * @param newsletterVintage           The Vintage newsletter subscription data.
 * @param newsletterHomeCollection    The Home Collection newsletter subscription data.
 * @param consent                     The consent data.
 */

case class Newsletter(
  updates: Option[Updates],
  newsletterFashion: Option[NewsletterFashion],
  newsletterVintage: Option[NewsletterVintage],
  newsletterHomeCollection: Option[NewsletterHomeCollection]
)

case class Updates(
  isChecked: Option[Boolean],
  val description: String = "I would like to receive updates from Vittoria Orzini Fashion Boutique."
)

case class NewsletterHomeCollection(
  isChecked: Option[Boolean],
  val description: String = "I would like to receive a Home Collection newsletter from Vittoria Orzini Fashion Boutique."
)

case class NewsletterVintage(
  isChecked: Option[Boolean],
  val description: String = "I would like to receive a Vintage newsletter from Vittoria Orzini Fashion Boutique."
)

case class NewsletterFashion(
  isChecked: Option[Boolean],
  val description: String = "I would like to receive a Fashion newsletter from Vittoria Orzini Fashion Boutique."
)
