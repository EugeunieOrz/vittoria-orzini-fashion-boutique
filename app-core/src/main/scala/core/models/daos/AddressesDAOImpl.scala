package core.models.daos

import core.models.Addresses
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
 * Give access to the [[Addresses]] object.
 *
 * @param reactiveMongoApi The ReactiveMongo API.
 * @param ec               The execution context.
 */
class AddressesDAOImpl @Inject() (reactiveMongoApi: ReactiveMongoApi)(
  implicit
  val ec: CustomerExecutionContext
) extends AddressesDAO with MongoModel {

  /**
   * The MongoDB collection.
   */
  protected def collection = reactiveMongoApi.database.map(_.collection[JSONCollection]("addresses"))

  /**
   * Finds the addresses by the user ID.
   *
   * @param userID The ID of the user in order to find the addresses.
   * @return The found list of addresses or None if no list for the given ID could be found.
   */
  def find(userID: BSONObjectID): Future[Option[Addresses]] =
    collection.flatMap(_.find(Json.obj("_id" -> BSONObjectIDFormat.partialWrites(userID))).one[Addresses])

  /**
   * Saves the addresses.
   *
   * @param addreses The addresses to save.
   * @return The saved addresses.
   */
  def save(addresses: Addresses): Future[Addresses] = {
    onSuccess(collection.flatMap(
      _.update(
        Json.obj("_id" -> BSONObjectIDFormat.partialWrites(addresses.id)),
        addresses,
        upsert = true
      )
    ), addresses)
  }
}
