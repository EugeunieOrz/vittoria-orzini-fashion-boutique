// @flow
import { call, put, take } from 'redux-saga/effects';
import { chooseOrderCategory, handleOrderCategory } from 'modules/ItemCategories/OrderModule';
import { showOrderCategories } from 'modules/ItemCategories/OrderCategoriesModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* orderFilterSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(chooseOrderCategory().type);
    try {
      yield put(handleOrderCategory(payload));
      yield put(showOrderCategories());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default orderFilterSaga;
