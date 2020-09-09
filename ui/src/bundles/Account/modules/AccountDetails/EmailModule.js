// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const emailState = {
  isShown: false
}

export const toggleEmail = createAction('ACCOUNT_TOGGLE_EMAIL');

export default handleActions({
  [toggleEmail]: (state, action) => ({...state, isShown: !state.isShown }),
}, emailState);
