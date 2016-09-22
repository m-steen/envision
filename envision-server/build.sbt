name := """envision-server"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs,
  filters,
  "org.springframework.social" % "spring-social-facebook" % "2.0.3.RELEASE",
  "com.restfb" % "restfb" % "1.30.0",
  "org.mongodb" % "mongodb-driver" % "3.3.0"
)
