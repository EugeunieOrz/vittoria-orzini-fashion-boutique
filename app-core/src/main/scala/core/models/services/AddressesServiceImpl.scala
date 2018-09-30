package core.models.services

import core.models.Addresses
import core.models.daos.AddressesDAO
import core.utils.CustomerExecutionContext
import javax.inject.Inject
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Handles actions to users.
 *
 * @param addressesDAO The addresses DAO implementation.
 * @param ex      The execution context.
 */
class AddressesServiceImpl @Inject() (addressesDAO: AddressesDAO)(
  implicit
  ex: CustomerExecutionContext
) extends AddressesService {

  /**
   * Retrieves the addresses that match the specified ID.
   *
   * @param id The user's ID to retrieve the addresses.
   * @return The retrieved addresses or None if no addresses could be retrieved for the given ID.
   */
  def retrieve(id: BSONObjectID): Future[Option[Addresses]] = addressesDAO.find(id)

  /**
   * Saves the addresses.
   *
   * @param addresses The addresses to save.
   * @return The saved addresses.
   */
  def save(addresses: Addresses): Future[Addresses] = addressesDAO.save(addresses)

}
