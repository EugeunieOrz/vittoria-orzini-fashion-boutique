// @flow
import { createAction, handleActions } from 'redux-actions';

export const rtwShowcategoriesState = {
  rtwCategoryIsShown: false
}

export const showRTWCategories = createAction('SHOW_READY_TO_WEAR_CATEGORIES');

export default handleActions({
  [showRTWCategories]: (state) => ({...state, rtwCategoryIsShown: !state.rtwCategoryIsShown }),
}, rtwShowcategoriesState);
