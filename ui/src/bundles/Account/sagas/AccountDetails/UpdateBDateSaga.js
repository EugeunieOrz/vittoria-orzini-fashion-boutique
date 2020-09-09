// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { APIError } from 'util/API';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  update,
  updatePending,
  updateFulfilled,
  updateRejected,
} from 'bundles/Account/modules/AccountDetails/UpdateModule';
import { toggleBDate } from 'bundles/Account/modules/AccountDetails/BDateModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* updateBDateSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(update().type);
    try {
      yield put(updatePending());
      const response = yield call([api, api.updateDetails], userID, data);
      yield put(actions.reset(modelPath));
      yield put(updateFulfilled(response.details));
      yield put(fetchUserFulfilled(response.details));
      yield put(showMsg('Your details have been successfully updated'));
      yield put(toggleBDate());
      yield put(toggleMsg());
    } catch (e) {
      yield put(updateRejected(e));
      yield call(handleError, e, {
        'admin.dateOfBirth.form.invalid': formErrorHandler(modelPath),
        'admin.details.update.invalid': (error: APIError) => ([
        ]),
      });
    }
  }
}

const api = new AccountAPI();
export default [updateBDateSaga, api];
