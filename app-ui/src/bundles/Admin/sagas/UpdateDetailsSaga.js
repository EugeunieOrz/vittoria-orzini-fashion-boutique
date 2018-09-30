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
  update,
  updatePending,
  updateFulfilled,
  updateRejected,
} from 'bundles/Admin/modules/UpdateModule';
import { toggleBDate } from 'bundles/Admin/modules/BDateModule';
import { toggleUpdate } from 'bundles/Admin/modules/DetailsUpdateModule';
import AdminAPI from 'bundles/Admin/apis/AdminAPI';
import config from 'config/index';

export function* updateDetailsSaga(api: AdminAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(update().type);
    try {
      yield put(updatePending());
      const response = yield call([api, api.updateDetails], userID, data);
      yield put(updateFulfilled(response));
      yield put(fetchUserFulfilled(response.details));
      yield put(toggleBDate());
      yield put(toggleUpdate());
    } catch (e) {
      yield put(updateRejected(e));
      yield call(handleError, e, {
        'admin.dateOfBirth.form.invalid': formErrorHandler(modelPath),
        'admin.details.update.invalid': (error: APIError) => ([
          call(Alert.error, error.response.description),
        ]),
      });
    }
  }
}

const api = new AdminAPI();
export default [updateDetailsSaga, api];
