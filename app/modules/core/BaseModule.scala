package modules.core

import com.google.inject.Provides
import com.google.inject.name.Named
import com.mohiva.play.silhouette.api.actions.{ SecuredErrorHandler, UnsecuredErrorHandler }
import com.mohiva.play.silhouette.api.crypto.{ Crypter, CrypterAuthenticatorEncoder, Signer }
import com.mohiva.play.silhouette.api.services.AuthenticatorService
import com.mohiva.play.silhouette.api.util._
import com.mohiva.play.silhouette.api.EventBus
import com.mohiva.play.silhouette.crypto.{ JcaCrypter, JcaCrypterSettings, JcaSigner, JcaSignerSettings }
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.impl.providers._
import com.mohiva.play.silhouette.impl.util.{ DefaultFingerprintGenerator, SecureRandomIDGenerator }
import com.mohiva.play.silhouette.password.BCryptSha256PasswordHasher
import jobs.auth.{ AuthTokenCleaner, Scheduler }
import models.auth.daos._
import models.auth.services.{ AuthTokenService, AuthTokenServiceImpl }
import models.core.daos._
import models.core.services._
import utils.core.{
  CustomerExecutionContext,
  CustomerExecutionContextImpl,
  CustomSecuredErrorHandler,
  CustomUnsecuredErrorHandler
}
import net.ceedubs.ficus.Ficus._
import net.ceedubs.ficus.readers.ArbitraryTypeReader._
import net.ceedubs.ficus.readers.ValueReader
import net.codingwell.scalaguice.ScalaModule
import play.api.Configuration
import play.api.libs.ws.WSClient
import play.api.mvc.{ Cookie, CookieHeaderEncoding }
import play.api.libs.concurrent.AkkaGuiceSupport
import reactivemongo.play.json._
import scala.concurrent.ExecutionContext.Implicits.global

/**
 * The Guice `Main` module.
 */
class BaseModule extends ScalaModule with AkkaGuiceSupport {

  /**
   * Configures the module.
   */
  override def configure(): Unit = {
    bindActor[AuthTokenCleaner](AuthTokenCleaner.Name)
    bind[Scheduler].asEagerSingleton()
    bind[AuthTokenDAO].to[AuthTokenDAOImpl]
    bind[AuthTokenService].to[AuthTokenServiceImpl]

    bind[CustomerExecutionContext].to[CustomerExecutionContextImpl]
    bind[UnsecuredErrorHandler].to[CustomUnsecuredErrorHandler]
    bind[SecuredErrorHandler].to[CustomSecuredErrorHandler]

    bind[UserService].to[UserServiceImpl]
    bind[UserDAO].to[UserDAOImpl]

    bind[PasswordHasher].toInstance(new BCryptSha256PasswordHasher)
    bind[IDGenerator].toInstance(new SecureRandomIDGenerator())
    bind[FingerprintGenerator].toInstance(new DefaultFingerprintGenerator(false))
    bind[EventBus].toInstance(EventBus())
    bind[Clock].toInstance(Clock())
    bind[java.time.Clock].toInstance(java.time.Clock.systemUTC())

    bind[HealthService].to[HealthServiceImpl]
  }

  implicit val sameSiteReader: ValueReader[Option[Cookie.SameSite]] =
  ValueReader.relative { cfg =>
    if(cfg.getIsNull(".")) None
    else Some(
      Cookie.SameSite.parse(cfg.as[String]).getOrElse(throw new RuntimeException("Invalid SameSite value"))
    )
  }

  /**
   * Provides the HTTP layer implementation.
   *
   * @param client Play's WS client.
   * @return The HTTP layer implementation.
   */
  @Provides
  def provideHTTPLayer(client: WSClient): HTTPLayer = new PlayHTTPLayer(client)

  /**
   * Provides the signer for the authenticator.
   *
   * @param configuration The Play configuration.
   * @return The signer for the authenticator.
   */
  @Provides @Named("authenticator-signer")
  def provideAuthenticatorSigner(configuration: Configuration): Signer = {
    val config = configuration.underlying.as[JcaSignerSettings]("silhouette.authenticator.signer")

    new JcaSigner(config)
  }

  /**
   * Provides the crypter for the authenticator.
   *
   * @param configuration The Play configuration.
   * @return The crypter for the authenticator.
   */
  @Provides @Named("authenticator-crypter")
  def provideAuthenticatorCrypter(configuration: Configuration): Crypter = {
    val config = configuration.underlying.as[JcaCrypterSettings]("silhouette.authenticator.crypter")

    new JcaCrypter(config)
  }
  /**
   * Provides the authenticator service.
   *
   * @param signer The signer implementation.
   * @param crypter The crypter implementation.
   * @param cookieHeaderEncoding Logic for encoding and decoding `Cookie` and `Set-Cookie` headers.
   * @param fingerprintGenerator The fingerprint generator implementation.
   * @param idGenerator The ID generator implementation.
   * @param configuration The Play configuration.
   * @param clock The clock instance.
   * @return The authenticator service.
   */
  @Provides
  def provideAuthenticatorService(
    @Named("authenticator-signer") signer: Signer,
    @Named("authenticator-crypter") crypter: Crypter,
    cookieHeaderEncoding: CookieHeaderEncoding,
    fingerprintGenerator: FingerprintGenerator,
    idGenerator: IDGenerator,
    configuration: Configuration,
    clock: Clock): AuthenticatorService[CookieAuthenticator] = {

    val config = configuration.underlying.as[CookieAuthenticatorSettings]("silhouette.authenticator")
    val authenticatorEncoder = new CrypterAuthenticatorEncoder(crypter)

    new CookieAuthenticatorService(
      config, None, signer, cookieHeaderEncoding, authenticatorEncoder, fingerprintGenerator, idGenerator, clock
    )
  }

  /**
   * Provides the password hasher registry.
   *
   * @param passwordHasher The default password hasher implementation.
   * @return The password hasher registry.
   */
  @Provides
  def providePasswordHasherRegistry(passwordHasher: PasswordHasher): PasswordHasherRegistry = {
    new PasswordHasherRegistry(passwordHasher)
  }


}
