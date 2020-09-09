// @flow
import { call, put, take } from 'redux-saga/effects';
import { openHomeCollectionMenu, toggleHomeCollectionMenu } from 'modules/Menu/HomeCollectionMenuModule';
import { closeFashionMenu } from 'modules/Menu/FashionMenuModule';
import { closeFineJewelryMenu } from 'modules/Menu/FineJewelryMenuModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* fineJewelryMenuSaga(): Generator<*, *, *> {
  while (yield take(toggleHomeCollectionMenu().type)) {
    try {
      yield put(openHomeCollectionMenu());
      yield put(closeFashionMenu());
      yield put(closeFineJewelryMenu());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default fineJewelryMenuSaga;
