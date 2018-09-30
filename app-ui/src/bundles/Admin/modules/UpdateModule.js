// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type SignUpForm = {
  bday: string,
  bmonth: string,
  byear: string,
}

export const modelPath: string = 'admin.update.data';
export const requestState: RequestState = { isPending: false };
export const formState: DateOfBirthForm = {
  bday: '',
  bmonth: '',
  byear: '',
};

export const update = createAction('ADMIN_UPDATE');
export const updatePending = createAction('ADMIN_UPDATE_PENDING');
export const updateFulfilled = createAction('ADMIN_UPDATE_FULFILLED');
export const updateRejected = createAction('ADMIN_UPDATE_REJECTED');

export default combineReducers({
  request: handleActions({
    [updatePending]: () => ({ isPending: true }),
    [updateFulfilled]: () => ({ isPending: false }),
    [updateRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
