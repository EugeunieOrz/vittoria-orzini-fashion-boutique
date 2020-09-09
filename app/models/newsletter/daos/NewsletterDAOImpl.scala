package models.newsletter.daos

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import models.core.SubscribeToNewsletter
import utils.core.CustomerExecutionContext
import utils.core.json.MongoFormats._
import utils.core.mongo.MongoModel
import javax.inject.Inject
import play.api.libs.json._
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.bson.BSONObjectID
import reactivemongo.play.json._
import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat
import reactivemongo.play.json.collection.JSONCollection

import scala.concurrent.Future

/**
 * Give access to the [[SubscribeToNewsletter]] object.
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
  protected def collection = reactiveMongoApi.database.map(
    _.collection[JSONCollection]("newsletter-subscription"))

  /**
   * Finds a newsletter by its email.
   *
   * @param email The email of the newsletter to find.
   * @return The found newsletter or None if no newsletter for the given email could be found.
   */
  def find(email: String): Future[Option[SubscribeToNewsletter]] =
    collection.flatMap(
      _.find(
        Json.obj("loginInfo" -> email), projection = Option.empty[JsObject]).one[SubscribeToNewsletter])

  /**
   * Finds a newsletter by its user ID.
   *
   * @param userID The ID of the newsletter to find.
   * @return The found newsletter or None if no newsletter for the given ID could be found.
   */
  def find(id: BSONObjectID): Future[Option[SubscribeToNewsletter]] =
    collection.flatMap(
      _.find(
        Json.obj(
          "_id" -> BSONObjectIDFormat.partialWrites(id)
        ), projection = Option.empty[JsObject]).one[SubscribeToNewsletter])

  /**
   * Saves a newsletter.
   *
   * @param user The newsletter to save.
   * @return The saved newsletter.
   */
  def save(newsletter: SubscribeToNewsletter): Future[SubscribeToNewsletter] = {
    onSuccess(collection.flatMap(
      _.update(
        Json.obj("_id" -> BSONObjectIDFormat.partialWrites(newsletter.id)),
        newsletter,
        upsert = true
      )
    ), newsletter)
  }

  /**
   * Deletes a newsletter subscription.
   *
   * @param id The id of the newsletter.
   * @return A future to wait for the process to be completed.
   */
  def removeSubscription(id: BSONObjectID): Future[Unit] = {
    onSuccess(collection.flatMap(_.delete().one(Json.obj("_id" -> id), Some(1))), ())
  }
}
