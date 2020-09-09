// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import {
  modelPath,
  subscribeToNewsletter,
  subscribeToNewsletterPending,
  subscribeToNewsletterFulfilled,
  subscribeToNewsletterRejected
} from 'modules/Newsletter/NewsletterModule';
import NewsletterAPI from 'apis/NewsletterAPI';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

export function* subscribeToNewsletterSaga(api: NewsletterAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(subscribeToNewsletter().type);
    try {
      yield put(subscribeToNewsletterPending());
      console.log('subscribe data: ', payload);
      const response = yield call([api, api.subscribeToNewsletter], payload);
      yield put(subscribeToNewsletterFulfilled(response.details));
      yield put(actions.reset(modelPath));
      sessionStorage.setItem('newsletterOn', "true");
    } catch (e) {
      yield put(subscribeToNewsletterRejected(e));
      yield put(actions.reset(modelPath));
      yield call(handleError, e);
    }
  }
}

const api = new NewsletterAPI();
export default [subscribeToNewsletterSaga, api];
