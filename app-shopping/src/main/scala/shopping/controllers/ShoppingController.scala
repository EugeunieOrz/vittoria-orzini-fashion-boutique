package shopping.controllers

import core.controllers.ApiController
import core.models.{ Item, Size }
import core.utils.DefaultEnv
import core.utils.json.APIFormats._
import shopping.models.services.ProductService
import javax.inject.Inject
import net.ceedubs.ficus.Ficus._
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
class ShoppingController @Inject() (
  val controllerComponents: ControllerComponents,
  val productService: ProductService
)(
  implicit
  ex: ExecutionContext
) extends ApiController {

  /**
   * Gets the products.
   *
   * @return The products.
   */
  def get: Action[AnyContent] = Action.async { implicit request =>
    productService.retrieveAll.map { products =>
      println(products)
      Ok(ApiResponse("shopping.products", Messages("request.ok"), Json.toJson(products)))
    }
  }

  def passProductID(productID: reactivemongo.bson.BSONObjectID): Action[AnyContent] = Action.async { implicit request =>
    Future.successful(Ok(ApiResponse("shopping.products", Messages("request.ok"))))
  }
}
