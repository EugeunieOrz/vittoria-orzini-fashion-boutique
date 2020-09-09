// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction } from 'redux-actions';

export const psState = {
  passwordSurvey: '',
};

export const submitPasswordSurvey = createAction('AUTH_SUBMIT_PS');
export const togglePasswdRadioBtn = createAction('AUTH_TOGGLE_PASSWORD_SURVEY_RADIOBUTTON');

export default combineReducers({
  ps: handleAction(
    togglePasswdRadioBtn,
    (psState, action) => ({
      passwordSurvey: action.payload
    }),
     psState
  ),
});
