// @flow
import Alert from 'react-s-alert';
import { actions } from 'react-redux-form';
import { call, put, take, all } from 'redux-saga/effects';
import { combineSagas, handleError, formErrorHandler } from 'util/Saga';
import { APIError } from 'util/API';
import { history } from 'modules/LocationModule';
import {
  modelPath,
  updateNewsletter,
  updateNewsletterPending,
  updateNewsletterFulfilled,
  updateNewsletterRejected,
} from 'bundles/Admin/modules/NewsletterModule';
import AdminAPI from 'bundles/Admin/apis/AdminAPI';
import config from 'config/index';

export function* updateNewsletterSaga(api: AdminAPI): Generator<*, *, *> {
  while (true) {
    const { payload: { userID, data } } = yield take(updateNewsletter().type);
    try {
      yield put(updateNewsletterPending());
      const response = yield call([api, api.updateNewsletter], userID, data);
      yield put(updateNewsletterFulfilled(response));
      yield call(Alert.success, response.description);
    } catch (e) {
      yield put(updateRejected(e));
      yield call(handleError, e, {
        'admin.newsletter.form.invalid': formErrorHandler(modelPath),
        'admin.details.update.invalid': (error: APIError) => ([
          call(Alert.error, error.response.description),
        ]),
      });
    }
  }
}

const api = new AdminAPI();
export default [updateNewsletterSaga, api];
