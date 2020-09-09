package utils.silhouette

import controllers.core.ApiController
import com.mohiva.play.silhouette.api.{ Silhouette, Environment, Identity }
import com.mohiva.play.silhouette.api.actions._

trait AuthController[I <: Identity] extends ApiController {
  def silhouette: Silhouette[BoutiqueEnv[I]]
  def env: Environment[BoutiqueEnv[I]] = silhouette.env

  def SecuredAction = silhouette.SecuredAction
  def UnsecuredAction = silhouette.UnsecuredAction
  def UserAwareAction = silhouette.UserAwareAction

  implicit def securedRequest2User[A](implicit request: SecuredRequest[BoutiqueEnv[I], A]): I = request.identity
  implicit def userAwareRequest2UserOpt[A](implicit request: UserAwareRequest[BoutiqueEnv[I], A]): Option[I] = request.identity
}
