package controllers.auth

import javax.inject.Inject
import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import models.core.User
import utils.silhouette.{ BoutiqueEnv, CustomerController }
import utils.core.JSRouter
import play.api.i18n.Messages
import play.api.mvc.{ Action, AnyContent, ControllerComponents }

/**
 * The `Sign In` controller.
 *
 * @param controllerComponents  The Play controller components.
 * @param silhouette            The Silhouette stack.
 */
class SignOutController @Inject() (
  val controllerComponents: ControllerComponents,
  val silhouette: Silhouette[BoutiqueEnv[User]],
) extends CustomerController {

  /**
   * Sign out a user.
   *
   * @return A Play result.
   */
  def signOut: Action[AnyContent] = SecuredAction.async { implicit request =>
    env.eventBus.publish(LogoutEvent(request.identity, request))
    env.authenticatorService.discard(request.authenticator, Ok(ApiResponse(
      "auth.signed.out",
      Messages("auth.signed.out")
    )))
  }
}
