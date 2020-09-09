package utils.core

import javax.inject.Inject

import scala.concurrent.{ ExecutionContext, Future }

import akka.actor._

import play.api.libs.concurrent.CustomExecutionContext

trait CustomerExecutionContext extends ExecutionContext

class CustomerExecutionContextImpl @Inject() (system: ActorSystem)
  extends CustomExecutionContext(system, "myapp.database-dispatcher") with CustomerExecutionContext
