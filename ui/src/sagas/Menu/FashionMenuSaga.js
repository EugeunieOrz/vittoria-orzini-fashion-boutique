// @flow
import { call, put, take } from 'redux-saga/effects';
import { openFashionMenu, toggleFashionMenu } from 'modules/Menu/FashionMenuModule';
import { closeFineJewelryMenu } from 'modules/Menu/FineJewelryMenuModule';
import { closeHomeCollectionMenu } from 'modules/Menu/HomeCollectionMenuModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* fashionMenuSaga(): Generator<*, *, *> {
  while (yield take(toggleFashionMenu().type)) {
    try {
      yield put(openFashionMenu());
      yield put(closeFineJewelryMenu());
      yield put(closeHomeCollectionMenu());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default fashionMenuSaga;
