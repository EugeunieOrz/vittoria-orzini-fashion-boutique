// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPathEditName,
  editName,
  editNamePending,
  editNameFulfilled,
  editNameRejected,
} from 'bundles/Account/modules/AccountDetails/EditNameModule';
import { toggleName } from 'bundles/Account/modules/AccountDetails/NameModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* editNameSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(editName().type);
    try {
      yield put(editNamePending());
      const response = yield call([api, api.editName], userID, data);
      yield put(actions.reset(modelPathEditName));
      yield put(editNameFulfilled(response.details));
      yield put(fetchUserFulfilled(response.details));
      yield put(showMsg('Your details have been successfully updated'));
      yield put(toggleName());
      yield put(toggleMsg());
    } catch (e) {
      yield put(editNameRejected(e));
      yield call(handleError, e, {
        'admin.editName.form.invalid': formErrorHandler(modelPathEditName),
      });
    }
  }
}

const api = new AccountAPI();
export default [editNameSaga, api];
