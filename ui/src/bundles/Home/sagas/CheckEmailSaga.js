// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  modelPath,
  checkEmail,
  checkEmailPending,
  checkEmailFulfilled,
  checkEmailRejected,
} from 'bundles/Home/modules/CheckEmailModule';
import AuthAPI from 'bundles/Home/apis/AuthAPI';
import { history } from 'modules/LocationModule';
import config from 'config/index';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* checkEmailSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(checkEmail().type);
    try {
      yield put(checkEmailPending());
      const response = yield call([api, api.checkEmail], payload);
      yield put(checkEmailFulfilled(response));
      console.log('payload: ', payload);
      console.log('response: ', response);
      if(response.description === "We didn't found your email in our records.") {
        localStorage.setItem('customerEmail', payload.email);
        localStorage.setItem('completeSignIn', "false");
        localStorage.setItem('shouldCreateAccount', "true");
        yield call(history.push, config.route.home.completeSignIn);
      } else {
        localStorage.setItem('customerEmail', payload.email);
        localStorage.setItem('completeSignIn', "true");
        localStorage.setItem('shouldCreateAccount', "false");
        yield call(history.push, config.route.home.completeSignIn);
      }
      yield put(actions.reset(modelPath));
    } catch (e) {
      yield put(checkEmailRejected(e));
      yield call(handleError, e);
      yield put(actions.reset(modelPath));
    }
  }
}

const api = new AuthAPI();
export default [checkEmailSaga, api];
