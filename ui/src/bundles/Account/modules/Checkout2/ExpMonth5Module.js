// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const expMonth5State = {
  month: ''
}

export const selectExpMonth5 = createAction('ACCOUNT_TOGGLE_EXP_MONTH_FOR_CHECKOUT_5');

export default handleActions({
  [selectExpMonth5]: (state, action) => ({...state, month: action.payload }),
}, expMonth5State);
