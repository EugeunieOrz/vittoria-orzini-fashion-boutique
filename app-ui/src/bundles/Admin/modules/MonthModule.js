// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type MonthState = {
  month: string
}

export const monthState: MonthState = { month: '' };

export const selectMonth = createAction('ADMIN_TOGGLE_MONTH');

export default combineReducers({
  monthName: handleAction(
    selectMonth,
    (monthState, action) => ({
      month: action.payload
    }),
     monthState
  ),
});
