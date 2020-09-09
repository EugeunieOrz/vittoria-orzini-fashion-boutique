// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  signInW,
  signInWPending,
  signInWFulfilled,
  signInWRejected,
} from 'modules/Wishlist/SignInWModule';
import { toggleSignInW } from 'modules/Wishlist/SignInWPageModule';
import AuthAPI from 'bundles/Auth/apis/AuthAPI';
import config from 'config/index';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* signInWSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(signInW().type);
    try {
      yield put(signInWPending());
      const shoppingBag = payload.shoppingBag;
      if(Object.keys(shoppingBag).length > 0) {
        const response = yield call([api, api.signInToShop], payload);
        const user = response.details;
        yield put(signInWFulfilled(user));
        yield put(fetchUserFulfilled(user));
        yield put(actions.reset(modelPath));
        yield put(toggleSignInW());
        const shoppingBag = localStorage.getItem('shoppingBag');
        if(shoppingBag) {
          const shoppingB = JSON.parse(shoppingBag);
          localStorage.setItem('shoppingID', shoppingB.id);
          localStorage.removeItem('shoppingBag');
        }
        if(sessionStorage.productID) {
          const id = sessionStorage.getItem('productID');
          if(history.location.pathname.includes(id)) {
            yield call(history.push, `${config.route.account.product}/${id}`);
          } else {
            yield call(history.push, config.route.account.index);
          }
        } else {
          yield call(history.push, config.route.account.index);
        }
      } else {
        const response = yield call([api, api.signIn], payload.data);
        const user = response.details;
        yield put(signInWFulfilled(user));
        yield put(fetchUserFulfilled(user));
        yield put(actions.reset(modelPath));
        yield put(toggleSignInW());
        if(sessionStorage.productID) {
          const id = sessionStorage.getItem('productID');
          if(history.location.pathname.includes(id)) {
            yield call(history.push, `${config.route.account.product}/${id}`);
          } else {
            yield call(history.push, config.route.account.index);
          }
        } else {
          yield call(history.push, config.route.account.index);
        }
      }
    } catch (e) {
      console.log('error: ', e);
      var errors = document.getElementById("signin-wlist-error");
      errors.innerHTML = "Please enter a valid email";
      yield put(signInWRejected(e));
      yield put(actions.reset(modelPath));
      yield call(handleError, e);
    }
  }
}

const api = new AuthAPI();
export default [signInWSaga, api];
