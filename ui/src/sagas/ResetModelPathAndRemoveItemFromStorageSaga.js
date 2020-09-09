// @flow
import { call, put, take } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { modelPath, resetModelPathAndRemoveItemFromStorage } from 'modules/Orders/ReturnProductModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* resetModelPathAndRemoveItemFromStorageSaga(): Generator<*, *, *> {
  while (yield take(resetModelPathAndRemoveItemFromStorage().type)) {
    try {
      yield put(actions.reset(modelPath));
      localStorage.removeItem('itemsToReturn')
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default resetModelPathAndRemoveItemFromStorageSaga;
