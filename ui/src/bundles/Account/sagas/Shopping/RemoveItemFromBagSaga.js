// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  removeItemFromShoppingBag,
  removeItemFromShoppingBagPending,
  removeItemFromShoppingBagFulfilled,
  removeItemFromShoppingBagRejected
} from 'bundles/Account/modules/Shopping/RemoveItemModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import ShoppingAPI from 'bundles/Account/apis/ShoppingAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* removeItemFromBagSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(removeItemFromShoppingBag().type);
    try {
      yield put(removeItemFromShoppingBagPending());
      const response = yield call([api, api.removeItemFromShoppingBag], payload);
      const user = response.details;
      yield put(fetchUserFulfilled(user));
      yield put(removeItemFromShoppingBagFulfilled(user));
    } catch (e) {
      yield put(removeItemFromShoppingBagRejected(e));
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
export default [removeItemFromBagSaga, api];
