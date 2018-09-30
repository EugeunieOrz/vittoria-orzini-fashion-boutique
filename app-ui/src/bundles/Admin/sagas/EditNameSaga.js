// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { history } from 'modules/LocationModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPathEditName,
  editName,
  editNamePending,
  editNameFulfilled,
  editNameRejected,
} from 'bundles/Admin/modules/EditNameModule';
import { toggleName } from 'bundles/Admin/modules/NameModule';
import { toggleUpdate } from 'bundles/Admin/modules/DetailsUpdateModule';
import AdminAPI from 'bundles/Admin/apis/AdminAPI';
import config from 'config/index';

export function* editNameSaga(api: AdminAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(editName().type);
    try {
      yield put(editNamePending());
      const response = yield call([api, api.editName], userID, data);
      yield put(editNameFulfilled(response));
      yield put(fetchUserFulfilled(response.details));
      yield put(toggleName());
      yield put(toggleUpdate());
    } catch (e) {
      yield put(editNameRejected(e));
      yield call(handleError, e, {
        'admin.editName.form.invalid': formErrorHandler(modelPathEditName),
        'admin.details.update.invalid': (error: APIError) => ([
          call(Alert.error, error.response.description),
        ]),
      });
    }
  }
}

const api = new AdminAPI();
export default [editNameSaga, api];
