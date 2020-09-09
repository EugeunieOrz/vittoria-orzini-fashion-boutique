// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const addItemToWishlistAlertState = {
  isShown: false
}

export const addProductToWishlist = createAction('ACCOUNT_ADD_PRODUCT_TO_WISH_LIST');
export const proceedToWishlist = createAction('ACCOUNT_PROCEED_TO_WISHLIST');
export const toggleAddItemToWishlistAlert = createAction('ACCOUNT_TOGGLE_ADD_ITEM_TO_WISHLIST_ALERT');

export default handleActions({
  [toggleAddItemToWishlistAlert]: (state, action) => ({...state, isShown: !state.isShown }),
}, addItemToWishlistAlertState);
