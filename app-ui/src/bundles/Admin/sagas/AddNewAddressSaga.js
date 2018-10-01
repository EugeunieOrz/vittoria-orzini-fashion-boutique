// @flow
import Alert from 'react-s-alert';
import { actions } from 'react-redux-form';
import { call, put, take, all } from 'redux-saga/effects';
import { combineSagas, handleError, formErrorHandler } from 'util/Saga';
import { APIError } from 'util/API';
import { history } from 'modules/LocationModule';
import {
  modelPath,
  addNewAddress,
  addNewAddressPending,
  addNewAddressFulfilled,
  addNewAddressRejected,
} from 'bundles/Admin/modules/AddNewAddressFormModule';
import { toggleNewAddressSaved } from 'bundles/Admin/modules/NewAddressSavedModule';
import AdminAPI from 'bundles/Admin/apis/AdminAPI';
import config from 'config/index';

export function* addNewAddressSaga(api: AdminAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(addNewAddress().type);
    try {
      yield put(addNewAddressPending());
      const response = yield call([api, api.addNewAddress], userID, data);
      yield put(addNewAddressFulfilled(response));
      yield put(actions.reset(modelPath));
      yield put(toggleNewAddressSaved());
    } catch (e) {
      yield put(updateRejected(e));
      yield call(handleError, e, {
        'admin.addnewaddress.form.invalid': formErrorHandler(modelPath),
        'admin.details.update.invalid': (error: APIError) => ([
          call(Alert.error, error.response.description),
        ]),
      });
    }
  }
}

const api = new AdminAPI();
export default [addNewAddressSaga, api];
