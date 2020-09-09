// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { history } from 'modules/LocationModule';
import {
  modelPath,
  recoverPassword,
  recoverPasswordPending,
  recoverPasswordFulfilled,
  recoverPasswordRejected,
} from 'bundles/Auth/modules/RecoverPasswordModule';
import { passEmail } from 'bundles/Auth/modules/EmailModule';
import AuthAPI from 'bundles/Auth/apis/AuthAPI';
import config from 'config/index';

export function* recoverPasswordSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(recoverPassword().type);
    try {
      yield put(recoverPasswordPending());
      const response = yield call([api, api.recoverPassword], payload);
      yield put(recoverPasswordFulfilled(response));
      const email = response.details;
      sessionStorage.setItem('email', email);
      yield put(passEmail(email));
      yield put(actions.reset(modelPath));
      yield call(history.push, config.route.auth.emailSent);
    } catch (e) {
      yield put(recoverPasswordRejected(e));
      yield call(handleError, e, {
        'auth.password.recover.form.invalid': formErrorHandler(modelPath),
      });
    }
  }
}

const api = new AuthAPI();
export default [recoverPasswordSaga, api];
