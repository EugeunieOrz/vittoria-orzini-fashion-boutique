// @flow
import { call, put, take } from 'redux-saga/effects';
import { selectFashionCategory } from 'modules/ItemCategories/CategoryModule';
import { closeFashionMenu } from 'modules/Menu/FashionMenuModule';
import { closeFineJewelryMenu } from 'modules/Menu/FineJewelryMenuModule';
import { closeHomeCollectionMenu } from 'modules/Menu/HomeCollectionMenuModule';
import { closeMenu } from 'modules/Menu/MenuModule';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import config from 'config/index';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* fashionCategorySaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(selectFashionCategory().type);
    try {
      yield put(closeFashionMenu());
      yield put(closeFineJewelryMenu());
      yield put(closeHomeCollectionMenu());
      yield put(closeMenu());
      switch (payload) {
        case "new-arrivals":
          yield call(history.push, config.route.fashion.newIn);
          break;
        case "ready-to-wear":
          yield call(history.push, config.route.fashion.readyToWear);
          break;
        case "dresses":
          yield call(history.push, config.route.fashion.dresses);
          break;
        case "evening":
          yield call(history.push, config.route.fashion.evening);
          break;
        case "jackets":
          yield call(history.push, config.route.fashion.jackets);
          break;
        default:
          yield call(history.push, config.route.fashion.newIn);
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default fashionCategorySaga;
