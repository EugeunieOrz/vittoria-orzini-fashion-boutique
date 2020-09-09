// @flow
import { createAction, handleActions } from 'redux-actions';

export const rtwCategoriesState = {
  readyToWearCategory: ''
}

export const chooseRTWCategory = createAction('CHOOSE_READY_TO_WEAR_CATEGORY');
export const handleRTWCategory = createAction('HANDLE_READY_TO_WEAR_CATEGORY');
export const resetRTWCategory = createAction('RESET_READY_TO_WEAR_CATEGORY');

export default handleActions({
  [handleRTWCategory]: (state, action) => ({...state, readyToWearCategory: action.payload }),
  [resetRTWCategory]: (state, action) => ({...state, readyToWearCategory: ''}),
}, rtwCategoriesState);
