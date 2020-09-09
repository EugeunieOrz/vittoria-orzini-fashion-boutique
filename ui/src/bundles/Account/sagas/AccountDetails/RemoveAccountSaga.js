// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { fetchUserFulfilled, signOutUser } from 'modules/UserModule';
import { removeAccount } from 'bundles/Account/modules/AccountDetails/ClosingAccountModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* removeAccountSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(removeAccount().type);
    try {
      const response = yield call([api, api.removeAccount], payload);
      yield put(fetchUserFulfilled(response.details));
      localStorage.removeItem('userID2', payload);
      yield put(signOutUser());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

const api = new AccountAPI();
export default [removeAccountSaga, api];
