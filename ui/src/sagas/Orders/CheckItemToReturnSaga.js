// @flow
import { call, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { checkItemToReturn } from 'modules/Orders/ReturnProductModule';
/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */
export function* checkItemToReturnSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(checkItemToReturn().type);
    try {
      const arrVal = payload.target.value;
      const inputs = document.getElementsByClassName('returnproduct-checkbox');
      var arr = [];
      for (var i=0; i < inputs.length; i++) {
        inputs[i].onchange = function() {
            if (this.checked) {
              arr.push(arrVal);
              const items = localStorage.getItem('itemsToReturn');
              if(items) {
                const parsed = JSON.parse(items);
                const updated = parsed.concat(arr);
                localStorage.setItem('itemsToReturn', JSON.stringify(updated));
              } else {
                localStorage.setItem('itemsToReturn', JSON.stringify(arr));
              }
            } else {
              const items = localStorage.getItem('itemsToReturn');
              if(items) {
                const parsed = JSON.parse(items);
                const index = parsed.indexOf(arrVal);
                if(index > -1) {
                  parsed.splice(index, 1);
                }
                localStorage.setItem('itemsToReturn', JSON.stringify(parsed));
              }
            }
        }
     }
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default checkItemToReturnSaga;
