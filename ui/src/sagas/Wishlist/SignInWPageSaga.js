// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { closeMenu } from 'modules/Menu/MenuModule';
import { toggleSignInW, openSignInW } from 'modules/Wishlist/SignInWPageModule';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* signInWPageSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(openSignInW().type);
    try {
      const productID = payload.productID;
      const menuIsShown = payload.menuIsShown;
      if(productID !== undefined) {
        sessionStorage.setItem('productID', productID);
      }
      if(menuIsShown) {
        yield put(closeMenu());
        yield put(toggleSignInW());
      } else {
        yield put(toggleSignInW());
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default signInWPageSaga;
