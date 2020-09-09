// @flow
import { createAction, handleActions } from 'redux-actions';

export const nfCategoriesState = {
  newInFashionCategory: ''
}

export const chooseNFCategory = createAction('CHOOSE_NEW_IN_FASHION_CATEGORY');
export const handleNFCategory = createAction('HANDLE_NEW_IN_FASHION_CATEGORY');
export const resetNFCategory = createAction('RESET_NEW_IN_FASHION_CATEGORY');

export default handleActions({
  [handleNFCategory]: (state, action) => ({...state, newInFashionCategory: action.payload }),
  [resetNFCategory]: (state, action) => ({...state, newInFashionCategory: ''}),
}, nfCategoriesState);
