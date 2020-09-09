package models.shopping.services

import models.core.Order
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to orders.
 */
trait OrderService {

  /**
   * Retrieves a order that matches the specified ID.
   *
   * @param id The ID to retrieve a order.
   * @return The retrieved order or None if no order could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[Order]]

  /**
   * Saves a order.
   *
   * @param order The order to save.
   * @return The saved order.
   */
  def save(order: Order): Future[Order]

  /**
   * Retrieves all the orders in a collection.
   */
  def retrieveAll: Future[Seq[Order]]

  /**
   * Removes a order.
   *
   * @return The deleted order.
   */
  def remove(id: BSONObjectID): Future[Unit]

}
