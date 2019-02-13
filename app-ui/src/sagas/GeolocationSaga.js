// @flow
import { delay } from 'redux-saga';
import { call, put, take, all, fork, cancel } from 'redux-saga/effects';
import {
  fetchGeolocation,
  fetchGeolocationPending,
  fetchGeolocationFulfilled,
  fetchGeolocationRejected,
} from 'modules/GeolocationModule';
import fetch from 'cross-fetch';
import { combineSagas, handleError } from 'util/Saga';

export function* fetchGeolocationWorker() {
  while (yield take(fetchGeolocation().type)) {
    try {
      yield put(fetchGeolocationPending());
      const response = yield fetch('https://api.ipdata.co?your-key')
                             .then(resp => resp.json(), );
                             console.log(response);
      yield put(fetchGeolocationFulfilled(response.country_name));
    } catch (e) {
      yield put(fetchGeolocationRejected(e));
      yield call(handleError, e);
    }
  }
}


export function* geolocationSaga(): Generator<*, *, *> {
  yield all(combineSagas([
    fetchGeolocationWorker,
  ]));
}

export default [geolocationSaga];
