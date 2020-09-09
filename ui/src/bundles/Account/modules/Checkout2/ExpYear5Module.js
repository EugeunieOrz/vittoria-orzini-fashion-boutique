// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const expYear5State = {
  year: ''
}

export const selectExpYear5 = createAction('ACCOUNT_TOGGLE_EXP_YEAR_FOR_CHECKOUT_5');

export default handleActions({
  [selectExpYear5]: (state, action) => ({...state, year: action.payload }),
}, expYear5State);
