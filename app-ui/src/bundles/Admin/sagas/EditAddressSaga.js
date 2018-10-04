// @flow
import Alert from 'react-s-alert';
import { actions } from 'react-redux-form';
import { call, put, take, all } from 'redux-saga/effects';
import { combineSagas, handleError, formErrorHandler } from 'util/Saga';
import { APIError } from 'util/API';
import { history } from 'modules/LocationModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  editAddress,
  editAddressPending,
  editAddressFulfilled,
  editAddressRejected,
} from 'bundles/Admin/modules/EditAddressFormModule';
import { toggleUpdatedAddress } from 'bundles/Admin/modules/AddressUpdatedModule';
import { toggleEditAddress } from 'bundles/Admin/modules/EditAddressModule';
import AdminAPI from 'bundles/Admin/apis/AdminAPI';
import config from 'config/index';

export function* editAddressSaga(api: AdminAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, index, data } } = yield take(editAddress().type);
    try {
      yield put(editAddressPending());
      const response = yield call([api, api.editAddress], userID, index, data);
      yield put(editAddressFulfilled(response));
      yield put(fetchUserFulfilled(response.details));
      yield put(toggleEditAddress());
      yield put(toggleUpdatedAddress());
    } catch (e) {
      yield put(editAddressRejected(e));
      yield call(handleError, e, {
        'admin.edit.address.form.invalid': formErrorHandler(modelPath),
        'admin.details.update.invalid': (error: APIError) => ([
          call(Alert.error, error.response.description),
        ]),
      });
    }
  }
}

const api = new AdminAPI();
export default [editAddressSaga, api];
