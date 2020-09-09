// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { toggleProductLook, viewProductLook } from 'modules/Product/ProductLookModule';
import { selectSlide } from 'modules/Product/ProductSlideModule';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* productLookSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(viewProductLook().type);
    try {
      const index = payload.slideIndex;
      const product = payload.product;
      localStorage.setItem('product-look', JSON.stringify(product));
      yield put(selectSlide(index));
      yield put(toggleProductLook());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default productLookSaga;
