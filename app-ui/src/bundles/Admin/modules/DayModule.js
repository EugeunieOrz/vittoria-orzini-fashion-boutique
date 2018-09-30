// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type DayState = {
  day: string
}

export const dayState: DayState = { day: '' };

export const selectDay = createAction('ADMIN_SELECT_DAY');

export default combineReducers({
  dayNum: handleAction(
    selectDay,
    (dayState, action) => ({
      day: action.payload
    }),
     dayState
  ),
});
