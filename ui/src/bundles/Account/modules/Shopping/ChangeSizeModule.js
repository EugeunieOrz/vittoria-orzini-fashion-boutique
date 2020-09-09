// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

export const requestSizeState = {
  isPendingChangeSize: false
}

export const changeSizeInShoppingBag = createAction('ACCOUNT_CHANGE_SIZE_IN_SHOPPING_BAG');
export const changeSizeInShoppingBagPending = createAction('ACCOUNT_CHANGE_SIZE_IN_SHOPPING_BAG_PENDING');
export const changeSizeInShoppingBagFulfilled = createAction('ACCOUNT_CHANGE_SIZE_IN_SHOPPING_BAG_FULFILLED');
export const changeSizeInShoppingBagRejected = createAction('ACCOUNT_CHANGE_SIZE_IN_SHOPPING_BAG_REJECTED');

export default combineReducers({
  request: handleActions({
    [changeSizeInShoppingBagPending]: () => ({ isPendingChangeSize: true }),
    [changeSizeInShoppingBagFulfilled]: () => ({ isPendingChangeSize: false }),
    [changeSizeInShoppingBagRejected]: () => ({ isPendingChangeSize: false }),
  }, requestSizeState),
});
