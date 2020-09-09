// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { fetchUserFulfilled } from 'modules/UserModule';
import {
  modelPath,
  addNewCard,
  addNewCardPending,
  addNewCardFulfilled,
  addNewCardRejected,
} from 'bundles/Account/modules/CreditCards/AddNewCardFormModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import { toggleAddNewCard } from 'bundles/Account/modules/CreditCards/AddNewCardModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* addNewCardSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(addNewCard().type);
    try {
      yield put(addNewCardPending());
      const response = yield call([api, api.addNewCard], payload);
      console.log(response.details);
      yield put(addNewCardFulfilled(response));
      yield put(actions.reset(modelPath));
      yield put(fetchUserFulfilled(response.details));
      yield put(showMsg('Your credit card has been successfully saved'));
      yield put(toggleAddNewCard());
      yield put(toggleMsg());
    } catch (e) {
      yield put(addNewCardRejected(e));
      yield call(handleError, e, {
        'admin.addnewcard.form.invalid': formErrorHandler(modelPath),
      });
    }
  }
}

const api = new AccountAPI();
export default [addNewCardSaga, api];
