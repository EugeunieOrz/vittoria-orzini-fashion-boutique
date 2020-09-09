package models.shopping.services

import models.core.Order
import models.shopping.daos.OrderDAO
import utils.core.CustomerExecutionContext
import javax.inject.Inject
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to orders.
 *
 * @param orderDAO The order DAO implementation.
 * @param ex         The execution context.
 */
class OrderServiceImpl @Inject() (orderDAO: OrderDAO)(
  implicit
  ex: CustomerExecutionContext
) extends OrderService {

  /**
   * Retrieves a order that matches the specified ID.
   *
   * @param id The ID to retrieve a order.
   * @return The retrieved order or None if no order could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[Order]] = orderDAO.find(id)

  /**
   * Saves a order.
   *
   * @param order The order to save.
   * @return The saved order.
   */
  def save(order: Order): Future[Order] = orderDAO.save(order)

  /**
   * Retrieves all the orders in a collection.
   */
  def retrieveAll: Future[Seq[Order]] = orderDAO.findAll

  /**
   * Removes the order for the given ID.
   *
   * @param id The ID for which the order should be removed.
   * @return A future to wait for the process to be completed.
   */
  def remove(id: BSONObjectID): Future[Unit] = {
    orderDAO.delete(id)
  }

}
