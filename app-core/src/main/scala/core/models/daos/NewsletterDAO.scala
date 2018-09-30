package core.models.daos

import com.mohiva.play.silhouette.api.LoginInfo
import core.models.NewsletterSubscription
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Give access to the user object.
 */
trait NewsletterDAO {

  /**
   * Finds a newsletter subscription data by its login info.
   *
   * @param loginInfo The login info of the newsletter subscription data to find.
   * @return The found newsletter subscription data or None
   *         if no newsletter subscription data for the given login info could be found.
   */
  def find(loginInfo: LoginInfo): Future[Option[NewsletterSubscription]]

  /**
   * Finds a newsletter subscription data by its user ID.
   *
   * @param userID The ID of the newsletter subscription data to find.
   * @return The found newsletter subscription data or None
   *         if no newsletter subscription data for the given ID could be found.
   */
  def find(userID: BSONObjectID): Future[Option[NewsletterSubscription]]

  /**
   * Saves a newsletter subscription data.
   *
   * @param newsletter The newsletter subscription data to save.
   * @return The saved newsletter subscription data.
   */
  def save(newsletter: NewsletterSubscription): Future[NewsletterSubscription]
}
