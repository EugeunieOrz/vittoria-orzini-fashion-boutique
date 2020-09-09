package models.core.services

import java.time.Clock

import com.mohiva.play.silhouette.api.LoginInfo
import models.core.{ Registration, Settings, User }
import models.core.daos.UserDAO
import utils.core.CustomerExecutionContext
import javax.inject.Inject
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to users.
 *
 * @param userDAO The user DAO implementation.
 * @param clock   The clock instance.
 * @param ex      The execution context.
 */
class UserServiceImpl @Inject() (
  userDAO: UserDAO,
  clock: Clock)(
  implicit
  ex: CustomerExecutionContext
) extends UserService {

  /**
   * Retrieves a user that matches the specified ID.
   *
   * @param id The ID to retrieve a user.
   * @return The retrieved user or None if no user could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[User]] = userDAO.find(id)

  /**
   * Retrieves a user that matches the specified login info.
   *
   * @param loginInfo The login info to retrieve a user.
   * @return The retrieved user or None if no user could be retrieved for the given login info.
   */
  def retrieve(loginInfo: LoginInfo): Future[Option[User]] = userDAO.find(loginInfo)

  /**
   * Retrieves all the users in a collection.
   */
  def retrieveAll: Future[Seq[User]] = userDAO.findAll

  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User): Future[User] = userDAO.save(user)

  /**
   * Deletes a user's account.
   *
   * @param id The id of the user.
   * @return A future to wait for the process to be completed.
   */
  def deleteAccount(id: BSONObjectID): Future[Unit] = userDAO.removeAccount(id)
}
