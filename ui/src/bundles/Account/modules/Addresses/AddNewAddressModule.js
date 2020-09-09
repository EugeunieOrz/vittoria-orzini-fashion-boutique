// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const addNewAddressState = {
  isShown: false
}

export const toggleAddNewAddress = createAction('ACCOUNT_TOGGLE_ADD_NEW_ADDRESS');
export const toggleAddNewAddr2AndFetchGeoloc = createAction('ACCOUNT_TOGGLE_ADDRESS_AND_FETCH_GELOCATION_2');

export default handleActions({
  [toggleAddNewAddress]: (state, action) => ({...state, isShown: !state.isShown }),
}, addNewAddressState);
