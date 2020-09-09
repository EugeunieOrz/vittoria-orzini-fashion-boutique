package models.core

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import com.mohiva.play.silhouette.api.LoginInfo
import reactivemongo.bson.BSONObjectID
import play.api.i18n.Lang

/**
 * The Newsletter Subscription object.
 *
 * @param id                          The unique ID of the user.
 * @param email                       The email of the user.
 * @param newsletterFashion           The Fashion newsletter subscription data.
 * @param newsletterVintage           The Vintage newsletter subscription data.
 * @param newsletterHomeCollection    The Home Collection newsletter subscription data.
 */

case class Newsletter(
  newsletterFashion: NewsletterFashion,
  newsletterFineJewelry: NewsletterFineJewelry,
  newsletterHomeCollection: NewsletterHomeCollection
)

case class NewsletterHomeCollection(
  isChecked: Boolean,
  val description: String = "I would like to receive a Home Collection newsletter from Vittoria Orzini Fashion Boutique."
)

case class NewsletterFineJewelry(
  isChecked: Boolean,
  val description: String = "I would like to receive a Fine Jewelry newsletter from Vittoria Orzini Fashion Boutique."
)

case class NewsletterFashion(
  isChecked: Boolean,
  val description: String = "I would like to receive a Fashion newsletter from Vittoria Orzini Fashion Boutique."
)

case class SubscribeToNewsletter(
  id: BSONObjectID,
  email: String,
  lang: Lang = Lang("en"),
  newsletterFashion: NewsletterFashion,
  newsletterFineJewelry: NewsletterFineJewelry,
  newsletterHomeCollection: NewsletterHomeCollection
)

case class SubscribeToNewsletter2(
  newsletterFashion: Boolean,
  newsletterFineJewelry: Boolean,
  newsletterHomeCollection: Boolean,
  email: String
)
