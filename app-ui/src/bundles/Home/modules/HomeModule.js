import { combineReducers } from 'redux';
import switchToProductViewReducer from 'bundles/Home/modules/ProductViewModule';

export default combineReducers({
  switchToProductView: switchToProductViewReducer,
});
