// @flow
import { call, put, take } from 'redux-saga/effects';
import { openMsg, showMsg, toggleMsg } from 'modules/MsgModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* msgToCustomerSaga(): Generator<*, *, *> {
  while (yield take(openMsg().type)) {
    try {
      yield put(showMsg('PLEASE CHOOSE SIZE'));
      yield put(toggleMsg());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default msgToCustomerSaga;
