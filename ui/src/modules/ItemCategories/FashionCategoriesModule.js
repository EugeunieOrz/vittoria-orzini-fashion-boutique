// @flow
import { createAction, handleActions } from 'redux-actions';

export const fashionCategoriesState = {
  fashionCategory: ''
}

export const chooseCategory = createAction('CHOOSE_PRODUCT_CATEGORY');
export const handleCategory = createAction('HANDLE_PRODUCT_CATEGORY');
export const resetCategory = createAction('RESET_PRODUCT_CATEGORY');

export default handleActions({
  [handleCategory]: (state, action) => ({...state, fashionCategory: action.payload }),
  [resetCategory]: (state, action) => ({...state, fashionCategory: ''}),
}, fashionCategoriesState);
