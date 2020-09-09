// @flow
import { call, put, take } from 'redux-saga/effects';
import { filterProducts, filterResults } from 'modules/Search/FilterProductsModule';
import { showSearchResults } from 'modules/Search/SearchResultsModule';
import { handleError } from 'util/Saga';
/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* filterResultsSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(filterProducts().type);
    try {
      const ev = payload.event.target.value;
      if(ev !== '') {
        const keyword = ev.toLowerCase()
        const products = payload.products;
        const filtered = products.filter(function(product){
          const filteredProducts = product.name.toLowerCase().indexOf(keyword) > -1 ||
          product.composition.toString().toLowerCase().indexOf(keyword) > -1 ||
          product.color.color.toLowerCase().indexOf(keyword) > -1 ||
          product.details.map(m => m.toLowerCase()).includes(keyword) ||
          product.description.toLowerCase().indexOf(keyword) > -1 ||
          product.stateOfProduct.toLowerCase().indexOf(keyword) > -1
          return filteredProducts;
        });
        yield put(filterResults(filtered));
        yield put(showSearchResults());
      } else {
        yield put(filterResults([]));
      }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default filterResultsSaga;
