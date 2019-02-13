package shopping.models.daos

import core.models.Item
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Give access to the product object.
 */
trait ProductDAO {

  /**
   * Finds a product by its id.
   *
   * @param id The id of the product to find.
   * @return The found product or None if no product for the given id could be found.
   */
  def find(id: BSONObjectID): Future[Option[Item]]

  /**
   * Saves a product.
   *
   * @param item The product to save.
   * @return The saved product.
   */
  def save(item: Item): Future[Item]

  /**
   * Retrieves all the products in a collection.
   */
  def findAll: Future[Seq[Item]]
}
