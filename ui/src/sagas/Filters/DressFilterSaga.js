// @flow
import { call, put, take } from 'redux-saga/effects';
import { chooseCategory, handleCategory } from 'modules/ItemCategories/FashionCategoriesModule';
import { showCategories } from 'modules/ItemCategories/CategoriesModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* dressFilterSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(chooseCategory().type);
    try {
      yield put(handleCategory(payload));
      yield put(showCategories());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default dressFilterSaga;
