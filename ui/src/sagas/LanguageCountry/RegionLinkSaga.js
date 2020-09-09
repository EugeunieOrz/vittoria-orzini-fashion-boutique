// @flow
import { call, put, take } from 'redux-saga/effects';
import {
  changeCurrentKeyForRegionLink,
  decorateRegionLinkOnToggle
} from 'modules/LanguageCountry/RegionLinkModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* decorateRegionLinkOnToggleSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(decorateRegionLinkOnToggle().type);
    try {
      const currentKey = payload.currentKey;
      const newKey = payload.newKey;
      if(currentKey === newKey) {
        yield put(changeCurrentKeyForRegionLink(""));
      } else {
        yield put(changeCurrentKeyForRegionLink(newKey));
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default decorateRegionLinkOnToggleSaga;
