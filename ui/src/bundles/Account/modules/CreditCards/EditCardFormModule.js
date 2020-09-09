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

export type EditCardForm = {
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

export const modelPath: string = 'account.editCard.data';
export const requestState: RequestState = { isPending: false };
export const formState: EditCardForm = {
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

export const editCard = createAction('ACCOUNT_EDIT_CARD');
export const editCardPending = createAction('ACCOUNT_EDIT_CARD_PENDING');
export const editCardFulfilled = createAction('ACCOUNT_EDIT_CARD_FULFILLED');
export const editCardRejected = createAction('ACCOUNT_EDIT_CARD_REJECTED');

export default combineReducers({
  request: handleActions({
    [editCardPending]: () => ({ isPending: true }),
    [editCardFulfilled]: () => ({ isPending: false }),
    [editCardRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
