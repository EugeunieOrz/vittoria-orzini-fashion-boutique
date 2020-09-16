// @flow
import { createAction, handleActions } from 'redux-actions';

export const categoriesState = {
  categoryIsShown: false
}

export const showCategories = createAction('SHOW_PRODUCT_CATEGORIES');
export const selectFashionCategory = createAction('SELECT_FASHION_CATEGORY');
export const switchToProductView = createAction('SWITCH_TO_PRODUCT_VIEW');

export default handleActions({
  [showCategories]: (state, action) => ({...state, categoryIsShown: !state.categoryIsShown }),
}, categoriesState);
