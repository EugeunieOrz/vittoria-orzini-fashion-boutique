// @flow
import Alert from 'react-s-alert';
import { actions } from 'react-redux-form';
import { call, put, take, all } from 'redux-saga/effects';
import { combineSagas, handleError, formErrorHandler } from 'util/Saga';
import { APIError } from 'util/API';
import { history } from 'modules/LocationModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import { removeAddress, showRemoveAddressModal } from 'bundles/Admin/modules/RemoveAddressQModule';
import { toggleAddressRemoved } from 'bundles/Admin/modules/AddressRemovedModule';
import AdminAPI from 'bundles/Admin/apis/AdminAPI';
import config from 'config/index';

export function* removeAddressSaga(api: AdminAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, indexToRemoveAddress } } = yield take(removeAddress().type);
    console.log("userID: ", userID);
    console.log("index: ", indexToRemoveAddress);
    try {
      const response = yield call([api, api.removeAddress], userID, indexToRemoveAddress);
      yield put(fetchUserFulfilled(response.details));
      yield put(showRemoveAddressModal());
      yield put(toggleAddressRemoved());
    } catch (e) {
      yield call(handleError, e, {
        'admin.remove.address.index.invalid': (error: APIError) => ([
          call(Alert.error, error.response.description),
        ]),
      });
    }
  }
}

const api = new AdminAPI();
export default [removeAddressSaga, api];
