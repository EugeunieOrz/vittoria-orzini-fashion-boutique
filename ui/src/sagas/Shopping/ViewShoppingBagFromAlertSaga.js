// @flow
import { call, put, take } from 'redux-saga/effects';
import {
  toggleAddItemToBagAlert,
  proceedToShoppingBagFromAlert
} from 'modules/Shopping/AddItemToBagAlertModule';
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
export function* viewShoppingBagFromAlertSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(proceedToShoppingBagFromAlert().type);
    try {
      if(payload) {
        yield put(toggleAddItemToBagAlert());
        yield call(history.push, config.route.account.shopping);
      } else {
        yield put(toggleAddItemToBagAlert());
        yield call(history.push, config.route.home.shopping);
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default viewShoppingBagFromAlertSaga;
