// @flow
import { createAction, handleActions } from 'redux-actions';

export const sizesState = {
  sizeIsShown: false
}

export const showSizes = createAction('SHOW_PRODUCT_SIZES');

export default handleActions({
  [showSizes]: (state, action) => ({...state, sizeIsShown: !state.sizeIsShown }),
}, sizesState);
