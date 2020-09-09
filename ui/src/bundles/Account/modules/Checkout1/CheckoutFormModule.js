// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestCheckoutState = {
  isPending: false
}

export type CheckoutForm = {
  firstName: string,
  lastName: string,
  additional: string,
  address: string,
  zipCode: string,
  city: string,
  country: string,
  province: string,
  email: string,
  telephone: string,
  cardNumber: string,
  month: string,
  year: string,
  code: string,
  name: string
}

export const modelPath: string = 'account.fillCheckoutData.data';
export const formState: CheckoutForm = {
  firstName: '',
  lastName: '',
  additional: '',
  address: '',
  zipCode: '',
  city: '',
  country: '',
  province: '',
  email: '',
  telephone: '',
  cardNumber: '',
  month: '',
  year: '',
  code: '',
  name: ''
};

export const proceedToCheckout = createAction('ACCOUNT_PROCEED_TO_CHECKOUT');
export const fillCheckoutData = createAction('ACCOUNT_FILL_CHECKOUT_DATA');
export const fillCheckoutDataPending = createAction('ACCOUNT_FILL_CHECKOUT_DATA_PENDING');
export const fillCheckoutDataFulfilled = createAction('ACCOUNT_FILL_CHECKOUT_DATA_FULFILLED');
export const fillCheckoutDataRejected = createAction('ACCOUNT_FILL_CHECKOUT_DATA_REJECTED');

export default combineReducers({
  request: handleActions({
    [fillCheckoutDataPending]: () => ({ isPending: true }),
    [fillCheckoutDataFulfilled]: () => ({ isPending: false }),
    [fillCheckoutDataRejected]: () => ({ isPending: false }),
  }, requestCheckoutState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
