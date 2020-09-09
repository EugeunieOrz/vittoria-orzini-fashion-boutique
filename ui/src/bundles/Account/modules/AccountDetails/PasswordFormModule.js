// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const pfState = {
  isShown: false
}

export const togglePasswordForm = createAction('ACCOUNT_TOGGLE_PASSWORD_FORM');

export default handleActions({
  [togglePasswordForm]: (state, action) => ({...state, isShown: !state.isShown }),
}, pfState);
