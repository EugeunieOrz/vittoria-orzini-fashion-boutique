// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import {
  modelPath,
  followOrder,
  followOrderPending,
  followOrderFulfilled,
  followOrderRejected
} from 'modules/Orders/OrderInfoFormModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import ShoppingAPI from 'apis/ShoppingAPI';
import config from 'config/index';
import i18n from "i18next";
/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */
export function* followOrderSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(followOrder().type);
    try {
      yield put(followOrderPending());
      const response = yield call([api, api.followOrder], payload);
      const order = response.details;
      if(response.description !== "Order not found.") {
        yield put(followOrderFulfilled(order));
        localStorage.setItem("orderStatus", order.status);
        localStorage.setItem("orderNumber", order.id);
        yield call(history.push, config.route.orderStatus);
      } else {
        yield put(showMsg("orderNotFoundMsg"));
        yield put(toggleMsg());
      }
      yield put(actions.reset(modelPath));
    } catch (e) {
      const lang = i18n.translator.language;
      var errors = document.getElementById("orderinfo-ordernum-error");
      var errorsAr = document.getElementById("orderinfo-ordernum-error-ar");
      if(errors || errorsAr) {
        switch(lang) {
          case "ar":
            errorsAr.innerHTML = "الرجاء إدخال رقم الطلب صالح";
            break;
          case "en":
            errors.innerHTML = "Please enter a valid Order ID.";
            break;
          case "it":
            errors.innerHTML = "Si prega di inserire il numero d'ordine valido.";
            break;
          default:
            errors.innerHTML = "Please enter a valid Order ID.";
        }
      }
      yield put(followOrderRejected(e));
      yield put(actions.reset(modelPath));
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
export default [followOrderSaga, api];
