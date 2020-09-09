// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  removeItemFromGuestBag,
  removeItemFromGuestBagPending,
  removeItemFromGuestBagFulfilled,
  removeItemFromGuestBagRejected
} from 'modules/Shopping/RemoveItemGuestModule';
import ShoppingGuestAPI from 'apis/ShoppingGuestAPI';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

export function* removeItemFromGuestBagSaga(api: ShoppingGuestAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(removeItemFromGuestBag().type);
    try {
      yield put(removeItemFromGuestBagPending());
      const response = yield call([api, api.removeItemFromGuestShoppingBag], payload);
      localStorage.setItem('shoppingBag', JSON.stringify(response.details));
      yield put(removeItemFromGuestBagFulfilled(response.details));
    } catch (e) {
      yield put(removeItemFromGuestBagRejected(e));
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingGuestAPI();
export default [removeItemFromGuestBagSaga, api];
