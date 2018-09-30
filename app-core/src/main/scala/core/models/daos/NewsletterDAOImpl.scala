package core.models.daos

import com.mohiva.play.silhouette.api.LoginInfo
import core.models.NewsletterSubscription
import core.utils.CustomerExecutionContext
import core.utils.json.MongoFormats._
import core.utils.mongo.MongoModel
import javax.inject.Inject
import play.api.libs.json.Json
import play.modules.reactivemongo.ReactiveMongoApi
import play.modules.reactivemongo.json._
import reactivemongo.bson.BSONObjectID
import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat
import reactivemongo.play.json.collection.JSONCollection

import scala.concurrent.Future

/**
 * Give access to the [[User]] object.
 *
 * @param reactiveMongoApi The ReactiveMongo API.
 * @param ec               The execution context.
 */
class NewsletterDAOImpl @Inject() (reactiveMongoApi: ReactiveMongoApi)(
  implicit
  val ec: CustomerExecutionContext
) extends NewsletterDAO with MongoModel {

  /**
   * The MongoDB collection.
   */
  protected def collection = reactiveMongoApi.database.map(_.collection[JSONCollection]("newsletter_subscription"))

  /**
   * Finds a newsletter subscription data by its login info.
   *
   * @param loginInfo The login info of thenewsletter subscription data to find.
   * @return The found newsletter subscription data or None
   *         if no newsletter subscription data for the given login info could be found.
   */
  def find(loginInfo: LoginInfo): Future[Option[NewsletterSubscription]] =
    collection.flatMap(_.find(Json.obj("loginInfo" -> loginInfo)).one[NewsletterSubscription])

  /**
   * Finds a newsletter subscription data by the user's ID.
   *
   * @param userID The ID of the user to find.
   * @return The found newsletter subscription data or None
   *         if no newsletter subscription data for the given ID could be found.
   */
  def find(userID: BSONObjectID): Future[Option[NewsletterSubscription]] =
    collection.flatMap(_.find(Json.obj("_id" -> BSONObjectIDFormat.partialWrites(userID))).one[NewsletterSubscription])

  /**
   * Saves a newsletter subscription data.
   *
   * @param newsletter The newsletter subscription data to save.
   * @return The saved newsletter subscription data.
   */
  def save(newsletter: NewsletterSubscription): Future[NewsletterSubscription] = {
    onSuccess(collection.flatMap(
      _.update(
        Json.obj("_id" -> BSONObjectIDFormat.partialWrites(newsletter.id)),
        newsletter,
        upsert = true
      )
    ), newsletter)
  }
}
