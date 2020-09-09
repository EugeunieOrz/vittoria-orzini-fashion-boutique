// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { addProductToShoppingBag } from 'modules/Product/ProductViewModule';
import { toggleAddItemToBagAlert } from 'modules/Shopping/AddItemToBagAlertModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import ShoppingAPI from 'bundles/Account/apis/ShoppingAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* productToShoppingBagSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(addProductToShoppingBag().type);
    try {
      const product = payload.product;
      localStorage.setItem('addedItem', JSON.stringify(product));
      const response = yield call([api, api.addProductToShoppingBag], payload);
      const user = response.details;
      const shoppingBag = user.shoppingBag;
      if(shoppingBag && shoppingBag !== undefined && Object.keys(shoppingBag).length !== 0) {
        const shoppingID = shoppingBag.id;
        localStorage.setItem('shoppingID', shoppingID);
      }
      yield put(fetchUserFulfilled(response.details));
      yield put(toggleAddItemToBagAlert());
    } catch (e) {
      yield put(showMsg("We're sorry to inform you that the item you requested is sold out."));
      yield put(toggleMsg());
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
export default [productToShoppingBagSaga, api];
