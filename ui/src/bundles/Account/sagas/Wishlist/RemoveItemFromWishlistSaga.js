// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  removeItemFromWishlist,
  removeItemFromWishlistPending,
  removeItemFromWishlistFulfilled,
  removeItemFromWishlistRejected
} from 'bundles/Account/modules/Wishlist/RemoveItemFromWishlistModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import ShoppingAPI from 'bundles/Account/apis/ShoppingAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* removeItemFromWishlistSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(removeItemFromWishlist().type);
    try {
      yield put(removeItemFromWishlistPending());
      const response = yield call([api, api.removeItemFromWishlist], payload);
      const user = response.details;
      yield put(fetchUserFulfilled(user));
      yield put(removeItemFromWishlistFulfilled(user));
    } catch (e) {
      yield put(removeItemFromWishlistRejected());
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
export default [removeItemFromWishlistSaga, api];
