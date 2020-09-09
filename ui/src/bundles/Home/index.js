import { injectReducer } from 'store/reducers';
import { injectSaga } from 'store/sagas';
import reducer from './modules/HomeModule';
import saga from './sagas/HomeSaga';
import Layout from './components/Layout';

export default (store) => {
  injectReducer(store, { key: 'home', reducer });
  injectSaga(store, { key: 'home', saga });

  return Layout;
};
