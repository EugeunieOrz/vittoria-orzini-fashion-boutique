package models.shopping.services

import models.core.Transaction
import models.shopping.daos.TransactionDAO
import utils.core.CustomerExecutionContext
import javax.inject.Inject
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to Transactions.
 *
 * @param transactionDAO The Transaction DAO implementation.
 * @param ex         The execution context.
 */
class TransactionServiceImpl @Inject() (transactionDAO: TransactionDAO)(
  implicit
  ex: CustomerExecutionContext
) extends TransactionService {

  /**
   * Retrieves a transaction that matches the specified ID.
   *
   * @param id The ID to retrieve a transaction.
   * @return The retrieved transaction or None if no transaction could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[Transaction]] = transactionDAO.find(id)

  /**
   * Saves a transaction.
   *
   * @param transaction The transaction to save.
   * @return The saved transaction.
   */
  def save(transaction: Transaction): Future[Transaction] = transactionDAO.save(transaction)

  /**
   * Retrieves all the transactions in a collection.
   */
  def retrieveAll: Future[Seq[Transaction]] = transactionDAO.findAll

  /**
   * Removes the transaction for the given ID.
   *
   * @param id The ID for which the transaction should be removed.
   * @return A future to wait for the process to be completed.
   */
  def remove(id: BSONObjectID): Future[Unit] = {
    transactionDAO.delete(id)
  }

}
