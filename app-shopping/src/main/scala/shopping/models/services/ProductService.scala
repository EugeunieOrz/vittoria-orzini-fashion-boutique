package shopping.models.services

import core.models.Item
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to products.
 */
trait ProductService {

  /**
   * Retrieves a product that matches the specified ID.
   *
   * @param id The ID to retrieve a product.
   * @return The retrieved product or None if no product could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[Item]]

  /**
   * Saves a product.
   *
   * @param product The product to save.
   * @return The saved product.
   */
  def save(item: Item): Future[Item]

  /**
   * Retrieves all the products in a collection.
   */
  def retrieveAll: Future[Seq[Item]]

}
