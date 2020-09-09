package models.core

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import reactivemongo.bson.BSONObjectID
import java.time.Instant

/**
 * The user object.
 *
 * @param id           The unique ID of the user.
 * @param loginInfo    The login Info of the user.
 * @param title        The title of the user.
 * @param firstName    The first name of the user.
 * @param lastName     The last name of the user.
 * @param name         Maybe the name of the authenticated user.
 * @param email        Maybe the email of the authenticated provider.
 * @param avatarURL    Maybe the avatar URL of the authenticated provider.
 * @param registration The registration data.
 * @param settings     The user settings.
 * @param dateOfBirth  The date of birth of the user.
 * @param passwordSurvey The password survey data.
 */
case class User(
  id: BSONObjectID,
  loginInfo: Seq[LoginInfo],
  title: Option[String],
  firstName: Option[String],
  lastName: Option[String],
  email: Option[String],
  accountStatus: String,
  registration: Registration,
  settings: Settings,
  ageLimit: Option[AgeLimit],
  dateOfBirth: Option[String],
  passwordSurvey: Option[Seq[String]],
  loginAttempts: Option[Seq[UserLoginAttempts]],
  addressBook: Option[Seq[Address]],
  cardWallet: Option[Seq[CreditCard]],
  newsletters: Option[Newsletter],
  wishlist: Option[Seq[Item]],
  orders: Option[Seq[Order]],
  shoppingBag: Option[ShoppingBag],
  notifications: Option[Seq[LastItemAlert]]
) extends Identity

case class UserID(
  id: BSONObjectID
)

case class AgeLimit(
  ageLimit: Boolean,
  ageLimitMsg: String = "Please confirm that you are over the age of 18."
)

case class LoginEmail(
  email: String
)

case class UserLoginAttempts(
  dateTime: Instant,
  loginAttempts: Seq[LoginAttempt]
)

case class LoginAttempt(
  dateTime: Instant,
  count: Long
)
