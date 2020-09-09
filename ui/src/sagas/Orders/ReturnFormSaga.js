// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import {
  modelPath,
  fillReturnForm,
  fillReturnFormPending,
  fillReturnFormFulfilled,
  fillReturnFormRejected
} from 'modules/Orders/ReturnFormModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import ShoppingAPI from 'apis/ShoppingAPI';
import AccountShoppingAPI from 'bundles/Account/apis/ShoppingAPI';
import config from 'config/index';
import i18n from "i18next";

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

export function* returnFormSaga(api: ShoppingAPI, accountApi: AccountShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fillReturnForm().type);
    try {
      yield put(fillReturnFormPending());
      if(payload.userID) {
        const response = yield call([accountApi, accountApi.fillReturnForm2], payload.data);
        const order = response.details;
        const descr = response.description;
        if(order && order !== undefined && Object.keys(order).length !== 0) {
          yield put(actions.reset(modelPath));
          yield put(fillReturnFormFulfilled(order));
          localStorage.setItem('orderToReturn', JSON.stringify(order));
          yield call(history.push, config.route.account.returnsForm);
        } else {
          if(descr === "Transaction could not be found by the given order id." ||
             descr === "Order not found.") {
            localStorage.removeItem("unsettled");
            localStorage.removeItem('orderToReturn');
            yield put(actions.reset(modelPath));
            yield put(fillReturnFormFulfilled(order));
            yield put(showMsg("orderNotFoundMsg"));
            yield put(toggleMsg());
          } else if(descr === "Order has already been returned to the customer.") {
            localStorage.removeItem("unsettled");
            localStorage.removeItem('orderToReturn');
            yield put(actions.reset(modelPath));
            yield put(fillReturnFormFulfilled(order));
            yield put(showMsg("orderReturnedMsg"));
            yield put(toggleMsg());
          }
        }
      } else {
        const response = yield call([api, api.fillReturnForm], payload.data);
        const order = response.details;
        const descr = response.description;
        if(order && order !== undefined && Object.keys(order).length !== 0) {
          yield put(actions.reset(modelPath));
          yield put(fillReturnFormFulfilled(order));
          localStorage.setItem('orderToReturn', JSON.stringify(order));
          yield call(history.push, config.route.home.returnsForm);
        } else {
          if(descr === "Transaction could not be found by the given order id." ||
             descr === "Order not found.") {
            localStorage.removeItem("unsettled");
            localStorage.removeItem('orderToReturn');
            yield put(actions.reset(modelPath));
            yield put(fillReturnFormFulfilled(order));
            yield put(showMsg("orderNotFoundMsg"));
            yield put(toggleMsg());
          }
        }
      }
    } catch (e) {
      const lang = i18n.translator.language;
      var errors = document.getElementById("return-order-num-error");
      var errorsAr = document.getElementById("return-order-num-error-ar");
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
      yield put(fillReturnFormRejected(e));
      yield put(actions.reset(modelPath));
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
const accountApi = new AccountShoppingAPI();
export default [returnFormSaga, api, accountApi];
