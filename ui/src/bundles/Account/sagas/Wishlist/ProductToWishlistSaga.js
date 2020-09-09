// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  addProductToWishlist,
  toggleAddItemToWishlistAlert
} from 'bundles/Account/modules/Wishlist/AddItemToWishlistAlertModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import ShoppingAPI from 'bundles/Account/apis/ShoppingAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* productToWishlistSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(addProductToWishlist().type);
    try {
      const wishItem = payload;
      localStorage.setItem('wishItem', JSON.stringify(wishItem));
      const response = yield call([api, api.addProductToWishlist], payload);
      const user = response.details;
      const resp = response.description;
      console.log(response);
      if(resp === "This item had already been added to your wishlist.") {
        yield put(showMsg('itemAlreadyInWishList'));
        yield put(toggleMsg());
      } else if(resp === "You can add no more than 50 items to your wishlist.") {
        yield put(showMsg('noMoreThan50Items'));
        yield put(toggleMsg());
      } else {
        if(user) {
          yield put(fetchUserFulfilled(response.details));
          yield put(toggleAddItemToWishlistAlert());
        }
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
export default [productToWishlistSaga, api];
