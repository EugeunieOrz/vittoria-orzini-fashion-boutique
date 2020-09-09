package models.shopping.daos

import models.core.Transaction
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
 * Give access to the [[Transaction]] object.
 *
 * @param reactiveMongoApi The ReactiveMongo API.
 * @param ec               The execution context.
 */
class TransactionDAOImpl @Inject() (reactiveMongoApi: ReactiveMongoApi)(
  implicit
  val ec: CustomerExecutionContext
) extends TransactionDAO with MongoModel {

  /**
   * The MongoDB collection.
   */
  protected def collection = reactiveMongoApi.database.map(_.collection[JSONCollection]("transactions"))

  /**
   * Finds a Transaction by its id.
   *
   * @param id The ID of the Transaction to find.
   * @return The found Transaction or None if no transaction for the given ID could be found.
   */
  def find(id: BSONObjectID): Future[Option[Transaction]] =
    collection.flatMap(_
      .find(Json.obj("_id" -> BSONObjectIDFormat.partialWrites(id)), projection = Option.empty[JsObject])
      .one[Transaction])

  /**
   * Saves a Transaction.
   *
   * @param user The order to save.
   * @return The saved Transaction.
   */
  def save(transaction: Transaction): Future[Transaction] = {
    onSuccess(collection.flatMap(
      _.update(
        Json.obj("_id" -> BSONObjectIDFormat.partialWrites(transaction.id)),
        transaction,
        upsert = true
      )
    ), transaction)
  }

  /**
   * Retrieves all the Transactions in a collection.
   */
  def findAll: Future[Seq[Transaction]] = {
    collection.flatMap(
      _.find(Json.obj(), projection = Option.empty[JsObject])
        .cursor[Transaction]()
        .collect[Seq](-1, Cursor.FailOnError[Seq[Transaction]]())
    )
  }

  /**
   * Deletes the Transaction for the given ID.
   *
   * @param id The ID for which the Transaction should be removed.
   * @return A future to wait for the process to be completed.
   */
  def delete(id: BSONObjectID): Future[Unit] =
    onSuccess(collection.flatMap(_.delete().one(Json.obj("_id" -> id), Some(1))), ())

}
