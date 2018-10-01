// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type AddNewAddressState = {
  isShown: boolean
}

export const addNewAddressState: AddNewAddressState = { isShown: false };

export const toggleAddNewAddress = createAction('ADMIN_TOGGLE_ADD_NEW_ADDRESS');

export default combineReducers({
  addNewAddressModal: handleAction(
    toggleAddNewAddress,
    (addNewAddressState, action) => ({
      isShown: !addNewAddressState.isShown
    }),
     addNewAddressState
  ),
});
