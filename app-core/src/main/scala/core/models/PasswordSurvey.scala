package core.models

import reactivemongo.bson.BSONObjectID

case class PasswordSurvey(
  userID: BSONObjectID,
  psInfo: String
)
