// @flow
import { delay } from 'redux-saga';
import { call, put, take, select, all, race, fork, cancel } from 'redux-saga/effects';
import {
  switchToProductView,
  switchToProductViewPending,
  switchToProductViewFulfilled,
  switchToProductViewRejected
} from 'bundles/Home/modules/ProductViewModule';
import { combineSagas } from 'util/Saga';
import { PRODUCTS_DURATION } from 'config/index';
import HomeAPI from 'bundles/Home/apis/HomeAPI';


/**
 * Worker which fetches the list of products from backend.
 */
export function* productViewSaga(api: HomeAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(switchToProductView().type)
    try {
      yield put(switchToProductViewPending());
      const response = yield call([api, api.passProductID], payload);
      console.log(response);
      const product = response.details;
      yield put(switchToProductViewFulfilled(product));
    } catch (e) {
      yield put(switchToProductViewRejected(e));
    }
  }
}

const api = new HomeAPI();
export default [productViewSaga, api];
