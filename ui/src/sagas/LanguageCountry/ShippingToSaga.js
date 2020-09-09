// @flow
import { call, put, take } from 'redux-saga/effects';
import { chooseShippingCountry, toggleShippingCountry } from 'modules/LanguageCountry/ShippingToModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* shippingToSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(chooseShippingCountry().type);
    try {
      localStorage.setItem('shippingCountry', payload);
      yield put(toggleShippingCountry());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default shippingToSaga;
