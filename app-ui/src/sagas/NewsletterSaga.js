// @flow
import { call, put, take, all } from 'redux-saga/effects';
import {
  fetchNewsletter,
  fetchNewsletterPending,
  fetchNewsletterFulfilled,
  fetchNewsletterRejected,
} from 'modules/NewsletterModule';
import { combineSagas, handleError } from 'util/Saga';
import NewsletterAPI from 'apis/NewsletterAPI';

export function* fetchNewsletterWorker(api: NewsletterAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(fetchNewsletter().type);
    try {
      yield put(fetchNewsletterPending());
      const response = yield call([api, api.get], payload);
      yield put(fetchNewsletterFulfilled(response.details));
    } catch (e) {
      yield put(fetchNewsletterRejected(e));
      yield call(handleError, e);
    }
  }
}

export function* newsletterSaga(api: NewsletterAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [fetchNewsletterWorker, api],
  ]));
}

const api = new NewsletterAPI();
export default [newsletterSaga, api];
