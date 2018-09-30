package core.controllers

import play.api.data.FormError
import play.api.libs.json.JsonValidationError
import play.api.http.Writeable
import play.api.i18n.{ I18nSupport, Messages, MessagesProvider }
import play.api.libs.json.Writes._
import play.api.libs.json._
import play.api.mvc.BaseController

/**
 * The base API controller.
 */
trait ApiController extends BaseController with I18nSupport {

  implicit def tuple4Reads[A, B, C, D](
    implicit
    aReads: Reads[A],
    bReads: Reads[B],
    cReads: Reads[C],
    dReads: Reads[D]
  ): Reads[Tuple4[A, B, C, D]] = Reads[Tuple4[A, B, C, D]] {
    case JsArray(arr) if arr.size == 4 => for {
      a <- aReads.reads(arr(0))
      b <- bReads.reads(arr(1))
      c <- cReads.reads(arr(2))
      d <- dReads.reads(arr(3))
    } yield (a, b, c, d)
    case _ => JsError(Seq(JsPath() -> Seq(JsonValidationError("Expected array of four elements"))))
  }

  implicit def tuple2Writes[A, B, C, D](
    implicit
    aWrites: Writes[A],
    bWrites: Writes[B],
    cWrites: Writes[C],
    dWrites: Writes[D]
  ): Writes[Tuple4[A, B, C, D]] = new Writes[Tuple4[A, B, C, D]] {
    def writes(tuple: Tuple4[A, B, C, D]) = JsArray(
      Seq(
        aWrites.writes(tuple._1),
        bWrites.writes(tuple._2),
        cWrites.writes(tuple._3),
        dWrites.writes(tuple._4)
      ))
  }

  /**
   * Straightforward `Writeable` for ApiResponse[T] values.
   */
  implicit def apiResponseWritable[T](
    implicit
    jsonWrites: Writes[T],
    jsonWritable: Writeable[JsValue]
  ): Writeable[ApiResponse[T]] = {
    jsonWritable.map(response => Json.toJson(response))
  }

  /**
   * A JSON writes for a Play `FormError` instance.
   *
   * @param provider The Play message provider.
   * @return A JSON writes.
   */
  implicit def formErrorWrites(implicit provider: MessagesProvider): Writes[FormError] = {
    OWrites[FormError] { error =>
      Json.obj(
        "key" -> error.key,
        "message" -> Messages(error.message, error.args: _*)
      )
    }
  }

  /**
   * An API response.
   *
   * @param code        The response code.
   * @param description The response description.
   * @param details     A list with details.
   * @tparam T The type of the detail.
   */
  case class ApiResponse[T](code: String, description: String, details: T)
  object ApiResponse {
    def apply(code: String, description: String): ApiResponse[List[String]] = {
      ApiResponse(code, description, List())
    }
    implicit def jsonWrites[T](implicit detail: Writes[T]): Writes[ApiResponse[T]] = {
      OWrites[ApiResponse[T]] { response =>
        Json.obj(
          "code" -> response.code,
          "description" -> response.description,
          "details" -> detail.writes(response.details)
        )
      }
    }
  }
}
