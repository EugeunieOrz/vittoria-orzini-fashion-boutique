// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const toggleClosingAccountState = {
  isShown: false
}

export const toggleClosingAccount = createAction('ACCOUNT_TOGGLE_CLOSING_ACCOUNT_ALERT');
export const removeAccount = createAction('ACCOUNT_REMOVE_ACCOUNT');

export default handleActions({
  [toggleClosingAccount]: (state, action) => ({...state, isShown: !state.isShown }),
}, toggleClosingAccountState);
