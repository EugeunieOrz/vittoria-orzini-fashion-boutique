package models.newsletter

import java.time.Instant
import java.util.UUID

import play.api.i18n.Lang

/**
 * A token to authenticate a user against an endpoint for a short time period.
 *
 * @param id     The unique token ID.
 * @param userID The unique ID of the user the token is associated with.
 * @param expiry The date-time the token expires.
 */
case class NewsletterTask(
  id: UUID,
  email: String,
  lang: Lang = Lang("en"),
  expiry: Instant,
  newsletterFashion: Boolean,
  newsletterFineJewelry: Boolean,
  newsletterHomeCollection: Boolean
)
