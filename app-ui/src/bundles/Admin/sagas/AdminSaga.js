import { all } from 'redux-saga/effects';
import { combineSagas } from 'util/Saga';
import updateDetailsSagaBinding from 'bundles/Admin/sagas/UpdateDetailsSaga';
import updateNewsletterSagaBinding from 'bundles/Admin/sagas/UpdateNewsletterSaga';
import editNameSagaBinding from 'bundles/Admin/sagas/EditNameSaga';
import editEmailSagaBinding from 'bundles/Admin/sagas/EditEmailSaga';
import changePasswordSagaBinding from 'bundles/Admin/sagas/ChangePasswordSaga';
import addNewAddressSagaBinding from 'bundles/Admin/sagas/AddNewAddressSaga';

export default function* adminSaga() {
  yield all(combineSagas([
    updateDetailsSagaBinding,
    updateNewsletterSagaBinding,
    editNameSagaBinding,
    editEmailSagaBinding,
    changePasswordSagaBinding,
    addNewAddressSagaBinding,
  ]));
}
