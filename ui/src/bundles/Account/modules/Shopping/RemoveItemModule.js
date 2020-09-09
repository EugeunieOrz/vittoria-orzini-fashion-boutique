// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

export const removeItemRequestState = {
  isPendingRemoveItem: false
}

export const removeItemFromShoppingBag = createAction('ACCOUNT_REMOVE_ITEM_FROM_SHOPPING_BAG');
export const removeItemFromShoppingBagPending = createAction('ACCOUNT_REMOVE_ITEM_FROM_SHOPPING_BAG_PENDING');
export const removeItemFromShoppingBagFulfilled = createAction('ACCOUNT_REMOVE_ITEM_FROM_SHOPPING_BAG_FULFILLED');
export const removeItemFromShoppingBagRejected = createAction('ACCOUNT_REMOVE_ITEM_FROM_SHOPPING_BAG_REJECTED');

export default combineReducers({
  request: handleActions({
    [removeItemFromShoppingBagPending]: () => ({ isPendingRemoveItem: true }),
    [removeItemFromShoppingBagFulfilled]: () => ({ isPendingRemoveItem: false }),
    [removeItemFromShoppingBagRejected]: () => ({ isPendingRemoveItem: false }),
  }, removeItemRequestState),
});
