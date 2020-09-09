// @flow
import { createAction, handleActions } from 'redux-actions';

export const productLookState = {
  isShown: false
}

export const viewProductLook = createAction('VIEW_PRODUCT_LOOK');
export const toggleProductLook = createAction('TOGGLE_PRODUCT_LOOK');
export const closeProductLook = createAction('CLOSE_PRODUCT_LOOK');

export default handleActions({
  [toggleProductLook]: (state, action) => ({ ...state, isShown: !state.isShown }),
  [closeProductLook]: (state, action) => ({ ...state, isShown: false }),
}, productLookState);
