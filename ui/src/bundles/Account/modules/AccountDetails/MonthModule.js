// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const monthState = {
  month: ''
}

export const selectMonth = createAction('ACCOUNT_TOGGLE_MONTH');

export default handleActions({
  [selectMonth]: (state, action) => ({...state, month: action.payload }),
}, monthState);
