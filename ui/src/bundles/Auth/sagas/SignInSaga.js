// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import i18n from "i18next";
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
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
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* signInSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(signIn().type);
    try {
      yield put(signInPending());
      const shoppingBag = payload.shoppingBag;
      if(shoppingBag && Object.keys(shoppingBag).length > 0) {
        const response = yield call([api, api.signInToShop], payload);
        const user = response.details;
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
      } else {
        const response = yield call([api, api.signIn], payload.data);
        const user = response.details;
        yield put(signInFulfilled(user));
        yield put(fetchUserFulfilled(user));
        yield put(actions.reset(modelPath));
        yield call(history.push, config.route.account.index);
      }
    } catch (e) {
      const lang = i18n.translator.language;
      var errors = document.getElementById("register-password-error");
      var errorsAr = document.getElementById("register-password-error-ar");
      if(lang === "ar") {
        errorsAr.innerHTML = "بريدك الالكتروني أو كلمة السر غير صحيحة."
      } else {
        if(lang === "it") {
          errors.innerHTML = "La vostra e-mail o la vostra password non è corretta."
        } else {
          errors.innerHTML = "Your email or password is incorrect."
        }
      }
      yield put(actions.reset(modelPath));
      yield put(signInRejected(e));
      yield call(handleError, e);
    }
  }
}

const api = new AuthAPI();
export default [signInSaga, api];
