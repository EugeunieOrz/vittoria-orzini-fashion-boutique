// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import {
  modelPath,
  createAccount,
  createAccountPending,
  createAccountFulfilled,
  createAccountRejected,
} from 'bundles/Home/modules/CreateAccountModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import { signInFulfilled } from 'bundles/Auth/modules/SignInModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import AuthAPI from 'bundles/Home/apis/AuthAPI';
import config from 'config/index';
import { history } from 'modules/LocationModule';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* createAccountSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(createAccount().type);
    try {
      yield put(createAccountPending());
      const response = yield call([api, api.createAccount], payload);
      const user = response.details;
      if(response.description === "You are already registered.") {
        yield put(createAccountFulfilled(response));
        yield put(showMsg("alreadyRegistered"));
        yield put(toggleMsg());
      } else {
        yield put(createAccountFulfilled(user));
        yield put(signInFulfilled(user));
        yield put(fetchUserFulfilled(user));
        localStorage.setItem('shouldCreateAccount', "false");
        yield put(actions.reset(modelPath));
        const shoppingBag = localStorage.getItem('shoppingBag');
        if(shoppingBag) {
          const shoppingB = JSON.parse(shoppingBag);
          localStorage.setItem('shoppingID', shoppingB.id);
          localStorage.removeItem('shoppingBag');
        }
        yield call(history.push, config.route.account.checkout);
      }
    } catch (e) {
      yield put(createAccountRejected(e));
      yield call(handleError, e, {
        'invalid.form': formErrorHandler(modelPath),
      });
      yield put(actions.reset(modelPath));
    }
  }
}

const api = new AuthAPI();
export default [createAccountSaga, api];
