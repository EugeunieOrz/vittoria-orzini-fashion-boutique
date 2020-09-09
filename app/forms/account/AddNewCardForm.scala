package forms.account

import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._

/**
 * The form which handles the adding a new card process.
 */
object AddNewCardForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "cardNumber" -> nonEmptyText,
      //.verifying("Please enter a valid credit card number", isCreditCardNumber _),
      "month" -> nonEmptyText,
      "year" -> nonEmptyText,
      "firstName" -> nonEmptyText,
      "lastName" -> nonEmptyText,
      "address" -> nonEmptyText,
      "zipCode" -> nonEmptyText,
      "city" -> nonEmptyText,
      "country" -> nonEmptyText,
      "province" -> nonEmptyText,
      "prefCrdCard" -> optional(boolean)
    )(Data.apply)(Data.unapply)
  )

  /**
   * The form data.
   *
   * @param cardNumber       The credit card number of a user.
   * @param month            The expiration month of a user's credit card.
   * @param year             The expiration year of a user's credit card.
   * @param firstName        The first name of a user.
   * @param lastName         The last name of the user.
   * @param address          The address of a user.
   * @param zipCode          The zip code of a user.
   * @param city             The city of a user.
   * @param country          The country of a user.
   * @param province         The state / province of a user.
   * @param prefCrdCard      Indicates the preferred credit card of a user.
   */
  case class Data(
    cardNumber: String,
    month: String,
    year: String,
    firstName: String,
    lastName: String,
    address: String,
    zipCode: String,
    city: String,
    country: String,
    province: String,
    prefCrdCard: Option[Boolean]
  )

  private def isCreditCardNumber(num: String): Boolean = {
    val number =
      num.toList
        .reverse
        .map(_.asDigit)
        .grouped(2)
        .collect {
          case l if ((l.last * 2).toString.length == 2) => l.head + (l.last * 2).toString.toList.map(_.asDigit).sum
          case l if ((l.last * 2).toString.length != 2) => l.head + l.last * 2
        }.toList.sum

    if (number % 10 == 0) true
    else false
  }
}
