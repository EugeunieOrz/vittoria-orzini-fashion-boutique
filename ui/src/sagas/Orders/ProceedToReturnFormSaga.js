// @flow
import { call, take } from 'redux-saga/effects';
import { proceedToReturnForm } from 'modules/Orders/ReturnFormModule';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import config from 'config/index';
/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */
export function* proceedToReturnFormSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(proceedToReturnForm().type);
    try {
      const userID = payload;
      if(userID && userID !== undefined) {
        yield call(history.push, config.route.account.returns);
      } else {
        yield call(history.push, config.route.home.returns);
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default proceedToReturnFormSaga;
