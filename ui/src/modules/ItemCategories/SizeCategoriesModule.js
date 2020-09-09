// @flow
import { createAction, handleActions } from 'redux-actions';

export const sizeCategoriesState = {
  sizeCategory: ''
}

export const chooseSize = createAction('CHOOSE_PRODUCT_SIZE_CATEGORY');
export const handleSize = createAction('HANDLE_PRODUCT_SIZE_CATEGORY');
export const resetSize = createAction('RESET_PRODUCT_SIZE_CATEGORY');

export default handleActions({
  [handleSize]: (state, action) => ({...state, sizeCategory: action.payload }),
  [resetSize]: (state, action) => ({...state, sizeCategory: ''}),
}, sizeCategoriesState);
