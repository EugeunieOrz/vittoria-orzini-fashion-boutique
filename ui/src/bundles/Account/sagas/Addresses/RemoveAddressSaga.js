// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { APIError } from 'util/API';
import { fetchUserFulfilled } from 'modules/UserModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import { removeAddress, showRemoveAddressModal } from 'bundles/Account/modules/Addresses/RemoveAddressQModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* removeAddressSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, indexToRemoveAddress } } = yield take(removeAddress().type);
    try {
      const response = yield call([api, api.removeAddress], userID, indexToRemoveAddress);
      yield put(fetchUserFulfilled(response.details));
      yield put(showRemoveAddressModal());
      yield put(showMsg('Address deleted'));
      yield put(toggleMsg());
    } catch (e) {
      yield call(handleError, e, {
        'admin.remove.address.index.invalid': (error: APIError) => ([
        ]),
      });
    }
  }
}

const api = new AccountAPI();
export default [removeAddressSaga, api];
