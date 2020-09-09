// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const dayState = {
  day: ''
}

export const selectDay = createAction('ACCOUNT_SELECT_DAY');

export default handleActions({
  [selectDay]: (state, action) => ({...state, day: action.payload }),
}, dayState);
