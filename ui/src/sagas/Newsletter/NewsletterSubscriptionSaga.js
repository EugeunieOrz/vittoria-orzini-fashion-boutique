// @flow
import { call, put, take, race, all, delay } from 'redux-saga/effects';
import {
  sendNewsletter,
  sendNewsletterPending,
  sendNewsletterFulfilled,
  sendNewsletterRejected,
} from 'modules/Newsletter/NewsletterSubscriptionModule';
import NewsletterAPI from 'apis/NewsletterAPI';
import { NEWSLETTER_DURATION } from 'config/index';
import { combineSagas, handleError } from 'util/Saga';
/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */
export function* sendNewsletterWorker(api: NewsletterAPI) {
  while (yield take(sendNewsletter().type)) {
    try {
      yield put(sendNewsletterPending());
      const response = yield call([api, api.sendNewsletter]);
      yield put(sendNewsletterFulfilled(response));
    } catch (e) {
      yield put(sendNewsletterRejected(e));
      yield call(handleError, e);
    }
  }
}

export function* sendNewsletterPeriodicallyWorker(duration: number): Generator<*, *, *> {
  while (true) {
    const { stop } = yield race({
      tick: delay(duration),
    });
    if (stop) {
      break;
    }
    yield put(sendNewsletter());
  }
}


export function* newsletterSubscriptionSaga(api: NewsletterAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [sendNewsletterWorker, api],
    [sendNewsletterPeriodicallyWorker, NEWSLETTER_DURATION],
  ]));
}

const api = new NewsletterAPI();
export default [newsletterSubscriptionSaga, api];
