// @flow
import { createAction, handleActions } from 'redux-actions';

export const orderState = {
  orderCategory: ''
}

export const chooseOrderCategory = createAction('CHOOSE_PRODUCT_ORDER_CATEGORY');
export const handleOrderCategory = createAction('HANDLE_PRODUCT_ORDER_CATEGORY');
export const resetOrder = createAction('RESET_PRODUCT_ORDER');

export default handleActions({
  [handleOrderCategory]: (state, action) => ({...state, orderCategory: action.payload }),
  [resetOrder]: (state, action) => ({...state, orderCategory: ''}),
}, orderState);
