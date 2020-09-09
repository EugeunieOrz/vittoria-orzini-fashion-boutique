package controllers.newsletter

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import forms.newsletter.UnsubscribeNewsletterForm
import models.newsletter.NewsletterTask
import models.newsletter.services.{ NewsletterService, NewsletterTaskService }
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.util.Credentials
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import models.core.{
  LoginEmail,
  Newsletter,
  NewsletterFashion,
  NewsletterFineJewelry,
  NewsletterHomeCollection,
  SubscribeToNewsletter,
  SubscribeToNewsletter2,
  User
}
import models.core.services.UserService
import utils.core.json.APIFormats._
import utils.silhouette.{ BoutiqueEnv, CustomerController }
import utils.core.JSRouter
import java.util.UUID
import javax.inject.Inject
import net.ceedubs.ficus.Ficus._
import org.joda.time.DateTime
import play.api.i18n.{ Lang, Messages, MessagesApi, MessagesProvider }
import play.api.libs.json._
import play.api.libs.mailer.{ Email, MailerClient }
import play.api.mvc._
import reactivemongo.bson.BSONObjectID

import scala.concurrent.duration._
import scala.concurrent.{ ExecutionContext, Future }

/**
 * The `Newsletter` controller.
 *
 * @param controllerComponents  The Play controller components.
 * @param authInfoRepository     The auth info repository.
 * @param avatarService          The avatar service implementation.
 * @param passwordHasherRegistry The password hasher registry.
 * @param silhouette            The Silhouette stack.
 * @param userService           The user service implementation.
 * @param ex                    The execution context.
 */
class NewsletterController @Inject() (
  val controllerComponents: ControllerComponents,
  val silhouette: Silhouette[BoutiqueEnv[User]],
  newsletterService: NewsletterService,
  newsletterTaskService: NewsletterTaskService,
  mailerClient: MailerClient,
  messagesApi: MessagesApi,
  userService: UserService,
  jsRouter: JSRouter,
)(
  implicit
  ex: ExecutionContext
) extends CustomerController {

  def sendNewsletter: Action[AnyContent] = Action.async { implicit request =>
    newsletterTaskService.reschedule().map { res =>
      res.map { newsl =>
        sendNewsletterToSubscriber(newsl).map { email =>
          println(s"Newsletter was sent to a subscriber with email: $email")
        }
      }
    }
    Future.successful(Ok(ApiResponse(
      "newsletter.updated",
      Messages("newsletter.updated")
    )))
  }

  private def sendNewsletterToSubscriber(
    n: NewsletterTask
  )(
    implicit
    request: RequestHeader
  ): Future[String] = {
    val url = jsRouter.absoluteURL("/newsletter/unsubscribe/" + n.id)
    val lang = n.lang
    if (n.newsletterFashion == true) {
      mailerClient.send(Email(
        subject = messagesApi("newsletter.fashion")(lang),
        from = messagesApi("Vittoria Orzini <vittoriaorzini@gmail.com>")(lang),
        to = Seq(n.email),
        bodyText = Some(twirl.newsletter.views.txt.emails.newsletterFashion(url)(messagesApi, lang).body),
        bodyHtml = Some(twirl.newsletter.views.html.emails.newsletterFashion(url)(messagesApi, lang).body)
      ))
    } else if (n.newsletterFineJewelry == true) {
      mailerClient.send(Email(
        subject = messagesApi("newsletter.fineJewelry")(lang),
        from = messagesApi("Vittoria Orzini <vittoriaorzini@gmail.com>")(lang),
        to = Seq(n.email),
        bodyText = Some(twirl.newsletter.views.txt.emails.newsletterFineJewelry(url)(messagesApi, lang).body),
        bodyHtml = Some(twirl.newsletter.views.html.emails.newsletterFineJewelry(url)(messagesApi, lang).body)
      ))
    } else if (n.newsletterHomeCollection == true) {
      mailerClient.send(Email(
        subject = messagesApi("newsletter.homeCollection")(lang),
        from = messagesApi("Vittoria Orzini <vittoriaorzini@gmail.com>")(lang),
        to = Seq(n.email),
        bodyText = Some(twirl.newsletter.views.txt.emails.newsletterHome(url)(messagesApi, lang).body),
        bodyHtml = Some(twirl.newsletter.views.html.emails.newsletterHome(url)(messagesApi, lang).body)
      ))
    }
    Future.successful(n.email)
  }

  /**
   * Registers a newsletter subscription.
   *
   * @return A Play result.
   */
  def subscribeToNewsletter: Action[JsValue] =
    UserAwareAction(parse.json).async { implicit request =>
      request.body.validate[SubscribeToNewsletter2].fold(
        errors =>
          Future.successful(
            BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
        data => {
          val loginInfo = LoginInfo(CredentialsProvider.ID, data.email)
          userService.retrieve(loginInfo).flatMap {
            case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
              newsletterService.retrieve(data.email).flatMap {
                case Some(newsletter) => Future.successful(Created(ApiResponse(
                  "auth.email.already.in.use", Messages("auth.email.already.in.use"))))
                case None =>
                  userService.save(user.copy(
                    newsletters = Some(Newsletter(
                      newsletterFashion = NewsletterFashion(
                        isChecked = data.newsletterFashion
                      ),
                      newsletterFineJewelry = NewsletterFineJewelry(
                        isChecked = data.newsletterFineJewelry
                      ),
                      newsletterHomeCollection = NewsletterHomeCollection(
                        isChecked = data.newsletterHomeCollection
                      )
                    ))
                  ))
                  val newsl = SubscribeToNewsletter(
                    id = BSONObjectID.generate,
                    email = data.email,
                    lang = user.registration.lang,
                    newsletterFashion = NewsletterFashion(
                      isChecked = data.newsletterFashion
                    ),
                    newsletterFineJewelry = NewsletterFineJewelry(
                      isChecked = data.newsletterFineJewelry
                    ),
                    newsletterHomeCollection = NewsletterHomeCollection(
                      isChecked = data.newsletterHomeCollection
                    )
                  )
                  newsletterTaskService.create(
                    user.registration.lang,
                    data.email,
                    data.newsletterFashion,
                    data.newsletterFineJewelry,
                    data.newsletterHomeCollection
                  ).map { task =>
                    sendNewsletterToSubscriber(task)
                  }
                  newsletterService.save(newsl).map { _ =>
                    Ok(ApiResponse(
                      "newsletter.updated",
                      Messages("newsletter.updated")
                    ))
                  }
              }
            case None =>
              newsletterService.retrieve(data.email).flatMap {
                case Some(newsletter) => Future.successful(Created(ApiResponse(
                  "auth.email.already.in.use", Messages("auth.email.already.in.use"))))
                case None =>
                  implicit val messagesApi2 = messagesApi
                  val lang = request.lang

                  val newsl = SubscribeToNewsletter(
                    id = BSONObjectID.generate,
                    email = data.email,
                    lang = lang,
                    newsletterFashion = NewsletterFashion(
                      isChecked = data.newsletterFashion
                    ),
                    newsletterFineJewelry = NewsletterFineJewelry(
                      isChecked = data.newsletterFineJewelry
                    ),
                    newsletterHomeCollection = NewsletterHomeCollection(
                      isChecked = data.newsletterHomeCollection
                    )
                  )
                  newsletterTaskService.create(
                    lang,
                    data.email,
                    data.newsletterFashion,
                    data.newsletterFineJewelry,
                    data.newsletterHomeCollection
                  ).map { task =>
                    sendNewsletterToSubscriber(task)
                  }
                  newsletterService.save(newsl).map { _ =>
                    Ok(ApiResponse(
                      "newsletter.updated",
                      Messages("newsletter.updated")
                    ))
                  }
              }
          }
        }
      )
    }

  /**
   * Removes a newsletter subscription.
   *
   * @return A Play result.
   */
  def unsubscribeFromNewsletter(id: UUID): Action[AnyContent] =
    UserAwareAction.async { implicit request =>
      validateNewsletterID(id, task =>
        UnsubscribeNewsletterForm.form.bindFromRequest.fold(
          form => Future.successful(BadRequest(
            ApiResponse("invalid.form", Messages("invalid.form"), form.errors)
          )),
          data => {
            println(s"unsubscribeFromNewsletter data: $data")
            newsletterTaskService.retrieve(task.id).flatMap {
              case Some(newsletterTask) =>
                newsletterService.retrieve(newsletterTask.email).flatMap {
                  case Some(newsletter) =>
                    val loginInfo = LoginInfo(CredentialsProvider.ID, newsletterTask.email)
                    userService.retrieve(loginInfo).flatMap {
                      case Some(user) => user.newsletters match {
                        case Some(userNewsletter) =>
                          if (data.productIterator.forall(_ == false)) {
                            userService.save(user.copy(
                              newsletters = None
                            ))
                            newsletterTaskService.delete(task.id)
                            newsletterService.deleteSubscription(newsletter.id).map { _ =>
                              Ok(ApiResponse(
                                "newsletter.unsubscribed",
                                Messages("newsletter.unsubscribed")
                              ))
                            }
                          } else {
                            userService.save(user.copy(
                              newsletters = Some(userNewsletter.copy(
                                newsletterFashion = NewsletterFashion(
                                  data.newsletterFashion
                                ),
                                newsletterFineJewelry = NewsletterFineJewelry(
                                  data.newsletterFineJewelry
                                ),
                                newsletterHomeCollection = NewsletterHomeCollection(
                                  data.newsletterHomeCollection
                                )
                              ))
                            ))
                            newsletterService.save(newsletter.copy(
                              newsletterFashion = NewsletterFashion(
                                data.newsletterFashion
                              ),
                              newsletterFineJewelry = NewsletterFineJewelry(
                                data.newsletterFineJewelry
                              ),
                              newsletterHomeCollection = NewsletterHomeCollection(
                                data.newsletterHomeCollection
                              )
                            ))
                            newsletterTaskService.update(newsletterTask.copy(
                              newsletterFashion = data.newsletterFashion,
                              newsletterFineJewelry = data.newsletterFineJewelry,
                              newsletterHomeCollection = data.newsletterHomeCollection
                            )).map { _ =>
                              Ok(ApiResponse(
                                "newsletter.updated",
                                Messages("newsletter.updated")
                              ))
                            }
                          }
                        case None =>
                          if (data.productIterator.forall(_ == false)) {
                            newsletterTaskService.delete(task.id)
                            newsletterService.deleteSubscription(newsletter.id).map { _ =>
                              Ok(ApiResponse(
                                "newsletter.unsubscribed",
                                Messages("newsletter.unsubscribed")
                              ))
                            }
                          } else {
                            userService.save(user.copy(
                              newsletters = Some(Newsletter(
                                newsletterFashion = NewsletterFashion(
                                  data.newsletterFashion
                                ),
                                newsletterFineJewelry = NewsletterFineJewelry(
                                  data.newsletterFineJewelry
                                ),
                                newsletterHomeCollection = NewsletterHomeCollection(
                                  data.newsletterHomeCollection
                                )
                              ))
                            ))
                            newsletterTaskService.update(newsletterTask.copy(
                              newsletterFashion = data.newsletterFashion,
                              newsletterFineJewelry = data.newsletterFineJewelry,
                              newsletterHomeCollection = data.newsletterHomeCollection
                            ))
                            newsletterService.save(newsletter.copy(
                              newsletterFashion = NewsletterFashion(
                                data.newsletterFashion
                              ),
                              newsletterFineJewelry = NewsletterFineJewelry(
                                data.newsletterFineJewelry
                              ),
                              newsletterHomeCollection = NewsletterHomeCollection(
                                data.newsletterHomeCollection
                              )
                            )).map { _ =>
                              Ok(ApiResponse(
                                "newsletter.updated",
                                Messages("newsletter.updated")
                              ))
                            }
                          }
                      }
                      case None =>
                        newsletterTaskService.delete(task.id)
                        newsletterService.deleteSubscription(newsletter.id).map { _ =>
                          Ok(ApiResponse(
                            "newsletter.unsubscribed",
                            Messages("newsletter.unsubscribed")
                          ))
                        }
                    }
                  case None =>
                    newsletterTaskService.delete(task.id).map { _ =>
                      Ok(ApiResponse(
                        "newsletter.unsubscribed",
                        Messages("newsletter.unsubscribed")
                      ))
                    }
                }
              case None =>
                Future.successful(Ok(ApiResponse(
                  "auth.email.not.found",
                  Messages("auth.email.not.found")
                )))
            }
          }
        )
      )
    }

    /**
     * An action that validates if a newsletter task id is valid.
     *
     * @param id The newsletter task id to validate.
     * @return A Play result.
     */
    def validate(id: UUID): Action[AnyContent] = UserAwareAction.async { implicit request =>
      validateNewsletterID(id, _ => {
        Future.successful(Ok(ApiResponse(
          "newsletter.valid.unsubscribe.link",
          Messages("newsletter.valid.unsubscribe.link"))))
      })
    }

    /**
     * A helper function which validates the newsletter task id and either returns a HTTP 400 result in case of
     * invalidity or a block that returns another result in case of validity.
     *
     * @param id               The newsletter task id to validate.
     * @param f                The block to execute if the newsletter task id is valid.
     * @param messagesProvider The Play messages provider.
     * @return A Play result.
     */
    private def validateNewsletterID(id: UUID, f: NewsletterTask => Future[Result])(
      implicit
      messagesProvider: MessagesProvider
    ): Future[Result] = {
      newsletterTaskService.validate(id).flatMap {
        case Some(task) => f(task)
        case None =>
          Future.successful(
            BadRequest(ApiResponse(
              "newsletter.invalid.unsubscribe.link",
              Messages("newsletter.invalid.unsubscribe.link")))
          )
      }
    }

}
