// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  modelPath,
  completeSignInForm,
  completeSignInFormPending,
  completeSignInFormFulfilled,
  completeSignInFormRejected,
} from 'bundles/Home/modules/CompleteSignInFormModule';
import { signInFulfilled } from 'bundles/Auth/modules/SignInModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import AuthAPI from 'bundles/Home/apis/AuthAPI';
import config from 'config/index';
import { history } from 'modules/LocationModule';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* completeSignInSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(completeSignInForm().type);
    try {
      yield put(completeSignInFormPending());
      const response = yield call([api, api.completeSignIn], payload);
      const user = response.details;
      yield put(completeSignInFormFulfilled(user));
      yield put(signInFulfilled(user));
      yield put(fetchUserFulfilled(user));
      localStorage.setItem('completeSignIn', "false");
      yield put(actions.reset(modelPath));
      const shoppingBag = localStorage.getItem('shoppingBag');
      if(shoppingBag) {
        const shoppingB = JSON.parse(shoppingBag);
        localStorage.setItem('shoppingID', shoppingB.id);
        localStorage.removeItem('shoppingBag');
      }
      yield call(history.push, config.route.account.checkout);
    } catch (e) {
      yield put(actions.reset(modelPath));
      yield put(completeSignInFormRejected(e));
      yield call(handleError, e);
    }
  }
}

const api = new AuthAPI();
export default [completeSignInSaga, api];
