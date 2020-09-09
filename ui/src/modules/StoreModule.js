// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const storeState = {
  store: ''
}

export const selectStore = createAction('SELECT_STORE_ADDRESS');

export default handleActions({
  [selectStore]: (state, action) => ({...state, store: action.payload }),
}, storeState);
