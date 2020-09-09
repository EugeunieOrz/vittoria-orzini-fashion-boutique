package models.shopping.services

import models.core.Transaction
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to Transactions.
 */
trait TransactionService {

  /**
   * Retrieves a Transaction that matches the specified ID.
   *
   * @param id The ID to retrieve a Transaction.
   * @return The retrieved Transaction or None if no Transaction could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[Transaction]]

  /**
   * Saves a Transaction.
   *
   * @param order The Transaction to save.
   * @return The saved Transaction.
   */
  def save(transaction: Transaction): Future[Transaction]

  /**
   * Retrieves all the Transactions in a collection.
   */
  def retrieveAll: Future[Seq[Transaction]]

  /**
   * Removes a Transaction.
   *
   * @return The deleted Transaction.
   */
  def remove(id: BSONObjectID): Future[Unit]

}
