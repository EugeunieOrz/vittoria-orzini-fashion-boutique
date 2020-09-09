// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const expMonth2State = {
  month: ''
}

export const selectExpMonth2 = createAction('ACCOUNT_TOGGLE_EXP_MONTH_FOR_CHECKOUT_2');

export default handleActions({
  [selectExpMonth2]: (state, action) => ({...state, month: action.payload }),
}, expMonth2State);
