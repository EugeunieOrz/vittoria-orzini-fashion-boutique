package modules.auth

import com.google.inject.name.Named
import com.google.inject.Provides
import com.mohiva.play.silhouette.api.{ Environment, EventBus, Silhouette, SilhouetteProvider }
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.AuthenticatorService
import com.mohiva.play.silhouette.api.util._
import com.mohiva.play.silhouette.impl.authenticators.CookieAuthenticator
import com.mohiva.play.silhouette.impl.providers._
import com.mohiva.play.silhouette.password.BCryptSha256PasswordHasher
import com.mohiva.play.silhouette.persistence.daos.{ DelegableAuthInfoDAO, MongoAuthInfoDAO }
import com.mohiva.play.silhouette.persistence.repositories.DelegableAuthInfoRepository
import models.core.User
import models.core.services.UserService
import net.codingwell.scalaguice.ScalaModule
import play.api.Configuration
import play.api.libs.concurrent.AkkaGuiceSupport
import play.modules.reactivemongo.ReactiveMongoApi
import scala.concurrent.ExecutionContext.Implicits.global
import utils.silhouette.BoutiqueEnv

/**
 * The Guice `Main` module.
 */
class CustomerModule extends ScalaModule with AkkaGuiceSupport {

  /**
   * Configures the module.
   */
  override def configure(): Unit = {
    bind[Silhouette[BoutiqueEnv[User]]].to[SilhouetteProvider[BoutiqueEnv[User]]]
  }

  /**
   * Provides the Silhouette environment.
   *
   * @param directorService The director service implementation.
   * @param authenticatorService The authentication service implementation.
   * @param eventBus The event bus instance.
   * @return The Silhouette environment.
   */
  @Provides
  def provideEnvironment(
    userService: UserService,
    authenticatorService: AuthenticatorService[CookieAuthenticator],
    eventBus: EventBus
  ): Environment[BoutiqueEnv[User]] = {
    Environment[BoutiqueEnv[User]](userService, authenticatorService, Seq(), eventBus)
  }

  /**
   * Provides the implementation of the delegable `PasswordInfo` auth info DAO.
   *
   * @param reactiveMongoApi The ReactiveMongo API.
   * @param configuration    The Play configuration.
   * @return The implementation of the delegable `PasswordInfo` auth info DAO.
   */
  @Provides @Named("customer-pwd-info-dao")
  def providePasswordInfoDAO(
    reactiveMongoApi: ReactiveMongoApi,
    configuration: Configuration
  ): DelegableAuthInfoDAO[PasswordInfo] = {
    import utils.auth.json.MongoFormats._
    new MongoAuthInfoDAO[PasswordInfo](reactiveMongoApi, configuration)
  }

  /**
   * Provides the auth info repository.
   *
   * @param passwordInfoDAO The implementation of the delegable password auth info DAO.
   * @return The auth info repository instance.
   */
  @Provides @Named("customer-auth-info-repository")
  def provideAuthInfoRepository(
    @Named("customer-pwd-info-dao") passwordInfoDAO: DelegableAuthInfoDAO[PasswordInfo]
  ): AuthInfoRepository = {
    new DelegableAuthInfoRepository(passwordInfoDAO)
  }

  /**
   * Provides the credentials provider.
   *
   * @param authInfoRepository The auth info repository implementation.
   * @param passwordHasherRegistry The password hasher registry.
   * @return The credentials provider.
   */
  @Provides @Named("customer-credentials-provider")
  def provideCredentialsProvider(
    @Named("customer-auth-info-repository") authInfoRepository: AuthInfoRepository,
    passwordHasherRegistry: PasswordHasherRegistry
  ): CredentialsProvider = {
    new CredentialsProvider(authInfoRepository, passwordHasherRegistry)
  }
}
