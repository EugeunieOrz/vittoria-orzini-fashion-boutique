// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  changeQtyInShoppingBag,
  changeQtyInShoppingBagPending,
  changeQtyInShoppingBagFulfilled,
  changeQtyInShoppingBagRejected
} from 'bundles/Account/modules/Shopping/ChangeQtyModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import ShoppingAPI from 'bundles/Account/apis/ShoppingAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* editQtyInBagSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(changeQtyInShoppingBag().type);
    try {
      yield put(changeQtyInShoppingBagPending());
      const response = yield call([api, api.editProductQtyInShoppingBag], payload);
      if(response.description === "This item is sold out.") {
        yield put(showMsg("itemSoldOut"));
        yield put(toggleMsg());
        yield put(changeQtyInShoppingBagFulfilled(response.details));
      } else {
        yield put(changeQtyInShoppingBagFulfilled(response.details));
        yield put(fetchUserFulfilled(response.details));
      }
    } catch (e) {
      yield put(changeQtyInShoppingBagRejected(e));
      yield put(showMsg("itemSoldOut"));
      yield put(toggleMsg());
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
export default [editQtyInBagSaga, api];
