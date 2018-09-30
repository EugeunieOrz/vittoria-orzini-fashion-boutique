import { all } from 'redux-saga/effects';
import { combineSagas } from 'util/Saga';
import updateDetailsSagaBinding from 'bundles/Admin/sagas/UpdateDetailsSaga';
import editNameSagaBinding from 'bundles/Admin/sagas/EditNameSaga';
import editEmailSagaBinding from 'bundles/Admin/sagas/EditEmailSaga';
import changePasswordSagaBinding from 'bundles/Admin/sagas/ChangePasswordSaga';

export default function* adminSaga() {
  yield all(combineSagas([
    updateDetailsSagaBinding,
    editNameSagaBinding,
    editEmailSagaBinding,
    changePasswordSagaBinding,
  ]));
}
