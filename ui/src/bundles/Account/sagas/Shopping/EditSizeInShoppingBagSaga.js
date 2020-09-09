// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  changeSizeInShoppingBag,
  changeSizeInShoppingBagPending,
  changeSizeInShoppingBagFulfilled,
  changeSizeInShoppingBagRejected
} from 'bundles/Account/modules/Shopping/ChangeSizeModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import ShoppingAPI from 'bundles/Account/apis/ShoppingAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* editSizeInBagSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(changeSizeInShoppingBag().type);
    try {
      yield put(changeSizeInShoppingBagPending());
      const response = yield call([api, api.editProductInShoppingBag], payload);
      yield put(changeSizeInShoppingBagFulfilled(response.details));
      yield put(fetchUserFulfilled(response.details));
    } catch (e) {
      yield put(changeSizeInShoppingBagRejected(e));
      yield put(showMsg("itemSoldOut"));
      yield put(toggleMsg());
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
export default [editSizeInBagSaga, api];
