package models.core.services

import com.mohiva.play.silhouette.api.services.IdentityService
import models.core.User
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to users.
 */
trait UserService extends IdentityService[User] {

  /**
   * Retrieves a user that matches the specified ID.
   *
   * @param id The ID to retrieve a user.
   * @return The retrieved user or None if no user could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[User]]

  /**
   * Retrieves all the users in a collection.
   */
  def retrieveAll: Future[Seq[User]]

  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User): Future[User]

  /**
   * Deletes a user's account.
   *
   * @param id The id of the user.
   * @return A future to wait for the process to be completed.
   */
  def deleteAccount(id: BSONObjectID): Future[Unit]
}
