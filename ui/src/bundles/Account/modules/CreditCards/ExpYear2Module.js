// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const expYear2State = {
  year: ''
}

export const selectExpYear2 = createAction('ACCOUNT_TOGGLE_EXP_YEAR_FOR_CHECKOUT_2');

export default handleActions({
  [selectExpYear2]: (state, action) => ({...state, year: action.payload }),
}, expYear2State);
