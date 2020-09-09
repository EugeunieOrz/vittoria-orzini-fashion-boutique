// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { call, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { history } from 'modules/LocationModule';
import { submitPasswordSurvey } from 'bundles/Auth/modules/PasswordSurveyModule';
import AuthAPI from 'bundles/Auth/apis/AuthAPI';
import { APIError } from 'util/API';
import config from 'config/index';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* submitPasswordSurveyWorker(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(submitPasswordSurvey().type);
    try {
      const response = yield call([api, api.submitPasswordSurvey], payload);
      console.log('Response: ', response);
      if(response.description === "Password survey data were submitted.") {
        yield call(history.push, config.route.auth.changedPassword);
        sessionStorage.removeItem('userID');
      }
    } catch (e) {
      console.log('Error: ', e);
      yield call(handleError, e, {
        'auth.password.survey.info.invalid': (error: APIError) => ([
          call(history.push, config.route.auth.errorPage),
        ]),
      });
    }
  }
}

const api = new AuthAPI();
export default [submitPasswordSurveyWorker, api];
