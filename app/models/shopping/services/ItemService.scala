package models.shopping.services

import models.core.Item
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to items.
 */
trait ItemService {

  /**
   * Retrieves a item that matches the specified ID.
   *
   * @param id The ID to retrieve a item.
   * @param category The category of the item to retrieve.
   * @return The retrieved item or None if no item could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID, category: String): Future[Option[Item]]

  /**
   * Saves a item.
   *
   * @param item The item to save.
   * @param category The category of the item to save.
   * @return The saved item.
   */
  def save(item: Item, category: String): Future[Item]

  /**
   * Retrieves all the itemes in a collection.
   * @param category The category of the items to retrieve.
   */
  def retrieveAll(category: String): Future[Seq[Item]]

}
