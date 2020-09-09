// @flow
import { createAction, handleActions } from 'redux-actions';

export const colorCategoriesState = {
  colorCategory: ''
}

export const chooseColor = createAction('CHOOSE_PRODUCT_COLOR');
export const handleColor = createAction('HANDLE_PRODUCT_COLOR');
export const resetColor = createAction('RESET_PRODUCT_COLOR');

export default handleActions({
  [handleColor]: (state, action) => ({...state, colorCategory: action.payload }),
  [resetColor]: (state, action) => ({...state, colorCategory: ''}),
}, colorCategoriesState);
