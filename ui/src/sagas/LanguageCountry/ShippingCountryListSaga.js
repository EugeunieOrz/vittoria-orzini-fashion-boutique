// @flow
import { call, put, take } from 'redux-saga/effects';
import { toggleMenu } from 'modules/Menu/MenuModule';
import {
  toggleShippingCountryList,
  toggleShippingCountry
} from 'modules/LanguageCountry/ShippingToModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* shippingCountryListSaga(): Generator<*, *, *> {
  while (yield take(toggleShippingCountryList().type)) {
    try {
      yield put(toggleMenu());
      yield put(toggleShippingCountry());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default shippingCountryListSaga;
