package core.models.services

import core.models.Addresses
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to the addresses.
 */
trait AddressesService {

  /**
   * Retrieves the addresses that match the specified ID.
   *
   * @param id The ID to retrieve the addresses.
   * @return The retrieved addresses or None if no addresses could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[Addresses]]

  /**
   * Saves the addresses.
   *
   * @param addresses The addresses to save.
   * @return The saved addresses.
   */
  def save(addresses: Addresses): Future[Addresses]

}
