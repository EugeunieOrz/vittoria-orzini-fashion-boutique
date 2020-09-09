package models.core

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import reactivemongo.bson.BSONObjectID

/**
 * The notifications for the user's account.
 */
case class LastItemAlert(
  lastItemAlert: Boolean,
  productID: BSONObjectID,
  received: Boolean,
  received2: Boolean,
  size: String,
  stateOfProduct: String,
  category: String,
  userID: BSONObjectID
)
