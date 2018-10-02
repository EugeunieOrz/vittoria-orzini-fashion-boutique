// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { history } from 'modules/LocationModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  signIn,
  signInPending,
  signInFulfilled,
  signInRejected,
} from 'bundles/Auth/modules/SignInModule';
import AuthAPI from 'bundles/Auth/apis/AuthAPI';
import config from 'config/index';
import { APIError } from '../../../util/API';

export function* signInSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(signIn().type);
    try {
      yield put(signInPending());
      const response = yield call([api, api.signIn], payload);
      yield put(signInFulfilled(response));
      yield put(fetchUserFulfilled(response.details));
      yield put(actions.reset(modelPath));
      yield call(history.push, config.route.admin.index);
    } catch (e) {
      yield put(signInRejected(e));
      yield call(handleError, e, {
        'auth.signIn.form.invalid': formErrorHandler(modelPath),
      });
    }
  }
}

const api = new AuthAPI();
export default [signInSaga, api];
