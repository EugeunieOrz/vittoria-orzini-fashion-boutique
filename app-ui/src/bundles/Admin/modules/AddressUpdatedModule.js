// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type AddressUpdateState = {
  isShown: boolean
}

export const addressUpdateState: AddressUpdateState = { isShown: false };

export const toggleUpdatedAddress = createAction('ADMIN_TOGGLE_ADDRESS_UPDATE');

export default combineReducers({
  addressUpdateModal: handleAction(
    toggleUpdatedAddress,
    (addressUpdateState, action) => ({
      isShown: !addressUpdateState.isShown
    }),
     addressUpdateState
  ),
});
