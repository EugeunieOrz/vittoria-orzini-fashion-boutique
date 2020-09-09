// @flow
import { call, put, take } from 'redux-saga/effects';
import {
  changeInnerCurrentKey2,
  innerDecorateOnToggle2
  } from 'modules/Menu/InnerDecorateOnToggle2Module';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* innerMenuContent2Saga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(innerDecorateOnToggle2().type);
    try {
      const currentKey = payload.currentKey;
      const id = payload.id;
      if(currentKey === id) {
        yield put(changeInnerCurrentKey2(""));
      } else {
        yield put(changeInnerCurrentKey2(id));
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default innerMenuContent2Saga;
