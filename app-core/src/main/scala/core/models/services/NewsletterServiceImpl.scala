package core.models.services

import com.mohiva.play.silhouette.api.LoginInfo
import core.models.NewsletterSubscription
import core.models.daos.NewsletterDAO
import core.utils.CustomerExecutionContext
import javax.inject.Inject
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions about newsletter subscription.
 *
 * @param newsletterDAO The newsletter DAO implementation.
 * @param clock   The clock instance.
 * @param ex      The execution context.
 */
class NewsletterServiceImpl @Inject() (newsletterDAO: NewsletterDAO)(
  implicit
  ex: CustomerExecutionContext
) extends NewsletterService {

  /**
   * Retrieves a newsletter subscription data that matches the specified ID.
   *
   * @param id The ID to retrieve a newsletter subscription data.
   * @return The retrieved newsletter subscription data or None
   *         if no newsletter subscription data could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[NewsletterSubscription]] = newsletterDAO.find(id)

  /**
   * Retrieves a newsletter subscription data that matches the specified login info.
   *
   * @param loginInfo The login info to retrieve a newsletter subscription data.
   * @return The retrieved newsletter subscription data or None
   *         if no newsletter subscription data could be retrieved for the given login info.
   */
  def retrieve(loginInfo: LoginInfo): Future[Option[NewsletterSubscription]] = newsletterDAO.find(loginInfo)

  /**
   * Saves a newsletter subscription data.
   *
   * @param newsletter The newsletter subscription data to save.
   * @return The saved newsletter subscription data.
   */
  def save(newsletter: NewsletterSubscription): Future[NewsletterSubscription] = newsletterDAO.save(newsletter)

}
