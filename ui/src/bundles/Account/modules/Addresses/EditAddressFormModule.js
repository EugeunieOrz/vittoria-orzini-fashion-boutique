// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type EditAddressForm = {
  firstName: string,
  lastName: string,
  additional: string,
  address: string,
  zipCode: string,
  city: string,
  country: string,
  province: string,
  email: string,
  dayTelephone: string,
  eveningTelephone: string,
  defShipAddr: boolean,
  preferBillAddr: boolean,
}

export const modelPath: string = 'account.editAddress.data';
export const requestState: RequestState = { isPending: false };
export const formState: EditAddressForm = {
  firstName: '',
  lastName: '',
  additional: '',
  address: '',
  zipCode: '',
  city: '',
  country: '',
  province: '',
  email: '',
  dayTelephone: '',
  eveningTelephone: '',
  defShipAddr: false,
  preferBillAddr: false,
};

export const editAddress = createAction('ACCOUNT_EDIT_ADDRESS');
export const editAddressPending = createAction('ACCOUNT_EDIT_ADDRESS_PENDING');
export const editAddressFulfilled = createAction('ACCOUNT_EDIT_ADDRESS_FULFILLED');
export const editAddressRejected = createAction('ACCOUNT_EDIT_ADDRESS_REJECTED');

export default combineReducers({
  request: handleActions({
    [editAddressPending]: () => ({ isPending: true }),
    [editAddressFulfilled]: () => ({ isPending: false }),
    [editAddressRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
