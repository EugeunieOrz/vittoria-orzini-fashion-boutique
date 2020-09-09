// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  fillCheckoutData2,
  fillCheckoutData2Pending,
  fillCheckoutData2Fulfilled,
  fillCheckoutData2Rejected,
  modelPath2
} from 'bundles/Account/modules/Checkout2/CheckoutForm2Module';
import { fetchUserFulfilled } from 'modules/UserModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import CheckoutAPI from 'bundles/Account/apis/CheckoutAPI';
import { history } from 'modules/LocationModule';
import config from 'config/index';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* productToCheckout2Saga(api: CheckoutAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fillCheckoutData2().type);
    try {
      yield put(fillCheckoutData2Pending());
      const response = yield call([api, api.fillCheckoutData2], payload);
      const user = response.details;
      const descr = response.description;
      if(descr === "The purchased items were successfully added to your orders.") {
        yield put(fetchUserFulfilled(user));
        yield put(fillCheckoutData2Fulfilled(user));
        const shoppingID = localStorage.getItem("shoppingID");
        const orders = user.orders;
        if(typeof orders !== undefined && orders.length > 0 && orders !== '') {
          const order = orders.find(order => order.id === shoppingID);
          if(order && order !== undefined && Object.keys(order).length !== 0) {
            const addedItems = order.shoppingBag.addedItems;
            sessionStorage.setItem('purchasedItems', JSON.stringify(addedItems));
          }
        }
        sessionStorage.setItem('orderID', shoppingID);
        localStorage.removeItem('shoppingID');
        yield put(actions.reset(modelPath2));
        yield call(history.push, config.route.account.orderConfirm);
      } else if(descr === "Some items in your shopping bag are not available.") {
        yield put(actions.reset(modelPath2));
        yield put(fetchUserFulfilled(user));
        yield put(fillCheckoutData2Fulfilled(user));
        yield call(history.push, config.route.account.shopping);
        yield put(showMsg("someItemsNA"));
        yield put(toggleMsg());
      } else {
        console.log("The transaction was declined");
        yield put(actions.reset(modelPath2));
        yield put(fetchUserFulfilled(user));
        yield put(fillCheckoutData2Fulfilled(user));
      }
    } catch (e) {
      yield put(fillCheckoutData2Rejected());
      yield put(actions.reset(modelPath2));
      yield call(handleError, e);
    }
  }
}

const api = new CheckoutAPI();
export default [productToCheckout2Saga, api];
