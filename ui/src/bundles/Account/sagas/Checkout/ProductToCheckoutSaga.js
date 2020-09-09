// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  fillCheckoutData,
  fillCheckoutDataPending,
  fillCheckoutDataFulfilled,
  fillCheckoutDataRejected,
  modelPath
} from 'bundles/Account/modules/Checkout1/CheckoutFormModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import CheckoutAPI from 'bundles/Account/apis/CheckoutAPI';
import { history } from 'modules/LocationModule';
import config from 'config/index';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* productToCheckoutSaga(api: CheckoutAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fillCheckoutData().type);
    try {
      yield put(fillCheckoutDataPending());
      const response = yield call([api, api.fillCheckoutData], payload);
      const user = response.details;
      const descr = response.description;
      if(descr === "The purchased items were successfully added to your orders.") {
        yield put(actions.reset(modelPath));
        yield put(fetchUserFulfilled(user));
        yield put(fillCheckoutDataFulfilled(user));
        const shoppingID = localStorage.getItem("shoppingID");
        const orders = user.orders;
        if(typeof orders !== undefined && orders.length > 0) {
          const order = orders.find(order => order.id === shoppingID);
          if(order && order !== undefined && Object.keys(order).length !== 0) {
            const addedItems = order.shoppingBag.addedItems;
            sessionStorage.setItem('purchasedItems', JSON.stringify(addedItems));
            sessionStorage.setItem('orderID', shoppingID);
            localStorage.removeItem('shoppingID');
            yield call(history.push, config.route.account.orderConfirm);
          }
        }
      } else if(descr === "Some items in your shopping bag are not available.") {
        yield put(actions.reset(modelPath));
        yield put(fetchUserFulfilled(user));
        yield put(fillCheckoutDataFulfilled(user));
        yield call(history.push, config.route.account.shopping);
        yield put(showMsg("someItemsNA"));
        yield put(toggleMsg());
      } else {
        yield put(actions.reset(modelPath));
        yield put(fetchUserFulfilled(user));
        yield put(fillCheckoutDataFulfilled(user));
      }
    } catch (e) {
      yield put(fillCheckoutDataRejected());
      yield call(handleError, e);
    }
  }
}

const api = new CheckoutAPI();
export default [productToCheckoutSaga, api];
