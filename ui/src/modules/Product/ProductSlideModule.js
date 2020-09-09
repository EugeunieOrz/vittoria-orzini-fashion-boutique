// @flow
import { createAction, handleActions } from 'redux-actions';

export const productSlideState = {
  index: 0
}

export const selectSlide = createAction('SELECT_PRODUCT_IMAGE_SLIDE');

export default handleActions({
  [selectSlide]: (state, action) => ({ ...state, index: action.payload }),
}, productSlideState);
