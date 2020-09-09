package models.newsletter.services

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import models.core.SubscribeToNewsletter
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

trait NewsletterService {

  /**
   * Retrieves a newsletter that matches the specified ID.
   *
   * @param id The ID to retrieve a newsletter.
   * @return The retrieved newsletter or None if no user could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[SubscribeToNewsletter]]

  /**
   * Retrieves a newsletter by email.
   *
   * @param email The email to retrieve a newsletter.
   * @return The retrieved newsletter or None if no user could be retrieved for the given email.
   */
  def retrieve(email: String): Future[Option[SubscribeToNewsletter]]

  /**
   * Saves a newsletter.
   *
   * @param newsletter The newsletter to save.
   * @return The saved newsletter.
   */
  def save(newsletter: SubscribeToNewsletter): Future[SubscribeToNewsletter]

  /**
   * Deletes a newsletter subscription.
   *
   * @param id The id of the newsletter.
   * @return A future to wait for the process to be completed.
   */
  def deleteSubscription(id: BSONObjectID): Future[Unit]
}
