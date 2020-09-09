// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const lastItemState = {
  lastItem: {}
}

export const getLastItem = createAction('ACCOUNT_GET_LAST_ITEM');

export default handleActions({
  [getLastItem]: (state, action) => ({...state, lastItem: action.payload }),
}, lastItemState);
