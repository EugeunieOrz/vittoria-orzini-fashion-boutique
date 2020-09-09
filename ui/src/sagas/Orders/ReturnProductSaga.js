// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import {
  modelPath,
  fillReturnProduct,
  fillReturnProductPending,
  fillReturnProductFulfilled,
  fillReturnProductRejected
} from 'modules/Orders/ReturnProductModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import ShoppingAPI from 'apis/ShoppingAPI';
import AccountShoppingAPI from 'bundles/Account/apis/ShoppingAPI';
import config from 'config/index';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

export function* returnProductSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fillReturnProduct().type);
    try {
      if(payload.userID) {
        yield put(fillReturnProductPending());
        if(payload.items && typeof payload.items !== 'undefined' && payload.items.length > 0) {
          const response = yield call([accountApi, accountApi.fillReturnProduct2], payload);
          yield put(fillReturnProductFulfilled(response));
          yield put(actions.reset(modelPath));
          yield put(showMsg("returnStatus"));
          yield put(toggleMsg());
          localStorage.removeItem('itemsToReturn');
          localStorage.removeItem('orderToReturn');
        } else {
          payload.items = ["id1", "id2", "id3"];
          const response = yield call([api, api.fillReturnProduct2], payload);
          yield put(fillReturnProductFulfilled(response));
          yield put(actions.reset(modelPath));
          yield put(showMsg("returnStatus"));
          yield put(toggleMsg());
          localStorage.removeItem('itemsToReturn');
          localStorage.removeItem('orderToReturn');
        }
      } else {
        yield put(fillReturnProductPending());
        console.log('payload: ', payload);
        if(payload.items && typeof payload.items !== 'undefined' && payload.items.length > 0) {
          const response = yield call([api, api.fillReturnProduct], payload);
          yield put(fillReturnProductFulfilled(response));
          yield put(actions.reset(modelPath));
          yield call(history.push, config.route.home.returnStatus);
          localStorage.removeItem('itemsToReturn');
          localStorage.removeItem('orderToReturn');
        } else {
          payload.items = ["id1", "id2", "id3"];
          const response = yield call([api, api.fillReturnProduct], payload);
          yield put(fillReturnProductFulfilled(response));
          yield put(actions.reset(modelPath));
          yield call(history.push, config.route.home.returnStatus);
          localStorage.removeItem('itemsToReturn');
          localStorage.removeItem('orderToReturn');
        }
      }
    } catch (e) {
      yield put(fillReturnProductRejected(e));
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
const accountApi = new AccountShoppingAPI();
export default [returnProductSaga, api, accountApi];
