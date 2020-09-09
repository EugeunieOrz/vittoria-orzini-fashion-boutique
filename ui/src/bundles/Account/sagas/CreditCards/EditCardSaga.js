// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  editCard,
  editCardPending,
  editCardFulfilled,
  editCardRejected,
} from 'bundles/Account/modules/CreditCards/EditCardFormModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import { toggleEditCard } from 'bundles/Account/modules/CreditCards/EditCardModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* editCardSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(editCard().type);
    try {
      yield put(editCardPending());
      const response = yield call([api, api.editCard], payload);
      yield put(actions.reset(modelPath));
      yield put(editCardFulfilled(response.details));
      yield put(fetchUserFulfilled(response.details));
      yield put(showMsg('Credit Card successfully saved'));
      yield put(toggleEditCard());
      yield put(toggleMsg());
    } catch (e) {
      yield put(editCardRejected(e));
      yield call(handleError, e, {
        'admin.edit.card.form.invalid': formErrorHandler(modelPath),
      });
    }
  }
}

const api = new AccountAPI();
export default [editCardSaga, api];
