package modules.newsletter

import models.newsletter.daos._
import models.newsletter.services._
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
    bind[NewsletterService].to[NewsletterServiceImpl]
    bind[NewsletterDAO].to[NewsletterDAOImpl]
    
    bind[NewsletterTaskDAO].to[NewsletterTaskDAOImpl]
    bind[NewsletterTaskService].to[NewsletterTaskServiceImpl]
  }
}
