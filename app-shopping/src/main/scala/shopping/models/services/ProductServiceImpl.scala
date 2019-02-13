package shopping.models.services

import java.time.Clock

import core.models.Item
import shopping.models.daos.ProductDAO
import core.utils.CustomerExecutionContext
import javax.inject.Inject
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to products.
 *
 * @param productDAO The product DAO implementation.
 * @param clock      The clock instance.
 * @param ex         The execution context.
 */
class ProductServiceImpl @Inject() (productDAO: ProductDAO, clock: Clock)(
  implicit
  ex: CustomerExecutionContext
) extends ProductService {

  /**
   * Retrieves a product that matches the specified ID.
   *
   * @param id The ID to retrieve a product.
   * @return The retrieved product or None if no product could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[Item]] = productDAO.find(id)

  /**
   * Saves a product.
   *
   * @param product The product to save.
   * @return The saved product.
   */
  def save(item: Item): Future[Item] = productDAO.save(item)

  /**
   * Retrieves all the products in a collection.
   */
  def retrieveAll: Future[Seq[Item]] = productDAO.findAll

}
