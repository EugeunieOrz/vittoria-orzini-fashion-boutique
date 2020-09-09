// @flow
import { call, put, take } from 'redux-saga/effects';
import {
  proceedToWishlist,
  toggleAddItemToWishlistAlert
} from 'bundles/Account/modules/Wishlist/AddItemToWishlistAlertModule';
import { toggleProfileActiveKey } from 'bundles/Account/modules/ProfileActiveKeyModule';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import config from 'config/index';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

/**
 * Worker procceds to the checkout page.
 */
export function* proceedToWishlistSaga(): Generator<*, *, *> {
  while (yield take(proceedToWishlist().type)) {
    try {
      yield put(toggleProfileActiveKey("wishlist"));
      yield put(toggleAddItemToWishlistAlert());
      yield call(history.push, config.route.account.index);
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default proceedToWishlistSaga;
