// @flow
import { createAction, handleActions } from 'redux-actions';

export const categoriesState = {
  categoryIsShown: false
}

export const showCategories = createAction('SHOW_PRODUCT_CATEGORIES');

export default handleActions({
  [showCategories]: (state, action) => ({...state, categoryIsShown: !state.categoryIsShown }),
}, categoriesState);
