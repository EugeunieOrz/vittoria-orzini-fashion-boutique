// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { APIError } from 'util/API';
import { fetchUserFulfilled } from 'modules/UserModule';
import { removeCard, showRemoveCardModal } from 'bundles/Account/modules/CreditCards/RemoveCardQModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import AccountAPI from 'bundles/Account/apis/AccountAPI';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export function* removeCardSaga(api: AccountAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, indexToRemoveCard } } = yield take(removeCard().type);
    try {
      const response = yield call([api, api.removeCard], userID, indexToRemoveCard);
      yield put(fetchUserFulfilled(response.details));
      yield put(showMsg('Credit Card deleted'));
      yield put(showRemoveCardModal());
      yield put(toggleMsg());
    } catch (e) {
      yield call(handleError, e, {
        'admin.remove.card.index.invalid': (error: APIError) => ([
        ]),
      });
    }
  }
}

const api = new AccountAPI();
export default [removeCardSaga, api];
