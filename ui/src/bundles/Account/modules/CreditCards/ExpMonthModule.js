// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const expMonthState = {
  month: ''
}

export const selectExpMonth = createAction('ACCOUNT_TOGGLE_EXP_MONTH');

export default handleActions({
  [selectExpMonth]: (state, action) => ({...state, month: action.payload }),
}, expMonthState);
