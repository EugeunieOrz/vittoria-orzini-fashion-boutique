// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  editEmail,
  editEmailPending,
  editEmailFulfilled,
  editEmailRejected,
} from 'bundles/Account/modules/AccountDetails/EditEmailModule';
import { toggleEmail } from 'bundles/Account/modules/AccountDetails/EmailModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* editEmailSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(editEmail().type);
    try {
      yield put(editEmailPending());
      const response = yield call([api, api.editEmail], userID, data);
      yield put(actions.reset(modelPath));
      yield put(editEmailFulfilled(response.details));
      yield put(fetchUserFulfilled(response.details));
      yield put(showMsg('Your details have been successfully updated'));
      yield put(toggleEmail());
      yield put(toggleMsg());
    } catch (e) {
      yield put(editEmailRejected(e));
      yield call(handleError, e, {
        'admin.editEmail.form.invalid': formErrorHandler(modelPath),
      });
    }
  }
}

const api = new AccountAPI();
export default [editEmailSaga, api];
