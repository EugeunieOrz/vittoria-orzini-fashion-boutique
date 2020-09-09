// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const passwordState = {
  isHidden: true
}

export const toggleMask = createAction('ACCOUNT_TOGGLE_MASK');

export default handleActions({
  [toggleMask]: (state, action) => ({...state, isHidden: !state.isHidden }),
}, passwordState);
