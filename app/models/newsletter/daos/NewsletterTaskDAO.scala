package models.newsletter.daos

import java.time.Instant
import java.util.UUID

import models.newsletter.NewsletterTask

import scala.concurrent.Future

/**
 * Give access to the [[Newsletter]] object.
 */
trait NewsletterTaskDAO {

  /**
   * Finds a newsletter by its ID.
   *
   * @param id The unique newsletter ID.
   * @return The found newsletter or None if no newsletter for the given ID could be found.
   */
  def find(id: UUID): Future[Option[NewsletterTask]]

  /**
   * Finds a newsletter by its email.
   *
   * @param email The unique newsletter email.
   * @return The found newsletter or None if no newsletter for the given email could be found.
   */
  def find(email: String): Future[Option[NewsletterTask]]

  /**
   * Finds expired newsletters.
   *
   * @param dateTime The current instant.
   */
  def findExpired(dateTime: Instant): Future[Seq[NewsletterTask]]

  /**
   * Saves a newsletter.
   *
   * @param newsletter The newsletter to save.
   * @return The saved newsletter.
   */
  def save(newsletter: NewsletterTask): Future[NewsletterTask]

  /**
   * Removes the newsletter for the given ID.
   *
   * @param id The ID for which the newsletter should be removed.
   * @return A future to wait for the process to be completed.
   */
  def remove(id: UUID): Future[Unit]
}
