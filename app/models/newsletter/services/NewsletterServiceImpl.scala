package models.newsletter.services

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import models.core.SubscribeToNewsletter
import models.newsletter.daos.NewsletterDAO
import utils.core.CustomerExecutionContext
import javax.inject.Inject
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to newsletter subscription.
 *
 * @param newsletterDAO The newsletter DAO implementation.
 * @param ex      The execution context.
 */
class NewsletterServiceImpl @Inject() (newsletterDAO: NewsletterDAO)(
  implicit
  ex: CustomerExecutionContext
) extends NewsletterService {

  /**
   * Retrieves a newsletter that matches the specified ID.
   *
   * @param id The ID to retrieve a newsletter.
   * @return The retrieved newsletter or None if no newsletter could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[SubscribeToNewsletter]] = newsletterDAO.find(id)

  /**
   * Retrieves a newsletter that matches the specified email.
   *
   * @param email The email to retrieve a newsletter.
   * @return The retrieved newsletter or None if no newsletter could be retrieved for the given email.
   */
  def retrieve(email: String): Future[Option[SubscribeToNewsletter]] = newsletterDAO.find(email)

  /**
   * Saves a newsletter.
   *
   * @param user The newsletter to save.
   * @return The saved newsletter.
   */
  def save(newsletter: SubscribeToNewsletter): Future[SubscribeToNewsletter] = newsletterDAO.save(newsletter)

  /**
   * Deletes a newsletter subscription.
   *
   * @param id The id of the newsletter.
   * @return A future to wait for the process to be completed.
   */
  def deleteSubscription(id: BSONObjectID): Future[Unit] = newsletterDAO.removeSubscription(id)
}
