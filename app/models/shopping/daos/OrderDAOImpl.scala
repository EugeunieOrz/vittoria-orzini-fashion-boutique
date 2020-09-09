package models.shopping.daos

import models.core.Order
import utils.core.CustomerExecutionContext
import utils.core.json.MongoFormats._
import utils.core.mongo.MongoModel
import javax.inject.Inject
import play.api.libs.json._
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.Cursor
import reactivemongo.bson.{ BSONDocument, BSONObjectID }
import reactivemongo.play.json._
import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat
import reactivemongo.play.json.collection.JSONCollection

import scala.concurrent.Future

/**
 * Give access to the [[Order]] object.
 *
 * @param reactiveMongoApi The ReactiveMongo API.
 * @param ec               The execution context.
 */
class OrderDAOImpl @Inject() (reactiveMongoApi: ReactiveMongoApi)(
  implicit
  val ec: CustomerExecutionContext
) extends OrderDAO with MongoModel {

  /**
   * The MongoDB collection.
   */
  protected def collection = reactiveMongoApi.database.map(_.collection[JSONCollection]("orders"))

  /**
   * Finds a order by its id.
   *
   * @param id The ID of the order to find.
   * @return The found order or None if no customer for the given ID could be found.
   */
  def find(id: BSONObjectID): Future[Option[Order]] =
    collection.flatMap(_
      .find(Json.obj("_id" -> BSONObjectIDFormat.partialWrites(id)), projection = Option.empty[JsObject])
      .one[Order])

  /**
   * Saves a order.
   *
   * @param user The order to save.
   * @return The saved order.
   */
  def save(order: Order): Future[Order] = {
    onSuccess(collection.flatMap(
      _.update(
        Json.obj("_id" -> BSONObjectIDFormat.partialWrites(order.id)),
        order,
        upsert = true
      )
    ), order)
  }

  /**
   * Retrieves all the orders in a collection.
   */
  def findAll: Future[Seq[Order]] = {
    collection.flatMap(
      _.find(Json.obj(), projection = Option.empty[JsObject])
        .cursor[Order]()
        .collect[Seq](-1, Cursor.FailOnError[Seq[Order]]())
    )
  }

  /**
   * Deletes the order for the given ID.
   *
   * @param id The ID for which the order should be removed.
   * @return A future to wait for the process to be completed.
   */
  def delete(id: BSONObjectID): Future[Unit] =
    onSuccess(collection.flatMap(_.delete().one(Json.obj("_id" -> id), Some(1))), ())

}
