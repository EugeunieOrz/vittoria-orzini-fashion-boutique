package core.models.daos

import core.models.CreditCards
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Give access to the credit cards object.
 */
trait CreditCardsDAO {

  /**
   * Finds the credit cards by the user ID.
   *
   * @param userID The ID of the user in order to find the credit cards.
   * @return The found credit cards or None if no credit cards for the given ID could be found.
   */
  def find(userID: BSONObjectID): Future[Option[CreditCards]]

  /**
   * Saves the credit cards.
   *
   * @param addreses The credit cards to save.
   * @return The saved credit cards.
   */
  def save(creditCards: CreditCards): Future[CreditCards]
}
