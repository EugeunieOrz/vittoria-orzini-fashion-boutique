// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

export const removeItemFromWishlistRequestState = {
  isPendingRemoveItemFromWishlist: false
}

export const removeItemFromWishlist = createAction('ACCOUNT_REMOVE_ITEM_FROM_WISH_LIST');
export const removeItemFromWishlistPending = createAction('ACCOUNT_REMOVE_ITEM_FROM_WISH_LIST_PENDING');
export const removeItemFromWishlistFulfilled = createAction('ACCOUNT_REMOVE_ITEM_FROM_WISH_LIST_FULFILLED');
export const removeItemFromWishlistRejected = createAction('ACCOUNT_REMOVE_ITEM_FROM_WISH_LIST_REJECTED');

export default combineReducers({
  request: handleActions({
    [removeItemFromWishlistPending]: () => ({ isPendingRemoveItemFromWishlist: true }),
    [removeItemFromWishlistFulfilled]: () => ({ isPendingRemoveItemFromWishlist: false }),
    [removeItemFromWishlistRejected]: () => ({ isPendingRemoveItemFromWishlist: false }),
  }, removeItemFromWishlistRequestState),
});
