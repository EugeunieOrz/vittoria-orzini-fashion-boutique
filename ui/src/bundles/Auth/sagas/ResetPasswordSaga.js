// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { actions } from 'react-redux-form';
import { call, put, take, all } from 'redux-saga/effects';
import { combineSagas, handleError, formErrorHandler } from 'util/Saga';
import { APIError } from 'util/API';
import { history } from 'modules/LocationModule';
import {
  modelPath,
  resetPassword,
  resetPasswordPending,
  resetPasswordFulfilled,
  resetPasswordRejected,
  validatePasswordToken,
} from 'bundles/Auth/modules/ResetPasswordModule';
import { passIDToTheNextPage } from 'bundles/Auth/modules/IDModule';
import AuthAPI from 'bundles/Auth/apis/AuthAPI';
import config from 'config/index';

export function* validatePasswordTokenWorker(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(validatePasswordToken().type);
    try {
      yield call([api, api.validatePasswordToken], payload);
    } catch (e) {
      yield call(history.push, config.route.auth.passwordRecovery);
      yield call(handleError, e);
    }
  }
}

export function* resetPasswordWorker(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { token, data } } = yield take(resetPassword().type);
    try {
      yield put(resetPasswordPending());
      const response = yield call([api, api.resetPassword], token, data);
      const userID = response.details;
      sessionStorage.setItem('userID', userID);
      yield put(passIDToTheNextPage(userID));
      yield put(resetPasswordFulfilled(response));
      yield put(actions.reset(modelPath));
      yield call(history.push, config.route.auth.passwordSurvey);
    } catch (e) {
      yield put(resetPasswordRejected(e));
      yield call(handleError, e, {
        'auth.password.reset.form.invalid': formErrorHandler(modelPath),
        'auth.password.reset.token.invalid': (error: APIError) => ([
          call(history.push, config.route.auth.passwordRecovery),
        ]),
      });
    }
  }
}

export function* resetPasswordSaga(api: AuthAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [validatePasswordTokenWorker, api],
    [resetPasswordWorker, api],
  ]));
}

const api = new AuthAPI();
export default [resetPasswordSaga, api];
