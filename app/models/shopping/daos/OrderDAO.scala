package models.shopping.daos

import models.core.Order
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Give access to the order object.
 */
trait OrderDAO {

  /**
   * Finds a order by its id.
   *
   * @param id The id of the order to find.
   * @return The found order or None if no customer for the given id could be found.
   */
  def find(id: BSONObjectID): Future[Option[Order]]

  /**
   * Saves a order.
   *
   * @param item The order to save.
   * @return The saved order.
   */
  def save(customer: Order): Future[Order]

  /**
   * Retrieves all the orders in a collection.
   */
  def findAll: Future[Seq[Order]]

  /**
   * Deletes the order for the given ID.
   *
   * @param id The ID for which the order should be removed.
   * @return A future to wait for the process to be completed.
   */
  def delete(id: BSONObjectID): Future[Unit]
}
