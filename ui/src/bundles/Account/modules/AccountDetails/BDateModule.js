// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const bdateState = {
  isShown: false
}

export const toggleBDate = createAction('ACCOUNT_TOGGLE_BDATE');

export default handleActions({
  [toggleBDate]: (state, action) => ({...state, isShown: !state.isShown }),
}, bdateState);
