package models.shopping.daos

import models.core.Transaction
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Give access to the order object.
 */
trait TransactionDAO {

  /**
   * Finds a Transaction by its id.
   *
   * @param id The id of the Transaction to find.
   * @return The found Transaction or None if no transaction for the given id could be found.
   */
  def find(id: BSONObjectID): Future[Option[Transaction]]

  /**
   * Saves a Transaction.
   *
   * @param item The Transaction to save.
   * @return The saved Transaction.
   */
  def save(transaction: Transaction): Future[Transaction]

  /**
   * Retrieves all the Transactions in a collection.
   */
  def findAll: Future[Seq[Transaction]]

  /**
   * Deletes the Transaction for the given ID.
   *
   * @param id The ID for which the Transaction should be removed.
   * @return A future to wait for the process to be completed.
   */
  def delete(id: BSONObjectID): Future[Unit]
}
