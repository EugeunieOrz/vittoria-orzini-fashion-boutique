// @flow
import { call, put, take } from 'redux-saga/effects';
import { chooseRTWCategory, handleRTWCategory } from 'modules/ItemCategories/RTWCategoriesModule';
import { showRTWCategories } from 'modules/ItemCategories/RTWShowCategoriesModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* rtwFilterSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(chooseRTWCategory().type);
    try {
      yield put(handleRTWCategory(payload));
      yield put(showRTWCategories());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default rtwFilterSaga;
