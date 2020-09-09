package controllers.core

import models.core.services.HealthService
import utils.core.json.APIFormats._
import javax.inject.Inject
import play.api.i18n.Messages
import play.api.mvc._

import scala.concurrent.ExecutionContext

/**
 * The `Health` controller.
 *
 * @param controllerComponents The Play controller components.
 * @param healthService        The health service implementation.
 * @param ex                   The execution context.
 */
class HealthController @Inject() (
  val controllerComponents: ControllerComponents,
  healthService: HealthService
)(
  implicit
  ex: ExecutionContext
) extends ApiController {

  /**
   * Gets the health status for the application.
   *
   * @return Status code 200 if the app is healthy, status code 503 otherwise.
   */
  def get: Action[AnyContent] = Action.async { implicit request =>
    healthService.get().map {
      case true => Ok(ApiResponse("request.ok", Messages("request.ok")))
      case false => ServiceUnavailable(ApiResponse(
        "request.service.unavailable", Messages("request.service.unavailable")))
    }
  }
}
