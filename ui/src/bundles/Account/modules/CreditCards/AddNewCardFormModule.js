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

export type AddNewCardForm = {
  cardNumber: string,
  month: string,
  year: string,
  firstName: string,
  lastName: string,
  address: string,
  zipCode: string,
  city: string,
  country: string,
  province: string,
  prefCrdCard: boolean,
}

export const modelPath: string = 'account.addNewCard.data';
export const requestState: RequestState = { isPending: false };
export const formState: AddNewCardForm = {
  cardNumber: '',
  month: '',
  year: '',
  firstName: '',
  lastName: '',
  address: '',
  zipCode: '',
  city: '',
  country: '',
  province: '',
  prefCrdCard: false,
};

export const addNewCard = createAction('ACCOUNT_ADD_NEW_CARD');
export const addNewCardPending = createAction('ACCOUNT_ADD_NEW_CARD_PENDING');
export const addNewCardFulfilled = createAction('ACCOUNT_ADD_NEW_CARD_FULFILLED');
export const addNewCardRejected = createAction('ACCOUNT_ADD_NEW_CARD_REJECTED');

export default combineReducers({
  request: handleActions({
    [addNewCardPending]: () => ({ isPending: true }),
    [addNewCardFulfilled]: () => ({ isPending: false }),
    [addNewCardRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
