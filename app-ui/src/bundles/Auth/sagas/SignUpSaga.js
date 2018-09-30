// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { history } from 'modules/LocationModule';
import { fetchUser, fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  signUp,
  signUpPending,
  signUpFulfilled,
  signUpRejected,
} from 'bundles/Auth/modules/SignUpModule';
import { signInFulfilled } from 'bundles/Auth/modules/SignInModule';
import AuthAPI from 'bundles/Auth/apis/AuthAPI';
import config from 'config/index';

export function* signUpSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(signUp().type);
    try {
      yield put(signUpPending());
      const response = yield call([api, api.signUp], payload);
      if(response.code == "auth.email.already.in.use") {
        yield put(signUpFulfilled(response));
        yield put(actions.reset(modelPath));
        yield call(history.push, config.route.auth.alreadyInUse);
      } else {
        yield put(signUpFulfilled(response));
        yield put(signInFulfilled(response));
        yield put(fetchUserFulfilled(response.details));
        yield put(actions.reset(modelPath));
        yield call(history.push, config.route.admin.index);
      }
    } catch (e) {
      yield put(signUpRejected(e));
      yield call(handleError, e, {
        'auth.signUp.form.invalid': formErrorHandler(modelPath),
      });
    }
  }
}

const api = new AuthAPI();
export default [signUpSaga, api];
