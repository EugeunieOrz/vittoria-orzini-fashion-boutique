package utils.newsletter.json

import models.newsletter.NewsletterTask
import play.api.libs.json.{ Json, OFormat, OWrites, Reads }

/**
 * Mongo centric JSON formats.
 */
object MongoFormats extends utils.core.json.MongoFormats {
  import reactivemongo.play.json.BSONFormats._

  /**
   * Converts JSON into a [[NewsletterTask]] instance.
   */
  implicit val newsletterReads: Reads[NewsletterTask] = IDReads("id") andThen Json.reads

  /**
   * Converts a [[NewsletterTask]] instance to JSON.
   */
  implicit val newsletterWrites: OWrites[NewsletterTask] = Json.writes.transform(IDWrites("id"))
}

/**
 * API centric JSON formats.
 */
object APIFormats extends utils.core.json.APIFormats
