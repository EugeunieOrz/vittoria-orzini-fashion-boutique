// @flow
import { call, put, take } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { modelPath } from 'modules/Newsletter/NewsletterModule';
import { fetchGeolocation, resetModelPathAndFetchGeolocation } from 'modules/GeolocationModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* resetModelPathAndFetchGeolocationSaga(): Generator<*, *, *> {
  while (yield take(resetModelPathAndFetchGeolocation().type)) {
    try {
      yield put(actions.reset(modelPath));
      yield put(fetchGeolocation());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default resetModelPathAndFetchGeolocationSaga;
