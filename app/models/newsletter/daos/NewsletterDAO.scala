package models.newsletter.daos

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import models.core.SubscribeToNewsletter
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Give access to the newsletter object.
 */
trait NewsletterDAO {

  /**
   * Finds a newsletter by its email.
   *
   * @param email The email of the newsletter to find.
   * @return The found newsletter or None if no newsletter for the given email could be found.
   */
  def find(email: String): Future[Option[SubscribeToNewsletter]]

  /**
   * Finds a newsletter by its newsletter ID.
   *
   * @param userID The ID of the newsletter to find.
   * @return The found newsletterr or None if no newsletter for the given ID could be found.
   */
  def find(id: BSONObjectID): Future[Option[SubscribeToNewsletter]]

  /**
   * Saves a newsletter.
   *
   * @param user The newsletter to save.
   * @return The saved newsletter.
   */
  def save(newsletter: SubscribeToNewsletter): Future[SubscribeToNewsletter]

  /**
   * Removes newsletter subscription.
   *
   * @param id The id of the newsletter.
   * @return A future to wait for the process to be completed.
   */
  def removeSubscription(id: BSONObjectID): Future[Unit]
}
