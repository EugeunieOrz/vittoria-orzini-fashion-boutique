package core.models.services

import core.models.NewsletterSubscription
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to users.
 */
trait NewsletterService {

  /**
   * Retrieves a newsletter subscription data that matches the specified ID.
   *
   * @param id The ID to retrieve a newsletter subscription data.
   * @return The retrieved newsletter subscription datar or None
   *         if no newsletter subscription data could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[NewsletterSubscription]]

  /**
   * Saves a newsletter subscription data.
   *
   * @param newsletter The newsletter subscription data to save.
   * @return The saved newsletter subscription data.
   */
  def save(newsletter: NewsletterSubscription): Future[NewsletterSubscription]

}
