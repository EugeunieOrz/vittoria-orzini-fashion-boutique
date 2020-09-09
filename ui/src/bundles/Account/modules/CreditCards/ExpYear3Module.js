// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const expYear3State = {
  year: ''
}

export const selectExpYear3 = createAction('ACCOUNT_TOGGLE_EXP_YEAR_3');

export default handleActions({
  [selectExpYear3]: (state, action) => ({...state, year: action.payload }),
}, expYear3State);
