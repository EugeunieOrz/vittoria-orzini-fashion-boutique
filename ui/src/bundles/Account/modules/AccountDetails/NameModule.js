// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const nameState = {
  isShown: false
}

export const toggleName = createAction('ACCOUNT_TOGGLE_NAME');

export default handleActions({
  [toggleName]: (state, action) => ({...state, isShown: !state.isShown }),
}, nameState);
