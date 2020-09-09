import { injectReducer } from 'store/reducers';
import { injectSaga } from 'store/sagas';
import reducer from './modules/AccountModule';
import saga from './sagas/AccountSaga';
import Layout from './components/Layout';

export default (store) => {
  injectReducer(store, { key: 'account', reducer });
  injectSaga(store, { key: 'account', saga });

  return Layout;
};
