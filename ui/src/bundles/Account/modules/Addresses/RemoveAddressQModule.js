// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const removeAddressModalState = {
  isShown: false,
  index: 0
}

export const removeAddress = createAction('ACCOUNT_CONFIRM_REMOVING_OF_ADDRESS');
export const showRemoveAddressModal = createAction('ACCOUNT_SHOW_REMOVE_ADDRESS_QUESTION');

export default handleActions({
  [showRemoveAddressModal]: (state, action) =>
  ({ ...state, isShown: !state.isShown, index: action.payload }),
}, removeAddressModalState);
