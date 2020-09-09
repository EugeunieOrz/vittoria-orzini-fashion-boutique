// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type ReturnForm = {
  orderNumber: string,
}

export const modelPath: string = 'fillReturnForm.data';
export const requestState: RequestState = { isPending: false };
export const formState: ReturnForm = {
  orderNumber: '',
};

export const proceedToReturnForm = createAction('PROCEED_TO_RETURNS_FORM');
export const fillReturnForm = createAction('FILL_RETURN_FORM');
export const fillReturnFormPending = createAction('FILL_RETURN_FORM_PENDING');
export const fillReturnFormFulfilled = createAction('FILL_RETURN_FORM_FULFILLED');
export const fillReturnFormRejected = createAction('FILL_RETURN_FORM_REJECTED');

export default combineReducers({
  request: handleActions({
    [fillReturnFormPending]: () => ({ isPending: true }),
    [fillReturnFormFulfilled]: () => ({ isPending: false }),
    [fillReturnFormRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
