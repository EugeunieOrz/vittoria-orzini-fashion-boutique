// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export const productViewState = {
  isPending: false,
  productID: ''
}

export const switchToProductView = createAction('HOME_SWITCH_TO_PRODUCT_VIEW');
export const switchToProductViewPending = createAction('HOME_SWITCH_TO_PRODUCT_VIEW_PENDING');
export const switchToProductViewFulfilled = createAction('HOME_SWITCH_TO_PRODUCT_VIEW_FULFILLED');
export const switchToProductViewRejected = createAction('HOME_SWITCH_TO_PRODUCT_VIEW_REJECTED');

export default handleActions({
  [switchToProductViewPending]: () => ({ isPending: true }),
  [switchToProductViewFulfilled]: () => ({ isPending: false }),
  [switchToProductViewRejected]: () => ({ isPending: false }),
}, productViewState);
