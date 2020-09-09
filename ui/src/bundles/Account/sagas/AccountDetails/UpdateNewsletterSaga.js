// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  updateNewsletter,
  updateNewsletterPending,
  updateNewsletterFulfilled,
  updateNewsletterRejected,
} from 'bundles/Account/modules/AccountDetails/NewsletterModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* updateNewsletterSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(updateNewsletter().type);
    try {
      yield put(updateNewsletterPending());
      const response = yield call([api, api.updateNewsletter], userID, data);
      yield put(updateNewsletterFulfilled(response));
      yield put(showMsg('Your details have been successfully updated'));
      yield put(toggleMsg());
    } catch (e) {
      yield put(updateNewsletterRejected(e));
      yield call(handleError, e);
    }
  }
}

const api = new AccountAPI();
export default [updateNewsletterSaga, api];
