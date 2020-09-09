package models.shopping.daos

import models.core.Item
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Give access to the item object.
 */
trait ItemDAO {

  /**
   * Finds a item by its id.
   *
   * @param id The id of the item to find.
   * @param category The category of the item to find.
   * @return The found item or None if no item for the given id could be found.
   */
  def find(id: BSONObjectID, category: String): Future[Option[Item]]

  /**
   * Saves a item.
   *
   * @param item The item to save.
   * @param category The category of the item to save.
   * @return The saved item.
   */
  def save(item: Item, category: String): Future[Item]

  /**
   * Retrieves all the items in a collection.
   * @param category The category of the items to retrieve.
   */
  def findAll(category: String): Future[Seq[Item]]
}
