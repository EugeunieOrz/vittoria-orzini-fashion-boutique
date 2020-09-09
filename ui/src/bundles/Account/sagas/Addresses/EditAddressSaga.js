// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  editAddress,
  editAddressPending,
  editAddressFulfilled,
  editAddressRejected,
} from 'bundles/Account/modules/Addresses/EditAddressFormModule';
import { toggleEditAddress } from 'bundles/Account/modules/Addresses/EditAddressModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* editAddressSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(editAddress().type);
    try {
      yield put(editAddressPending());
      const response = yield call([api, api.editAddress], payload);
      yield put(actions.reset(modelPath));
      yield put(editAddressFulfilled(response.details));
      yield put(fetchUserFulfilled(response.details));
      yield put(showMsg('Address successfully saved'));
      yield put(toggleEditAddress());
      yield put(toggleMsg());
    } catch (e) {
      yield put(editAddressRejected(e));
      yield call(handleError, e, {
        'admin.edit.address.form.invalid': formErrorHandler(modelPath),
      });
    }
  }
}

const api = new AccountAPI();
export default [editAddressSaga, api];
