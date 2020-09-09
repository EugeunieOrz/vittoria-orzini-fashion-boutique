// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestCompleteSignInFormState = {
  isPending: false
}

export type CompleteSignInForm = {
  password: string,
}

export const modelPath: string = 'home.completeSignInForm.data';
export const formState: CompleteSignInForm = {
  password: '',
};

export const completeSignInForm = createAction('HOME_COMPLETE_SIGN_IN_FOR_CHECKOUT');
export const completeSignInFormPending = createAction('HOME_COMPLETE_SIGN_IN_FOR_CHECKOUT_PENDING');
export const completeSignInFormFulfilled = createAction('HOME_COMPLETE_SIGN_IN_FOR_CHECKOUT_FULFILLED');
export const completeSignInFormRejected = createAction('HOME_COMPLETE_SIGN_IN_FOR_CHECKOUT_REJECTED');

export default combineReducers({
  request: handleActions({
    [completeSignInFormPending]: () => ({ isPending: true }),
    [completeSignInFormFulfilled]: () => ({ isPending: false }),
    [completeSignInFormRejected]: () => ({ isPending: false }),
  }, requestCompleteSignInFormState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
