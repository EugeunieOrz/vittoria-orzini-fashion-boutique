// @flow
import { createAction, handleActions } from 'redux-actions';

export const nfShowcategoriesState = {
  newInFashionCategoryIsShown: false
}

export const showNFCategories = createAction('SHOW_NEW_IN_FASHION_CATEGORIES');

export default handleActions({
  [showNFCategories]: (state) => ({...state, newInFashionCategoryIsShown: !state.newInFashionCategoryIsShown }),
}, nfShowcategoriesState);
