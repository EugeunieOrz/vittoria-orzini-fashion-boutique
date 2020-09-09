package models.core.daos

import com.mohiva.play.silhouette.api.LoginInfo
import models.core.User
import utils.core.CustomerExecutionContext
import utils.core.json.MongoFormats._
import utils.core.mongo.MongoModel
import javax.inject.Inject
import play.api.libs.json._
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.bson.BSONObjectID
import reactivemongo.api.Cursor
import reactivemongo.play.json._
import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat
import reactivemongo.play.json.collection.JSONCollection

import scala.concurrent.Future

/**
 * Give access to the [[User]] object.
 *
 * @param reactiveMongoApi The ReactiveMongo API.
 * @param ec               The execution context.
 */
class UserDAOImpl @Inject() (reactiveMongoApi: ReactiveMongoApi)(
  implicit
  val ec: CustomerExecutionContext
) extends UserDAO with MongoModel {

  /**
   * The MongoDB collection.
   */
  protected def collection = reactiveMongoApi.database.map(_.collection[JSONCollection]("users"))

  /**
   * Finds a user by its login info.
   *
   * @param loginInfo The login info of the user to find.
   * @return The found user or None if no user for the given login info could be found.
   */
  def find(loginInfo: LoginInfo): Future[Option[User]] =
    collection.flatMap(_.find(Json.obj("loginInfo" -> loginInfo), projection = Option.empty[JsObject]).one[User])

  /**
   * Finds a user by its user ID.
   *
   * @param userID The ID of the user to find.
   * @return The found user or None if no user for the given ID could be found.
   */
  def find(userID: BSONObjectID): Future[Option[User]] =
    collection.flatMap(
      _.find(
        Json.obj(
          "_id" -> BSONObjectIDFormat.partialWrites(userID)
        ), projection = Option.empty[JsObject]).one[User])

  /**
   * Retrieves all the users in a collection.
   */
  def findAll: Future[Seq[User]] = {
    collection.flatMap(
      _.find(Json.obj(), projection = Option.empty[JsObject])
        .cursor[User]()
        .collect[Seq](-1, Cursor.FailOnError[Seq[User]]())
    )
  }

  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User): Future[User] = {
    onSuccess(collection.flatMap(
      _.update(
        Json.obj("_id" -> BSONObjectIDFormat.partialWrites(user.id)),
        user,
        upsert = true
      )
    ), user)
  }

  /**
   * Deletes a user's account.
   *
   * @param id The id of the user.
   * @return A future to wait for the process to be completed.
   */
  def removeAccount(id: BSONObjectID): Future[Unit] = {
    onSuccess(collection.flatMap(_.delete().one(Json.obj("_id" -> id), Some(1))), ())
  }
}
