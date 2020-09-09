package models.newsletter.daos

import java.time.Instant
import java.util.UUID
import javax.inject.Inject

import models.newsletter.NewsletterTask
import utils.newsletter.json.MongoFormats._
import utils.core.CustomerExecutionContext
import utils.core.mongo.MongoModel
import play.api.libs.json._
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.play.json.collection.JSONCollection
import reactivemongo.play.json.compat._

import scala.concurrent.Future

/**
 * Give access to the [[Newsletter]] object.
 *
 * @param reactiveMongoApi The ReactiveMongo API.
 * @param ec               The execution context.
 */
class NewsletterTaskDAOImpl @Inject() (reactiveMongoApi: ReactiveMongoApi)(
  implicit
  val ec: CustomerExecutionContext
) extends NewsletterTaskDAO with MongoModel {

  /**
   * The MongoDB collection.
   */
  protected def collection = reactiveMongoApi.database.map(_.collection[JSONCollection]("newsletters"))

  /**
   * Finds a newsletter by its ID.
   *
   * @param id The unique newsletter ID.
   * @return The found newsletter or None if no newsletter for the given ID could be found.
   */
  def find(id: UUID): Future[Option[NewsletterTask]] =
    collection.flatMap(_.find(Json.obj("_id" -> id), projection = Option.empty[JsObject]).one[NewsletterTask])

  /**
   * Finds a newsletter by its email.
   *
   * @param email The unique newsletter email.
   * @return The found newsletter or None if no newsletter for the given email could be found.
   */
  def find(email: String): Future[Option[NewsletterTask]] =
    collection.flatMap(_.find(Json.obj("email" -> email), projection = Option.empty[JsObject]).one[NewsletterTask])

  /**
   * Finds expired newsletters.
   *
   * @param dateTime The current instant.
   */
  def findExpired(instant: Instant): Future[Seq[NewsletterTask]] =
    find[NewsletterTask](Json.obj("expiry" -> Json.obj("$lte" -> instant)))

  /**
   * Saves a newsletter.
   *
   * @param newsletter The newsletter to save.
   * @return The saved newsletter.
   */
  def save(newsletter: NewsletterTask): Future[NewsletterTask] = onSuccess(collection.flatMap(
    _.update(ordered = false).one(Json.obj("_id" -> newsletter.id), newsletter, upsert = true)
  ), newsletter)

  /**
   * Removes the newsletter for the given ID.
   *
   * @param id The ID for which the newsletter should be removed.
   * @return A future to wait for the process to be completed.
   */
  def remove(id: UUID): Future[Unit] =
    onSuccess(collection.flatMap(_.delete().one(Json.obj("_id" -> id), Some(1))), ())
}
