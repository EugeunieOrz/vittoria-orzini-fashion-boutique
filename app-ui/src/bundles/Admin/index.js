import { injectReducer } from 'store/reducers';
import { injectSaga } from 'store/sagas';
import reducer from './modules/AdminModule';
import saga from './sagas/AdminSaga';
import Layout from './components/Layout';

export default (store) => {

  injectReducer(store, { key: 'admin', reducer });
  injectSaga(store, { key: 'admin', saga });

  return Layout;
};
