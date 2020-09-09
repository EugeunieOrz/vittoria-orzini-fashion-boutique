// @flow
import { call, put, take } from 'redux-saga/effects';
import { chooseSize, handleSize } from 'modules/ItemCategories/SizeCategoriesModule';
import { showSizes } from 'modules/ItemCategories/SizesModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* sizeFilterSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(chooseSize().type);
    try {
      yield put(handleSize(payload));
      yield put(showSizes());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default sizeFilterSaga;
