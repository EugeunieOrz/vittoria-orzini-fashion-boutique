package models.shopping.services

import java.time.Clock

import models.core.Item
import models.shopping.daos.ItemDAO
import utils.core.CustomerExecutionContext
import javax.inject.Inject
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to items.
 *
 * @param itemDAO The item DAO implementation.
 * @param clock      The clock instance.
 * @param ex         The execution context.
 */
class ItemServiceImpl @Inject() (itemDAO: ItemDAO, clock: Clock)(
  implicit
  ex: CustomerExecutionContext
) extends ItemService {

  /**
   * Retrieves a item that matches the specified ID.
   *
   * @param id The ID to retrieve a item.
   * @param category The category of the item to find.
   * @return The retrieved item or None if no item could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID, category: String): Future[Option[Item]] = itemDAO.find(id, category)

  /**
   * Saves a item.
   *
   * @param item The item to save.
   * @param category The category of the item to save.
   * @return The saved item.
   */
  def save(item: Item, category: String): Future[Item] = itemDAO.save(item, category)

  /**
   * Retrieves all the items in a collection.
   * @param category The category of the items to retrieve.
   */
  def retrieveAll(category: String): Future[Seq[Item]] = itemDAO.findAll(category)

}
