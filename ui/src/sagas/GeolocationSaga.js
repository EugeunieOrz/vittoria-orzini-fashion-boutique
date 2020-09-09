// @flow
import { call, put, take } from 'redux-saga/effects';
import {
  fetchGeolocation,
  fetchGeolocationPending,
  fetchGeolocationFulfilled,
  fetchGeolocationRejected,
} from 'modules/GeolocationModule';
import fetch from 'cross-fetch';
import { handleError } from 'util/Saga';
/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */
export function* geolocationSaga(): Generator<*, *, *> {
  while (yield take(fetchGeolocation().type)) {
    try {
      yield put(fetchGeolocationPending());
      const response = yield fetch('https://api.ipdata.co?api-key=245b71d466d3aa976ef5d2100968c673897838bea021d35954cf4c50')
                             .then(resp => resp.json(), )
                             .catch(err => {
                               console.error(err);
                             });
      if(response !== undefined && Object.keys(response).length !== 0) {
        yield put(fetchGeolocationFulfilled(response.country_name));
      } else {
        const country = localStorage.getItem('countryByIP');
        yield put(fetchGeolocationFulfilled(country));
      }
    } catch (e) {
      yield put(fetchGeolocationRejected(e));
      yield call(handleError, e);
    }
  }
}

export default geolocationSaga;
