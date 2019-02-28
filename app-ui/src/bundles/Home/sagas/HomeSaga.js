import { all } from 'redux-saga/effects';
import { combineSagas } from 'util/Saga';
import productViewBinding from 'bundles/Home/sagas/ProductViewSaga';

export default function* authSaga() {
  yield all(combineSagas([
    productViewBinding,
  ]));
}
