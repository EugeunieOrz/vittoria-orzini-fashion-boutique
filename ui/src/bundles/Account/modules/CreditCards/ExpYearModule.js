// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const expYearState = {
  year: ''
}

export const selectExpYear = createAction('ACCOUNT_TOGGLE_EXP_YEAR');

export default handleActions({
  [selectExpYear]: (state, action) => ({...state, year: action.payload }),
}, expYearState);
