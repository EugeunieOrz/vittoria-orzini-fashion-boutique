import { injectReducer } from 'store/reducers';
import { injectSaga } from 'store/sagas';
import reducer from './modules/AdminModule';
import saga from './sagas/AdminSaga';
import Layout from './components/Layout';
import thunk from 'redux-thunk';
import { applyMiddleware }  from 'redux';
import { batchDispatchMiddleware } from 'redux-batched-actions';

export default (store) => {
  injectReducer(store, { key: 'admin', reducer });
  injectSaga(store, { key: 'admin', saga });
  applyMiddleware(batchDispatchMiddleware),
  applyMiddleware(thunk)

  return Layout;
};
