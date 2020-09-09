// @flow
import { call, put, take } from 'redux-saga/effects';
import {
  closeSearchResults,
  handleSearchResult
} from 'modules/Search/SearchResultsModule';
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
export function* searchResultsSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(handleSearchResult().type);
    try {
      const product = payload.product;
      const userID = payload.userID;
      if(product) {
        const id = product.id;
        const src = "/static/fashion/newin/" + product.nameOfImg + ".jpg";
        localStorage.setItem('src', src);
        localStorage.setItem('category', product.stateOfProduct);
        if(userID) {
          yield call(history.push, `${config.route.account.product}/${id}`);
          yield put(closeSearchResults());
        } else {
          yield call(history.push, `${config.route.home.product}/${id}`);
          yield put(closeSearchResults());
        }
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default searchResultsSaga;
