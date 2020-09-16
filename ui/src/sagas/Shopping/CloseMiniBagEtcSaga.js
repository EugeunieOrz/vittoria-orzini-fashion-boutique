// @flow
import { call, put, take } from 'redux-saga/effects';
import { closeAddItemToBagAlert } from 'modules/Shopping/AddItemToBagAlertModule';
import { closeMiniBag, closeMiniBagEtc } from 'modules/Shopping/MiniBagModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* closeMiniBagEtcSaga(): Generator<*, *, *> {
  while (yield take(closeMiniBagEtc().type)) {
    try {
      yield put(closeMiniBag());
      yield put(closeAddItemToBagAlert());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default closeMiniBagEtcSaga;
