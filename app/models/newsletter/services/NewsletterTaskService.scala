package models.newsletter.services

import java.util.UUID

import models.newsletter.NewsletterTask
import reactivemongo.bson.BSONObjectID
import play.api.i18n.Lang
import scala.concurrent.Future
import scala.concurrent.duration._
import scala.language.postfixOps

/**
 * Handles actions to newsletters.
 */
trait NewsletterTaskService {

  /**
   * Creates a new newsletter and saves it in the backing store.
   *
   * @param email The email for which the newsletter should be created.
   * @param expiry The duration a newsletter has to be sent.
   * @return The saved newsletter.
   */
  def create(
    lang: Lang = Lang("en"),
    email: String,
    newsletterFashion: Boolean,
    newsletterFineJewelry: Boolean,
    newsletterHomeCollection: Boolean,
    expiry: FiniteDuration = 7 days): Future[NewsletterTask]

  /**
   * Updates a newsletter.
   *
   * @param newsletter The newsletter to update.
   * @return The updated newsletter.
   */
  def update(newsletter: NewsletterTask): Future[NewsletterTask]

  /**
   * Cleans expired newsletters.
   *
   * @return The list of deleted newsletters.
   */
  def reschedule(expiry: FiniteDuration = 7 days): Future[Seq[NewsletterTask]]

  /**
   * Retrieves a newsletter that matches the specified ID.
   *
   * @param id The ID to retrieve a newsletter.
   * @return The retrieved newsletter or None if no user could be retrieved for the given ID.
   */
  def retrieve(id: UUID): Future[Option[NewsletterTask]]

  /**
   * Retrieves a newsletter that matches the specified email.
   *
   * @param email The email to retrieve a newsletter.
   * @return The retrieved newsletter or None if no user could be retrieved for the given email.
   */
  def retrieve(email: String): Future[Option[NewsletterTask]]

  /**
   * Deletes a newsletter subscription.
   *
   * @param id The id of the newsletter.
   * @return A future to wait for the process to be completed.
   */
  def delete(id: UUID): Future[Unit]

  /**
   * Validates a newsletter ID.
   *
   * @param id The newsletter ID to validate.
   * @return The newsletter if it's valid, None otherwise.
   */
  def validate(id: UUID): Future[Option[NewsletterTask]]

}
