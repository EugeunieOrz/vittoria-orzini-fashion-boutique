// @flow
import { call, put, take } from 'redux-saga/effects';
import { closeSearchPage } from 'modules/Search/SearchPageModule';
import { switchToProductViewFromSearch } from 'modules/ItemCategories/CategoryModule';
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
export function* productViewFromSearchSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(switchToProductViewFromSearch().type);
    try {
      const product = payload.product;
      const id = product.id;
      const userID = payload.userID;
      const department = "/static/" + product.department.toLowerCase() + "/";
      const collection = product.typeOfCollection.toLowerCase() + "/";
      const link = product.links[0];
      const src = department + collection + link;
      localStorage.setItem('src', src);
      sessionStorage.setItem('productID', id);
      yield put(closeSearchPage());
      if(userID !== undefined) {
        yield call(history.push, `${config.route.account.product}/${id}`);
      } else {
        yield call(history.push, `${config.route.home.product}/${id}`);
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default productViewFromSearchSaga;
