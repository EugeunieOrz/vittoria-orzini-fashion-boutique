// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

export const removeItemGuestRequestState = {
  isPending: false
}

export const removeItemFromGuestBag = createAction('REMOVE_ITEM_FROM_GUEST_SHOPPING_BAG');
export const removeItemFromGuestBagPending = createAction('REMOVE_ITEM_FROM_GUEST_SHOPPING_BAG_PENDING');
export const removeItemFromGuestBagFulfilled = createAction('REMOVE_ITEM_FROM_GUEST_SHOPPING_BAG_FULFILLED');
export const removeItemFromGuestBagRejected = createAction('REMOVE_ITEM_FROM_GUEST_SHOPPING_BAG_REJECTED');

export default combineReducers({
  request: handleActions({
    [removeItemFromGuestBagPending]: () => ({ isPending: true }),
    [removeItemFromGuestBagFulfilled]: () => ({ isPending: false }),
    [removeItemFromGuestBagRejected]: () => ({ isPending: false }),
  }, removeItemGuestRequestState),
});
