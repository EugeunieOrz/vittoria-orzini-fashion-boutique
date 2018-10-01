// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type AddNewAddressForm = {
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

export const modelPath: string = 'admin.addNewAddress.data';
export const requestState: RequestState = { isPending: false };
export const formState: AddNewAddressForm = {
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

export const addNewAddress = createAction('ADMIN_ADD_NEW_ADDRESS');
export const addNewAddressPending = createAction('ADMIN_ADD_NEW_ADDRESS_PENDING');
export const addNewAddressFulfilled = createAction('ADMIN_ADD_NEW_ADDRESS_FULFILLED');
export const addNewAddressRejected = createAction('ADMIN_ADD_NEW_ADDRESS_REJECTED');

export default combineReducers({
  request: handleActions({
    [addNewAddressPending]: () => ({ isPending: true }),
    [addNewAddressFulfilled]: () => ({ isPending: false }),
    [addNewAddressRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
