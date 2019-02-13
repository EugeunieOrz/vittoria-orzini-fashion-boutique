// @flow
import { delay } from 'redux-saga';
import { call, put, take, select, all, race, fork, cancel } from 'redux-saga/effects';
import { initApp, setProductsInitialized } from 'modules/InitModule';
import {
  fetchProducts,
  fetchProductsPending,
  fetchProductsFulfilled,
  fetchProductsRejected,
} from 'modules/ProductsModule';
import { combineSagas } from 'util/Saga';
import { PRODUCTS_DURATION } from 'config/index';
import ProductsAPI from 'apis/ProductsAPI';

/**
 * Worker which sets the initialized state for the list of available products.
 *
 * The app uses a loading indicator to show if the app was successfully initialized.
 * The health is a fundamental part of the initialization process, because it might
 * be the case that some service components are out of order.
 *
 * The initialization is fulfilled either if the health status was successfully fetched or
 * if the health status failed.
 */
export function* initProductsWorker(): Generator<*, *, *> {
  while (yield take([fetchProductsFulfilled().type, fetchProductsRejected().type])) {
    yield put(setProductsInitialized());
  }
}

/**
 * Worker which handles the app initialization.
 *
 * The initialization process is a one-time task, therefore we register our
 * `initProductsWorker` task and cancel it after it was finished.
 */
export function* initAppWorker(): Generator<*, *, *> {
  const task = yield fork(initProductsWorker);
  yield take(initApp().type);
  yield put(fetchProducts());
  yield take(setProductsInitialized);
  yield cancel(task);
}

/**
 * Worker which fetches the list of products from backend.
 */
export function* fetchProductsWorker(api: ProductsAPI): Generator<*, *, *> {
  while (yield take(fetchProducts().type)) {
    try {
      yield put(fetchProductsPending());
      const response = yield call([api, api.get]);
      console.log(response.details);
      const products = response.details;
      yield put(fetchProductsFulfilled(products));
    } catch (e) {
      yield put(fetchProductsRejected(e));
    }
  }
}

/**
 * Worker which fetches the health state periodically.
 *
 * @param duration The duration after the which the health state should be fetched periodically.
 */
export function* fetchProductsPeriodicallyWorker(duration: number): Generator<*, *, *> {
  while (true) {
    yield race({
      tick: call(delay, duration),
    });

    yield put(fetchProducts());
  }
}

export function* productsSaga(api: ProductsAPI): Generator<*, *, *> {
  yield all(combineSagas([
    initAppWorker,
    [fetchProductsWorker, api],
    [fetchProductsPeriodicallyWorker, PRODUCTS_DURATION],
  ]));
}

const api = new ProductsAPI();
export default [productsSaga, api];
