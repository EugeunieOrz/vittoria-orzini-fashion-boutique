package core.models.daos

import core.models.CreditCards
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
 * Give access to the [[CreditCards]] object.
 *
 * @param reactiveMongoApi The ReactiveMongo API.
 * @param ec               The execution context.
 */
class CreditCardsDAOImpl @Inject() (reactiveMongoApi: ReactiveMongoApi)(
  implicit
  val ec: CustomerExecutionContext
) extends CreditCardsDAO with MongoModel {

  /**
   * The MongoDB collection.
   */
  protected def collection = reactiveMongoApi.database.map(_.collection[JSONCollection]("credit_cards"))

  /**
   * Finds the credit cards by the user ID.
   *
   * @param userID The ID of the user in order to find the credit cards.
   * @return The found credit cards or None if no credit cards for the given ID could be found.
   */
  def find(userID: BSONObjectID): Future[Option[CreditCards]] =
    collection.flatMap(_.find(Json.obj("_id" -> BSONObjectIDFormat.partialWrites(userID))).one[CreditCards])

  /**
   * Saves the credit cards.
   *
   * @param creditCards The credit cards to save.
   * @return The saved credit cards.
   */
  def save(creditCards: CreditCards): Future[CreditCards] = {
    onSuccess(collection.flatMap(
      _.update(
        Json.obj("_id" -> BSONObjectIDFormat.partialWrites(creditCards.id)),
        creditCards,
        upsert = true
      )
    ), creditCards)
  }
}
