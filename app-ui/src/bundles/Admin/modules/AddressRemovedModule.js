// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type AddressRemovedModalState = {
  isShown: boolean
}

export const addressRemovedModalState: AddressRemovedModalState = { isShown: false };

export const toggleAddressRemoved = createAction('ADMIN_TOGGLE_ADDRESS_REMOVED');

export default combineReducers({
  addressRemovedModal: handleAction(
    toggleAddressRemoved,
    (addressRemovedModalState, action) => ({
      isShown: !addressRemovedModalState.isShown
    }),
     addressRemovedModalState
  ),
});
