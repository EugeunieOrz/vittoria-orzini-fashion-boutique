import { all } from 'redux-saga/effects';
import { combineSagas } from 'util/Saga';
import checkEmailSagaBinding from 'bundles/Home/sagas/CheckEmailSaga';
import completeSignInSagaBinding from 'bundles/Home/sagas/CompleteSignInSaga';
import createAccountSagaBinding from 'bundles/Home/sagas/CreateAccountSaga';

export default function* homeSaga() {
  yield all(combineSagas([
    completeSignInSagaBinding,
    createAccountSagaBinding,
    checkEmailSagaBinding,
  ]));
}
