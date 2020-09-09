// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import { proceedToRecoverPasswordPage, toggleSignInW } from 'modules/Wishlist/SignInWPageModule';
import config from 'config/index';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* proceedToRecoverPasswordPageSaga(): Generator<*, *, *> {
  while (yield take(proceedToRecoverPasswordPage().type)) {
    try {
      yield put(toggleSignInW());
      yield call(history.push, config.route.auth.passwordRecovery);
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default proceedToRecoverPasswordPageSaga;
