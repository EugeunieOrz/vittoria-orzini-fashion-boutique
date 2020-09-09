// @flow
import { actions } from 'react-redux-form';
import { all, call, put, take } from 'redux-saga/effects';
import { combineSagas, handleError, formErrorHandler } from 'util/Saga';
import {
  modelPath,
  unsubscribe,
  unsubscribePending,
  unsubscribeFulfilled,
  unsubscribeRejected,
  validateNewsletterID
} from 'modules/Newsletter/NewsletterUnsubscribeModule';
import { toggleUpdatedNewsletter } from 'modules/Newsletter/NewsletterUpdatedModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import NewsletterAPI from 'apis/NewsletterAPI';
import { history } from 'modules/LocationModule';
import config from 'config/index';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

 export function* validateNewsletterIDWorker(api: NewsletterAPI): Generator<*, *, *> {
   while (true) {
     const { payload } = yield take(validateNewsletterID().type);
     try {
       yield call([api, api.validateNewsletterID], payload);
     } catch (e) {
       yield call(history.push, config.route.index);
       yield call(handleError, e);
     }
   }
 }

export function* unsubscribeFromNewsletterWorker(api: NewsletterAPI): Generator<*, *, *> {
  while (true) {
    const { payload: {newsletterID, data} } = yield take(unsubscribe().type);
    try {
      yield put(unsubscribePending());
      const response = yield call([api, api.unsubscribeFromNewsletter], newsletterID, data);
      yield put(unsubscribeFulfilled(response));
      yield put(actions.reset(modelPath));
      if(response.description === "Your newsletter subscription was cancelled.") {
        localStorage.setItem("unsubscribed", "true");
        yield put(toggleUpdatedNewsletter());
      } else if(response.description === "We didn't found your email in our records.") {
        yield put(showMsg("We didn't found your email in our records."));
        yield put(toggleMsg());
      } else {
        yield put(toggleUpdatedNewsletter());
      }
    } catch (e) {
      yield put(unsubscribeRejected(e));
      yield call(handleError, e, {
        'unsubscribe.form.invalid': formErrorHandler(modelPath)
      });
    }
  }
}

export function* unsubscribeFromNewsletterSaga(api: NewsletterAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [validateNewsletterIDWorker, api],
    [unsubscribeFromNewsletterWorker, api],
  ]));
}

const api = new NewsletterAPI();
export default [unsubscribeFromNewsletterSaga, api];
