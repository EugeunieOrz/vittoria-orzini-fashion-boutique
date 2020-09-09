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

export type CountryStoreForm = {
  country: string,
  store: string
}

export const modelPath: string = 'findStore.data';
export const requestState: RequestState = { isPending: false };
export const formState: CountryStoreForm = {
  country: '',
  store: '',
};

export const findStore = createAction('FIND_STORE');
export const findStorePending = createAction('FIND_STORE_PENDING');
export const findStoreFulfilled = createAction('FIND_STORE_FULFILLED');
export const findStoreRejected = createAction('FIND_STORE_REJECTED');

export default combineReducers({
  request: handleActions({
    [findStorePending]: () => ({ isPending: true }),
    [findStoreFulfilled]: () => ({ isPending: false }),
    [findStoreRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
