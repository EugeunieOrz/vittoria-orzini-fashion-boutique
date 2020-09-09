package models.shopping.daos

import models.core.Item
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
 * Give access to the [[Item]] object.
 *
 * @param reactiveMongoApi The ReactiveMongo API.
 * @param ec               The execution context.
 */
class ItemDAOImpl @Inject() (reactiveMongoApi: ReactiveMongoApi)(
  implicit
  val ec: CustomerExecutionContext
) extends ItemDAO with MongoModel {

  /**
   * The MongoDB collection.
   */
  protected def collection = reactiveMongoApi.database.map(_.collection[JSONCollection]("collection"))
  protected def items = reactiveMongoApi.database.map(_.collection[JSONCollection]("items"))
  protected def dresses = reactiveMongoApi.database.map(_.collection[JSONCollection]("dresses"))
  protected def evening = reactiveMongoApi.database.map(_.collection[JSONCollection]("evening"))
  protected def jackets = reactiveMongoApi.database.map(_.collection[JSONCollection]("jackets"))

  protected def products(category: String) = category match {
    case "Dresses" => dresses
    case "Evening" => evening
    case "Jackets" => jackets
    case _ => items
  }

  /**
   * Finds a item by its id.
   *
   * @param id The ID of the item to find.
   * @param category The category of the item to find.
   * @return The found item or None if no item for the given ID could be found.
   */
  def find(id: BSONObjectID, category: String): Future[Option[Item]] =
    products(category).flatMap(_
      .find(Json.obj("_id" -> BSONObjectIDFormat.partialWrites(id)), projection = Option.empty[JsObject])
      .one[Item])

  /**
   * Saves a item.
   *
   * @param item The item item to save.
   * @param category The category of the item to save.
   * @return The saved item.
   */
  def save(item: Item, category: String): Future[Item] = {
    onSuccess(products(category).flatMap(
      _.update(
        Json.obj("_id" -> BSONObjectIDFormat.partialWrites(item.id)),
        item,
        upsert = true
      )
    ), item)
  }

  /**
   * Retrieves all the items in a collection.
   * @param category The category of the items.
   */
  def findAll(category: String): Future[Seq[Item]] = {
    products(category).flatMap(
      _.find(Json.obj(), projection = Option.empty[JsObject])
        .cursor[Item]()
        .collect[Seq](-1, Cursor.FailOnError[Seq[Item]]())
    )
  }

}
