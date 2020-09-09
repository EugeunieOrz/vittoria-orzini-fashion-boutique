// @flow
import { call, put, take } from 'redux-saga/effects';
import { chooseNFCategory, handleNFCategory } from 'modules/ItemCategories/NFCategoriesModule';
import { showNFCategories } from 'modules/ItemCategories/NFShowCategoriesModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* newInFilterSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(chooseNFCategory().type);
    try {
      yield put(handleNFCategory(payload));
      yield put(showNFCategories());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default newInFilterSaga;
