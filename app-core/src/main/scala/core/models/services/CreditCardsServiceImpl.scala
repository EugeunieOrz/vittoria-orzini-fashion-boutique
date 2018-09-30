package core.models.services

import core.models.CreditCards
import core.models.daos.CreditCardsDAO
import core.utils.CustomerExecutionContext
import javax.inject.Inject
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to the credit cards.
 *
 * @param creditCardsDAO The credit cards DAO implementation.
 * @param ex      The execution context.
 */
class CreditCardsServiceImpl @Inject() (creditCardsDAO: CreditCardsDAO)(
  implicit
  ex: CustomerExecutionContext
) extends CreditCardsService {

  /**
   * Retrieves the credit cards that match the specified ID.
   *
   * @param id The user's ID to retrieve the credit cards.
   * @return The retrieved credit cards or None if no credit cards could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[CreditCards]] = creditCardsDAO.find(id)

  /**
   * Saves the credit cards.
   *
   * @param addresses The credit cards to save.
   * @return The saved credit cards.
   */
  def save(creditCards: CreditCards): Future[CreditCards] = creditCardsDAO.save(creditCards)

}
