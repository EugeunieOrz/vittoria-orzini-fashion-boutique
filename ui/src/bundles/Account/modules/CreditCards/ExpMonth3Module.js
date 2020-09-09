// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const expMonth3State = {
  month: ''
}

export const selectExpMonth3 = createAction('ACCOUNT_TOGGLE_EXP_MONTH_3');

export default handleActions({
  [selectExpMonth3]: (state, action) => ({...state, month: action.payload }),
}, expMonth3State);
