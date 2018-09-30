// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { history } from 'modules/LocationModule';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  changePassword,
  changePasswordPending,
  changePasswordFulfilled,
  changePasswordRejected,
} from 'bundles/Admin/modules/ChangePasswordModule';
import { togglePasswordForm } from 'bundles/Admin/modules/PasswordFormModule';
import { toggleUpdate } from 'bundles/Admin/modules/DetailsUpdateModule';
import AdminAPI from 'bundles/Admin/apis/AdminAPI';
import config from 'config/index';

export function* changePasswordSaga(api: AdminAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(changePassword().type);
    try {
      yield put(changePasswordPending());
      const response = yield call([api, api.changePassword], userID, data);
      yield put(changePasswordFulfilled(response));
      yield put(fetchUserFulfilled(response.details));
      yield put(togglePasswordForm());
      yield put(toggleUpdate());
    } catch (e) {
      yield put(changePasswordRejected(e));
      yield call(handleError, e, {
        'admin.changePassword.form.invalid': formErrorHandler(modelPath),
        'admin.details.update.invalid': (error: APIError) => ([
          call(Alert.error, error.response.description),
        ]),
      });
    }
  }
}

const api = new AdminAPI();
export default [changePasswordSaga, api];
