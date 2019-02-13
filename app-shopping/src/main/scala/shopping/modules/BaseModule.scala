package shopping.modules

import net.codingwell.scalaguice.ScalaModule
import shopping.models.daos._
import shopping.models.services._

/**
 * The Guice `Main` module.
 */
class BaseModule extends ScalaModule {

  /**
   * Configures the module.
   */
  def configure(): Unit = {
    bind[ProductService].to[ProductServiceImpl]
    bind[ProductDAO].to[ProductDAOImpl]
  }
}
