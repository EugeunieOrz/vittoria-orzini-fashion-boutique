package core.models.daos

import core.models.Addresses
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Give access to the addresses object.
 */
trait AddressesDAO {

  /**
   * Finds the addresses by the user ID.
   *
   * @param userID The ID of the user in order to find the addresses.
   * @return The found addresses or None if no addresses for the given ID could be found.
   */
  def find(userID: BSONObjectID): Future[Option[Addresses]]

  /**
   * Saves the addresses.
   *
   * @param addreses The addresses to save.
   * @return The saved addresses.
   */
  def save(addresses: Addresses): Future[Addresses]
}
