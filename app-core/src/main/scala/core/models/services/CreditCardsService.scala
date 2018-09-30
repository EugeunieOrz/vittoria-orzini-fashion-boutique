package core.models.services

import core.models.CreditCards
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to the credit cards.
 */
trait CreditCardsService {

  /**
   * Retrieves the credit cards that match the specified ID.
   *
   * @param id The ID to retrieve the credit cards.
   * @return The retrieved credit cards or None if no credit cards could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[CreditCards]]

  /**
   * Saves the credit cards.
   *
   * @param creditCards The credit cards to save.
   * @return The saved credit cards.
   */
  def save(creditCards: CreditCards): Future[CreditCards]

}
