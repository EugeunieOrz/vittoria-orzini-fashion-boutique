// @flow
import Alert from 'react-s-alert';
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
import { passEmailToTheNextPage } from 'bundles/Auth/modules/EmailModule';
import AuthAPI from 'bundles/Auth/apis/AuthAPI';
import config from 'config/index';

export function* recoverPasswordSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(recoverPassword().type);
    try {
      yield put(recoverPasswordPending());
      const response = yield call([api, api.recoverPassword], payload);
      yield put(recoverPasswordFulfilled(response));
      yield put(passEmailToTheNextPage(response.details));
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
