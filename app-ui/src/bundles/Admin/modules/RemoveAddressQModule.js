// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export const removeAddressModalState = {
  isShown: false,
  index: 0
}

export const removeAddress = createAction('ADMIN_CONFIRM_REMOVING_OF_ADDRESS');
export const showRemoveAddressModal = createAction('ADMIN_SHOW_REMOVE_ADDRESS_QUESTION');

export default handleActions({
  [showRemoveAddressModal]: (state, action) =>
  ({ ...state, isShown: !state.isShown, index: action.payload }),
}, removeAddressModalState);
