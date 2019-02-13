package shopping.models.daos

import core.models.Item
import core.utils.CustomerExecutionContext
import core.utils.json.MongoFormats._
import core.utils.mongo.MongoModel
import javax.inject.Inject
import play.api.libs.json.Json
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.Cursor
import reactivemongo.bson.{ BSONDocument, BSONObjectID }
import reactivemongo.play.json._
import reactivemongo.play.json.BSONFormats.BSONObjectIDFormat
import reactivemongo.play.json.collection.JSONCollection

import scala.concurrent.Future

/**
 * Give access to the [[Product]] object.
 *
 * @param reactiveMongoApi The ReactiveMongo API.
 * @param ec               The execution context.
 */
class ProductDAOImpl @Inject() (reactiveMongoApi: ReactiveMongoApi)(
  implicit
  val ec: CustomerExecutionContext
) extends ProductDAO with MongoModel {

  /**
   * The MongoDB collection.
   */
  protected def collection = reactiveMongoApi.database.map(_.collection[JSONCollection]("products"))

  /**
   * Finds a product by its id.
   *
   * @param id The ID of the product to find.
   * @return The found product or None if no product for the given ID could be found.
   */
  def find(id: BSONObjectID): Future[Option[Item]] =
    collection.flatMap(_
      .find(Json.obj("_id" -> BSONObjectIDFormat.partialWrites(id)))
      .one[Item])

  /**
   * Saves a product.
   *
   * @param user The product to save.
   * @return The saved product.
   */
  def save(item: Item): Future[Item] = {
    onSuccess(collection.flatMap(
      _.update(
        Json.obj("_id" -> BSONObjectIDFormat.partialWrites(item.id)),
        item,
        upsert = true
      )
    ), item)
  }

  /**
   * Retrieves all the products in a collection.
   */
  def findAll: Future[Seq[Item]] = {
    collection.flatMap(
      _.find(Json.obj())
        .cursor[Item]()
        .collect[Seq](-1, Cursor.FailOnError[Seq[Item]]())
    )
  }

}
