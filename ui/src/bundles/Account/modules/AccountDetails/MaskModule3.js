// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const passwordState3 = {
  isHidden3: true
}

export const toggleMask3 = createAction('ACCOUNT_TOGGLE_MASK3');

export default handleActions({
  [toggleMask3]: (state, action) => ({...state, isHidden3: !state.isHidden3 }),
}, passwordState3);
