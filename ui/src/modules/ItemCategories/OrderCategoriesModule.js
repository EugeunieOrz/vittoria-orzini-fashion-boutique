// @flow
import { createAction, handleActions } from 'redux-actions';

export const orderCategoriesState = {
  orderIsShown: false
}

export const showOrderCategories = createAction('SHOW_PRODUCT_ORDER_CATEGORIES');

export default handleActions({
  [showOrderCategories]: (state, action) => ({...state, orderIsShown: !state.orderIsShown }),
}, orderCategoriesState);
