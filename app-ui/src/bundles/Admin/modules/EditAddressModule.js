// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export const editAddressFormState = {
  isShown: false,
  index: 0
}

export const toggleEditAddress = createAction('ADMIN_TOGGLE_EDIT_ADDRESS_FORM');

export default handleActions({
  [toggleEditAddress]: (state, action) =>
  ({ ...state, isShown: !state.isShown, index: action.payload }),
}, editAddressFormState);
