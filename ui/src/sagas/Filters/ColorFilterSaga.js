// @flow
import { call, put, take } from 'redux-saga/effects';
import { chooseColor, handleColor } from 'modules/ItemCategories/ColorCategoriesModule';
import { showColors } from 'modules/ItemCategories/ColorsModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* colorFilterSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(chooseColor().type);
    try {
      yield put(handleColor(payload));
      yield put(showColors());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default colorFilterSaga;
