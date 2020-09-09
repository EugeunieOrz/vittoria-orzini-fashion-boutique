// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const editAddressFormState = {
  isShown: false,
  index: 0
}

export const toggleEditAddress = createAction('ACCOUNT_TOGGLE_EDIT_ADDRESS_FORM');

export default handleActions({
  [toggleEditAddress]: (state, action) =>
  ({ ...state, isShown: !state.isShown, index: action.payload }),
}, editAddressFormState);
