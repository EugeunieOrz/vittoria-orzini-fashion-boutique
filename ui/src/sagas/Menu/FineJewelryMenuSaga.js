// @flow
import { call, put, take } from 'redux-saga/effects';
import { openFineJewelryMenu, toggleFineJewelryMenu } from 'modules/Menu/FineJewelryMenuModule';
import { closeFashionMenu } from 'modules/Menu/FashionMenuModule';
import { closeHomeCollectionMenu } from 'modules/Menu/HomeCollectionMenuModule';
import { handleError } from 'util/Saga';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* fineJewelryMenuSaga(): Generator<*, *, *> {
  while (yield take(toggleFineJewelryMenu().type)) {
    try {
      yield put(openFineJewelryMenu());
      yield put(closeFashionMenu());
      yield put(closeHomeCollectionMenu());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default fineJewelryMenuSaga;
