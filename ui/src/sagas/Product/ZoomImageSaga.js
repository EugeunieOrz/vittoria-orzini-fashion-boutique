// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleImageStyle, handleMouseMove } from 'modules/Product/ProductViewModule';
import { handleError } from 'util/Saga';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

/**
 * Worker passes selected product to the product view page.
 */
export function* zoomImageSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(handleMouseMove().type);
    try {
      const event = payload;
      const { left, top, width, height } = event.target.getBoundingClientRect();
      const x = (event.pageX - left) / width * 100;
      const y = (event.pageY - top) / height * 100;
      const style = `${x}% ${y}%`;
      yield put(handleImageStyle(style));
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default zoomImageSaga;
