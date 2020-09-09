// @flow
import { createAction, handleActions } from 'redux-actions';

export const changeCSQKeyState = {
  key: ""
}

export const decorateCSQHeader = createAction('DECORATE_CLIENT_SERVICE_QUESTIONS_HEADER');
export const changeCSQKey = createAction('CHANGE_CLIENT_SERVICE_ACCORDION_HEADER_KEY');

export default handleActions({
  [changeCSQKey]: (state, action) => ({...state, key: action.payload }),
}, changeCSQKeyState);
