name := """vittoria-orzini-boutique"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

resolvers += Resolver.sonatypeRepo("snapshots")
resolvers += Resolver.jcenterRepo

scalaVersion := "2.12.6"

crossScalaVersions := Seq("2.11.12", "2.12.6")

val specs2Version = "4.2.1-ca75f1d09-20180530093100"
val silhouetteVersion = "5.0.6"
val akkaVersion = "2.5.13"
val playVersion: String = play.core.PlayVersion.current

libraryDependencies ++= Seq(
  filters,
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.2" % Test,
  "com.typesafe.play" %% "play-ws" % playVersion,
  "com.typesafe.play" %% "play-cache" % playVersion,
  "com.typesafe.play" %% "play-test" % playVersion,
  "com.typesafe.play" %% "play-specs2" % playVersion,
  "org.specs2" %% "specs2-core" % specs2Version,
  "org.specs2" %% "specs2-matcher-extra" % specs2Version % Test,
  "org.specs2" %% "specs2-mock" % specs2Version,
  "com.mohiva" %% "play-silhouette" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-password-bcrypt" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-persistence" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-crypto-jca" % silhouetteVersion,
  "com.mohiva" %% "play-silhouette-testkit" % silhouetteVersion % Test,
  "com.mohiva" %% "play-silhouette-persistence-reactivemongo" % silhouetteVersion,
  "com.typesafe.akka" %% "akka-testkit" % akkaVersion % Test,
  "com.iheart" %% "ficus" % "1.4.7",
  "net.codingwell" %% "scala-guice" % "4.2.1",
  "com.enragedginger" %% "akka-quartz-scheduler" % "1.8.2-akka-2.6.x",
  "com.typesafe.play" %% "play-mailer" % "6.0.1",
  "com.typesafe.play" %% "play-mailer-guice" % "6.0.1",
  "org.reactivemongo" %% "play2-reactivemongo" % "0.19.7-play28",
  "org.reactivemongo" %% "reactivemongo-play-json-compat" % "0.19.7-play28",
  "de.flapdoodle.embed" % "de.flapdoodle.embed.mongo" % "2.0.0",
  "net.authorize" % "anet-java-sdk" % "2.0.1",
  "me.gosimple" % "nbvcxz" % "1.4.1",
  "net.java.dev.jna" % "jna" % "5.6.0"
)

play.sbt.routes.RoutesKeys.routesImport += "utils.core.route.Binders._"

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.example.controllers._"
PlayKeys.playMonitoredFiles ++= (sourceDirectories in (Compile, TwirlKeys.compileTemplates)).value
