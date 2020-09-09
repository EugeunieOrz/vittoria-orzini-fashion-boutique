package utils.silhouette

import com.mohiva.play.silhouette.api.{ Identity, Env }
import com.mohiva.play.silhouette.impl.authenticators.CookieAuthenticator

trait BoutiqueEnv[Id <: Identity] extends Env {
  type I = Id
  type A = CookieAuthenticator
}
