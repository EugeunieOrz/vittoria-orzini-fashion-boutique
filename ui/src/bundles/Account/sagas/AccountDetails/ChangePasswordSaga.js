// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  changePassword,
  changePasswordPending,
  changePasswordFulfilled,
  changePasswordRejected,
} from 'bundles/Account/modules/AccountDetails/ChangePasswordModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import { togglePasswordForm } from 'bundles/Account/modules/AccountDetails/PasswordFormModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* changePasswordSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(changePassword().type);
    try {
      yield put(changePasswordPending());
      const response = yield call([api, api.changePassword], userID, data);
      yield put(changePasswordFulfilled(response.details));
      yield put(fetchUserFulfilled(response.details));
      yield put(actions.reset(modelPath));
      yield put(showMsg('Your details have been successfully updated'));
      yield put(togglePasswordForm());
      yield put(toggleMsg());
    } catch (e) {
      yield put(changePasswordRejected(e));
      yield call(handleError, e, {
        'admin.changePassword.form.invalid': formErrorHandler(modelPath)
      });
    }
  }
}

const api = new AccountAPI();
export default [changePasswordSaga, api];
