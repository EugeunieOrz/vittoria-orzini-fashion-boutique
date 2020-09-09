package modules.shopping

import models.shopping.daos._
import models.shopping.services._
import net.codingwell.scalaguice.ScalaModule
import play.api.libs.concurrent.AkkaGuiceSupport

/**
 * The Guice `Main` module.
 */
class BaseModule extends ScalaModule with AkkaGuiceSupport {

  /**
   * Configures the module.
   */
  override def configure(): Unit = {
    bind[ItemService].to[ItemServiceImpl]
    bind[ItemDAO].to[ItemDAOImpl]
    bind[OrderService].to[OrderServiceImpl]
    bind[OrderDAO].to[OrderDAOImpl]
    bind[TransactionService].to[TransactionServiceImpl]
    bind[TransactionDAO].to[TransactionDAOImpl]
  }
}
