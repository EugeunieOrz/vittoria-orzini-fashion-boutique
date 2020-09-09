// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  addNewAddress,
  addNewAddressPending,
  addNewAddressFulfilled,
  addNewAddressRejected,
} from 'bundles/Account/modules/Addresses/AddNewAddressFormModule';
import { toggleAddNewAddress } from 'bundles/Account/modules/Addresses/AddNewAddressModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* addNewAddressSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(addNewAddress().type);
    try {
      yield put(addNewAddressPending());
      console.log('data: ', payload);
      const response = yield call([api, api.addNewAddress], payload);
      console.log('Response: ', response);
      yield put(addNewAddressFulfilled(response.details));
      yield put(actions.reset(modelPath));
      yield put(fetchUserFulfilled(response.details));
      yield put(showMsg('Your address has been successfully saved'));
      yield put(toggleAddNewAddress());
      yield put(toggleMsg());
    } catch (e) {
      console.log('Error: ', e);
      yield put(addNewAddressRejected(e));
      yield call(handleError, e);
    }
  }
}

const api = new AccountAPI();
export default [addNewAddressSaga, api];
