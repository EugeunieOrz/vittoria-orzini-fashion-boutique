// @flow
import Alert from 'react-s-alert';
import { APIError } from 'util/API';
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { history } from 'modules/LocationModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import { fetchConfigFulfilled } from 'modules/ConfigModule';
import {
  modelPath,
  editEmail,
  editEmailPending,
  editEmailFulfilled,
  editEmailRejected,
} from 'bundles/Admin/modules/EditEmailModule';
import { toggleEmail } from 'bundles/Admin/modules/EmailModule';
import { toggleUpdate } from 'bundles/Admin/modules/DetailsUpdateModule';
import AdminAPI from 'bundles/Admin/apis/AdminAPI';
import config from 'config/index';

export function* editEmailSaga(api: AdminAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(editEmail().type);
    try {
      yield put(editEmailPending());
      const response = yield call([api, api.editEmail], userID, data);
      yield put(editEmailFulfilled(response));
      yield put(fetchUserFulfilled(response.details));
      yield put(fetchConfigFulfilled(response.details));
      yield put(toggleEmail());
      yield put(toggleUpdate());
    } catch (e) {
      yield put(editEmailRejected(e));
      yield call(handleError, e, {
        'admin.editEmail.form.invalid': formErrorHandler(modelPath),
        'admin.editEmail.form.invalid': (error: APIError) => ([
          call(Alert.error, error.response.description),
        ]),
      });
    }
  }
}

const api = new AdminAPI();
export default [editEmailSaga, api];
