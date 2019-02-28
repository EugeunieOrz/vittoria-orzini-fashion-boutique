package shopping.controllers

import core.controllers.ApiController
import core.models.{ Item, Size }
import core.utils.DefaultEnv
import core.utils.json.APIFormats._
import shopping.models.services.ProductService

import javax.inject.Inject

import org.joda.time.DateTime

import play.api.i18n.{ Messages, MessagesProvider }
import play.api.libs.json._
import play.api.mvc._

import reactivemongo.bson.BSONObjectID

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future }

/**
 * The `Shopping` controller.
 *
 * @param controllerComponents  The Play controller components.
 * @param productService       The products service.
 * @param ex                    The execution context.
 */
class ProductController @Inject() (
  val controllerComponents: ControllerComponents,
  val productService: ProductService
)(
  implicit
  ex: ExecutionContext
) extends ApiController {

  /**
   * Gets a selected product from the Kafka topic.
   *
   * @return The products.
   */
  def get: Action[AnyContent] = Action.async { implicit request =>

    Future.successful(Ok(ApiResponse("shopping.products", Messages("request.ok"))))
  }

}
