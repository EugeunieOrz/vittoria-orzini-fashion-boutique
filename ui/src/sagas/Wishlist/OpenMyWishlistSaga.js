// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { toggleProfileActiveKey } from 'bundles/Account/modules/ProfileActiveKeyModule';
import { closeMenu } from 'modules/Menu/MenuModule';
import { openMyWishlist } from 'modules/Wishlist/SignInWPageModule';
import { history } from 'modules/LocationModule';
import config from 'config/index';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* openMyWishlistSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(openMyWishlist().type);
    try {
      if(payload) {
        yield put(closeMenu());
        yield put(toggleProfileActiveKey("wishlist"));
        if(sessionStorage.productID) {
          const id = sessionStorage.getItem('productID');
          yield call(history.push, `${config.route.account.index}/${id}`);
        } else {
          yield call(history.push, config.route.account.index);
        }
      } else {
        yield put(toggleProfileActiveKey("wishlist"));
        yield call(history.push, config.route.account.index);
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default openMyWishlistSaga;
