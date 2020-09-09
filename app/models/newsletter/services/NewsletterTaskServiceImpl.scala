package models.newsletter.services

import java.time.Clock
import java.util.UUID
import javax.inject.Inject

import models.newsletter.NewsletterTask
import models.newsletter.daos.NewsletterTaskDAO

import reactivemongo.bson.BSONObjectID
import play.api.i18n.Lang

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future }
import scala.language.postfixOps

/**
 * Handles actions to newsletters.
 *
 * @param newsletterDAO The newsletter DAO implementation.
 * @param clock        The clock instance.
 * @param ex           The execution context.
 */
class NewsletterTaskServiceImpl @Inject() (
  newsletterDAO: NewsletterTaskDAO,
  clock: Clock
)(
  implicit
  ex: ExecutionContext
) extends NewsletterTaskService {

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
    expiry: FiniteDuration = 7 days): Future[NewsletterTask] = {
    val expiryDate = clock.instant().plusSeconds(expiry.toSeconds)
    val newsletter = NewsletterTask(
      UUID.randomUUID(),
      email,
      lang,
      expiryDate,
      newsletterFashion,
      newsletterFineJewelry,
      newsletterHomeCollection
    )
    newsletterDAO.save(newsletter)
  }

  /**
   * Updates a newsletter.
   *
   * @param user The newsletter to update.
   * @return The updated newsletter.
   */
  def update(newsletter: NewsletterTask): Future[NewsletterTask] = newsletterDAO.save(newsletter)

  /**
   * Reschedules sending newsletters.
   *
   * @return The list of deleted newsletters.
   */
  def reschedule(expiry: FiniteDuration = 7 days): Future[Seq[NewsletterTask]] = {
    newsletterDAO.findExpired(clock.instant()).flatMap { newsletters =>
      Future.sequence(newsletters.map { newsletter =>
        newsletterDAO.save(newsletter.copy(
          expiry = clock.instant().plusSeconds(expiry.toSeconds)
        ))
      })
    }
  }

  /**
   * Retrieves a newsletter that matches the specified ID.
   *
   * @param id The ID to retrieve a newsletter.
   * @return The retrieved newsletter or None if no newsletter could be retrieved for the given ID.
   */
  def retrieve(id: UUID): Future[Option[NewsletterTask]] = newsletterDAO.find(id)

  /**
   * Retrieves a newsletter that matches the specified email.
   *
   * @param email The email to retrieve a newsletter.
   * @return The retrieved newsletter or None if no newsletter could be retrieved for the given email.
   */
  def retrieve(email: String): Future[Option[NewsletterTask]] = newsletterDAO.find(email)

  /**
   * Deletes a newsletter subscription.
   *
   * @param id The id of the newsletter.
   * @return A future to wait for the process to be completed.
   */
  def delete(id: UUID): Future[Unit] = newsletterDAO.remove(id)

  /**
   * Validates a newsletter ID.
   *
   * @param id The newsletter ID to validate.
   * @return The newsletter if it's valid, None otherwise.
   */
  def validate(id: UUID): Future[Option[NewsletterTask]] = newsletterDAO.find(id)
}
