// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { changeSizeInGuestShoppingBag } from 'modules/Product/ProductViewModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import ShoppingAPI from 'apis/ShoppingGuestAPI';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* editSizeInBagSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(changeSizeInGuestShoppingBag().type);
    try {
      const response = yield call([api, api.editProductInGuestShoppingBag], payload);
      if(response.description === "This item is sold out." ||
      response.description === "This item isn't available." ||
      response.description === "This shopping bag isn't available.") {
        yield put(showMsg("itemOutOfStockAlert2"));
        yield put(toggleMsg());
      } else {
        localStorage.setItem('shoppingBag', JSON.stringify(response.details));
      }
    } catch (e) {
      yield put(showMsg("itemOutOfStockAlert2"));
      yield put(toggleMsg());
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
export default [editSizeInBagSaga, api];
