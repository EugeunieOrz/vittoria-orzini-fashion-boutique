// @flow
import { call, put, take } from 'redux-saga/effects';
import { changeCSQKey, decorateCSQHeader } from 'modules/CSQHeaderModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* clientServiceKeySaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(decorateCSQHeader().type);
    try {
      const currentKey = payload.currentKey;
      const id = payload.id;
      if(currentKey === id) {
        yield put(changeCSQKey(""));
      } else {
        yield put(changeCSQKey(id));
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default clientServiceKeySaga;
