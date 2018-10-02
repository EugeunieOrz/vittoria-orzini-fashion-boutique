package core.models

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import reactivemongo.bson.BSONObjectID

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
  name: Option[String],
  email: Option[String],
  avatarURL: Option[String],
  registration: Registration,
  settings: Settings,
  dateOfBirth: Option[String],
  passwordSurvey: Option[Seq[String]],
  addressBook: Option[Seq[Address]],
  creditWallet: Option[Seq[CreditCard]],
  newsletters: Option[Seq[Newsletter]]
) extends Identity
