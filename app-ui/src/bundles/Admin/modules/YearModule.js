// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type YearState = {
  year: string
}

export const yearState: YearState = { year: '' };

export const selectYear = createAction('ADMIN_TOGGLE_YEAR');

export default combineReducers({
  yearNum: handleAction(
    selectYear,
    (yearState, action) => ({
      year: action.payload
    }),
     yearState
  ),
});
