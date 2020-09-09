// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const editSizeState = {
  size: ''
}

export const selectSizeInShoppingBag = createAction('ACCOUNT_SELECT_SIZE_IN_SHOPPING_BAG');

export default handleActions({
  [selectSizeInShoppingBag]: (state, action) => ({...state, size: action.payload }),
}, editSizeState);
