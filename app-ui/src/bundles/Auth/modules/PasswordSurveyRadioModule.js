// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type RadioForm = {
  ps: string,
}

export const modelPath: string = 'auth.submitPasswordSurvey.data';
export const requestState: RequestState = { isPending: false };
export const formState: RadioForm = {
  ps: '',
};

export const submitPasswordSurvey = createAction('AUTH_SUBMIT_PS');
export const submitPasswordSurveyPending = createAction('AUTH_SUBMIT_PS_PENDING');
export const submitPasswordSurveyFulfilled = createAction('AUTH_SUBMIT_PS_FULFILLED');
export const submitPasswordSurveyRejected = createAction('AUTH_SUBMIT_PS_REJECTED');

export default combineReducers({
  request: handleActions({
    [submitPasswordSurveyPending]: () => ({ isPending: true }),
    [submitPasswordSurveyFulfilled]: () => ({ isPending: false }),
    [submitPasswordSurveyRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
