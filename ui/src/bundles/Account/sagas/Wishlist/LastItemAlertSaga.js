// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  setLastItemAlert,
  setLastItemAlertPending,
  setLastItemAlertFulfilled,
  setLastItemAlertRejected
} from 'bundles/Account/modules/Wishlist/LastItemAlertFormModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* lastItemAlertSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(setLastItemAlert().type);
    try {
      yield put(setLastItemAlertPending());
      const response = yield call([api, api.setLastItemAlert], payload);
      const user = response.details;
      yield put(fetchUserFulfilled(user));
      yield put(setLastItemAlertFulfilled(user));
    } catch (e) {
      console.log(e);
      yield put(setLastItemAlertRejected(e));
      yield call(handleError, e);
    }
  }
}

const api = new AccountAPI();
export default [lastItemAlertSaga, api];
