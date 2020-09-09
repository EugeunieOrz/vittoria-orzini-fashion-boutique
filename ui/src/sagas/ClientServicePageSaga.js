// @flow
import { call, put, take } from 'redux-saga/effects';
import { openClientServicePage, toggleMenu } from 'modules/Menu/MenuModule';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import config from 'config/index';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* clientServicePageSaga(): Generator<*, *, *> {
  while (yield take(openClientServicePage().type)) {
    try {
      yield put(toggleMenu());
      yield call(history.push, config.route.clientService);
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default clientServicePageSaga;
