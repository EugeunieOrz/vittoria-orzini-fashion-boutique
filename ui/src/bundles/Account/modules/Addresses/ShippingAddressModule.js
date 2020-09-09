// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const shippingAddressState = {
  index: '0',
};

export const toggleShippingAddress = createAction('ACCOUNT_TOGGLE_SHIPPING_ADDRESS');

export default handleActions({
  [toggleShippingAddress]: (state, action) => ({ ...state, index: action.payload }),
}, shippingAddressState);
