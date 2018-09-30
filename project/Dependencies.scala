import sbt._

object Dependencies {

  object Version {
    val specs2 = "4.2.1-ca75f1d09-20180530093100"
    val silhouette = "5.0.4"
    val akka = "2.5.13"
  }

  val resolvers = Seq(
    Resolver.jcenterRepo
  )

  object Library {
    object Play {
      val version: String = play.core.PlayVersion.current
      val ws: ModuleID = "com.typesafe.play" %% "play-ws" % version
      val cache: ModuleID = "com.typesafe.play" %% "play-cache" % version
      val test: ModuleID = "com.typesafe.play" %% "play-test" % version
      val specs2: ModuleID = "com.typesafe.play" %% "play-specs2" % version
    }

    object Specs2 {
      val core: ModuleID = "org.specs2" %% "specs2-core" % Version.specs2
      val matcherExtra: ModuleID = "org.specs2" %% "specs2-matcher-extra" % Version.specs2
      val mock: ModuleID = "org.specs2" %% "specs2-mock" % Version.specs2
    }

    object Silhouette {
      val core: ModuleID = "com.mohiva" %% "play-silhouette" % Version.silhouette
      val passwordBcrypt: ModuleID = "com.mohiva" %% "play-silhouette-password-bcrypt" % Version.silhouette
      val persistence: ModuleID = "com.mohiva" %% "play-silhouette-persistence" % Version.silhouette
      val cryptoJca: ModuleID = "com.mohiva" %% "play-silhouette-crypto-jca" % Version.silhouette
      val testkit: ModuleID = "com.mohiva" %% "play-silhouette-testkit" % Version.silhouette
      val persistenceReactiveMongo: ModuleID =
        "com.mohiva" %% "play-silhouette-persistence-reactivemongo" % "5.0.2"
    }

    object Akka {
      val testkit: ModuleID = "com.typesafe.akka" %% "akka-testkit" % Version.akka
    }

    val ficus: ModuleID = "com.iheart" %% "ficus" % "1.4.3"
    val scalaGuice: ModuleID = "net.codingwell" %% "scala-guice" % "4.1.0"
    val akkaQuartzScheduler: ModuleID = "com.enragedginger" %% "akka-quartz-scheduler" % "1.6.1-akka-2.5.x"
    val playMailer: ModuleID = "com.typesafe.play" %% "play-mailer" % "6.0.1"
    val playMailerGuice: ModuleID = "com.typesafe.play" %% "play-mailer-guice" % "6.0.1"
    val apacheCommonsIO: ModuleID = "commons-io" % "commons-io" % "2.4"
    val playReactiveMongo: ModuleID = "org.reactivemongo" %% "play2-reactivemongo" % "0.15.0-play26"
    val embedMongo: ModuleID = "de.flapdoodle.embed" % "de.flapdoodle.embed.mongo" % "2.0.0"
    val javaNativeLibrary: ModuleID = "net.java.dev.jna" % "jna" % "4.5.1"
    val apacheCommonsCodec: ModuleID = "commons-codec" % "commons-codec" % "1.11"
    val kaliumCrypto: ModuleID = "org.abstractj.kalium" % "kalium" % "0.8.0"
    val authorizeNet: ModuleID = "net.authorize" % "anet-java-sdk" % "1.9.7"
    val nbcvxzJava: ModuleID = "me.gosimple" % "nbvcxz" % "1.4.1"
  }
}
