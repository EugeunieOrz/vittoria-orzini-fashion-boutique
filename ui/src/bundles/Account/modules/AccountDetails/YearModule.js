// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const yearState = {
  year: ''
}

export const selectYear = createAction('ACCOUNT_TOGGLE_YEAR');

export default handleActions({
  [selectYear]: (state, action) => ({...state, year: action.payload }),
}, yearState);
