package core.controllers

import com.mohiva.play.silhouette.api.Silhouette
import core.models.services.NewsletterService
import core.utils.DefaultEnv
import core.utils.json.APIFormats._
import javax.inject.Inject
import play.api.i18n.Messages
import play.api.mvc.{ Action, AnyContent, ControllerComponents }
import reactivemongo.bson.BSONObjectID

import scala.concurrent.ExecutionContext

/**
 * The `Config` controller.
 *
 * @param controllerComponents The Play controller components.
 * @param silhouette           The Silhouette stack.
 * @param configService        The config service.
 * @param ex                   The execution context.
 */
class NewsletterController @Inject() (
  val controllerComponents: ControllerComponents,
  silhouette: Silhouette[DefaultEnv],
  newsletterService: NewsletterService
)(
  implicit
  ex: ExecutionContext
) extends ApiController {

  /**
   * Gets the newsletter subscription data.
   *
   * @return The settings.
   */
  def get(userID: BSONObjectID): Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    newsletterService.retrieve(userID).map { newsletter =>
      Ok(ApiResponse("core.newsletter", Messages("request.ok"), newsletter))
    }
  }
}
