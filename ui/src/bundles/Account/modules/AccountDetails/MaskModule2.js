// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const passwordState2 = {
  isHidden2: true
}

export const toggleMask2 = createAction('ACCOUNT_TOGGLE_MASK2');

export default handleActions({
  [toggleMask2]: (state, action) => ({...state, isHidden2: !state.isHidden2 }),
}, passwordState2);
