// @flow
import { call, put, take } from 'redux-saga/effects';
import {
  proceedToCheckoutFromMiniBag,
  toggleMiniBag
} from 'modules/Shopping/MiniBagModule';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import config from 'config/index';
/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker procceds to the checkout page.
 */
export function* proceedToCheckoutFromMiniBagSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(proceedToCheckoutFromMiniBag().type);
    try {
      if (payload) {
        yield put(toggleMiniBag());
        yield call(history.push, config.route.account.checkout);
      } else {
        yield put(toggleMiniBag());
        yield call(history.push, config.route.home.checkout);
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default proceedToCheckoutFromMiniBagSaga;
