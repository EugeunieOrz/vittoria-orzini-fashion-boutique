// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

export const requestQtyState = {
  isPendingChangeQty: false
}

export const changeQtyInShoppingBag = createAction('ACCOUNT_CHANGE_QUANTITY_IN_SHOPPING_BAG');
export const changeQtyInShoppingBagPending = createAction('ACCOUNT_CHANGE_QUANTITY_IN_SHOPPING_BAG_PENDING');
export const changeQtyInShoppingBagFulfilled = createAction('ACCOUNT_CHANGE_QUANTITY_IN_SHOPPING_BAG_FULFILLED');
export const changeQtyInShoppingBagRejected = createAction('ACCOUNT_CHANGE_QUANTITY_IN_SHOPPING_BAG_REJECTED');

export default combineReducers({
  request: handleActions({
    [changeQtyInShoppingBagPending]: () => ({ isPendingChangeQty: true }),
    [changeQtyInShoppingBagFulfilled]: () => ({ isPendingChangeQty: false }),
    [changeQtyInShoppingBagRejected]: () => ({ isPendingChangeQty: false }),
  }, requestQtyState),
});
