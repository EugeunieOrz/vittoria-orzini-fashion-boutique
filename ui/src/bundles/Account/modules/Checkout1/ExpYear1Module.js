// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const expYear1State = {
  year: ''
}

export const selectExpYear1 = createAction('ACCOUNT_TOGGLE_EXP_YEAR_FOR_CHECKOUT_1');

export default handleActions({
  [selectExpYear1]: (state, action) => ({...state, year: action.payload }),
}, expYear1State);
