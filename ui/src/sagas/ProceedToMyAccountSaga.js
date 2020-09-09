// @flow
import { call, put, take } from 'redux-saga/effects';
import { closeMenu } from 'modules/Menu/MenuModule';
import { proceedToMyAccount } from 'modules/UserModule';
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
export function* proceedToMyAccountSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(proceedToMyAccount().type);
    try {
      const userID = payload;
      yield put(closeMenu());
      if(userID !== undefined) {
        yield call(history.push, config.route.account.index);
      } else {
        yield call(history.push, config.route.auth.index);
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default proceedToMyAccountSaga;
