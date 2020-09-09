// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { history } from 'modules/LocationModule';
import { fetchUserFulfilled } from 'modules/UserModule';
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
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* signUpSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(signUp().type);
    try {
      yield put(signUpPending());
      const shoppingBag = payload.shoppingBag;
      if(shoppingBag && Object.keys(shoppingBag).length > 0) {
        const response = yield call([api, api.signUpToShop], payload);
        const descr = response.description;
        if(descr === "You are already registered.") {
          yield put(signUpFulfilled(response));
          yield put(actions.reset(modelPath));
          yield call(history.push, config.route.auth.alreadyInUse);
        } else {
          const user = response.details;
          yield put(signUpFulfilled(user));
          yield put(signInFulfilled(user));
          yield put(fetchUserFulfilled(user));
          yield put(actions.reset(modelPath));
          const shoppingBag = localStorage.getItem('shoppingBag');
          if(shoppingBag) {
            const shoppingB = JSON.parse(shoppingBag);
            localStorage.setItem('shoppingID', shoppingB.id);
            localStorage.removeItem('shoppingBag');
          }
          yield call(history.push, config.route.account.index);
        }
      } else {
        const response = yield call([api, api.signUp], payload.data);
        const descr = response.description;
        if(descr === "You are already registered.") {
          yield put(signUpFulfilled(response));
          yield put(actions.reset(modelPath));
          yield call(history.push, config.route.auth.alreadyInUse);
        } else {
          const user = response.details;
          yield put(signUpFulfilled(user));
          yield put(signInFulfilled(user));
          yield put(fetchUserFulfilled(user));
          yield put(actions.reset(modelPath));
          yield call(history.push, config.route.account.index);
        }
      }
    } catch (e) {
      yield put(signUpRejected(e));
      yield call(handleError, e, {
        'invalid.form': formErrorHandler(modelPath),
      });
    }
  }
}

const api = new AuthAPI();
export default [signUpSaga, api];
