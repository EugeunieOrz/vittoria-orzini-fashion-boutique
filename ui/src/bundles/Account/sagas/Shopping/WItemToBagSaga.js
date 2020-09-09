// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  addWItemToBag,
  addWItemToBagPending,
  addWItemToBagFulfilled,
  addWItemToBagRejected
} from 'bundles/Account/modules/Wishlist/AddWItemToBagModule';
import { toggleAddItemToBagAlert } from 'modules/Shopping/AddItemToBagAlertModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import ShoppingAPI from 'bundles/Account/apis/ShoppingAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* wItemToBagSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(addWItemToBag().type);
    try {
      yield put(addWItemToBagPending());
      const product = payload.product;
      localStorage.setItem('addedItem', JSON.stringify(product));
      const response = yield call([api, api.addWItemToBag], payload);
      yield put(addWItemToBagFulfilled(response.details));
      yield put(fetchUserFulfilled(response.details));
      yield put(toggleAddItemToBagAlert());
    } catch (e) {
      yield put(addWItemToBagRejected(e));
      yield put(showMsg("itemSoldOut"));
      yield put(toggleMsg());
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
export default [wItemToBagSaga, api];
