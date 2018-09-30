// @flow
import Alert from 'react-s-alert';
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import { handleError, formErrorHandler } from 'util/Saga';
import { history } from 'modules/LocationModule';
import { submitPasswordSurvey } from 'bundles/Auth/modules/PasswordSurveyModule';
import AuthAPI from 'bundles/Auth/apis/AuthAPI';
import config from 'config/index';

export function* submitPasswordSurveyWorker(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(submitPasswordSurvey().type);
    try {
      const response = yield call([api, api.submitPasswordSurvey], payload);
      yield call(history.push, config.route.index);
    } catch (e) {
      yield call(handleError, e, {
        'auth.password.survey.info.invalid': (error: APIError) => ([
          call(history.push, config.route.auth.errorPage),
          call(Alert.error, error.response.description),
        ]),
      });
    }
  }
}

const api = new AuthAPI();
export default [submitPasswordSurveyWorker, api];
