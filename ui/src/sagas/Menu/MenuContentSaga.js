// @flow
import { call, put, take } from 'redux-saga/effects';
import {
  changeCurrentKey,
  decorateOnToggle
  } from 'modules/Menu/DecorateOnToggleModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* menuContentSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(decorateOnToggle().type);
    try {
      const currentKey = payload.currentKey;
      const id = payload.id;
      if(currentKey === id) {
        yield put(changeCurrentKey(""));
      } else {
        yield put(changeCurrentKey(id));
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default menuContentSaga;
