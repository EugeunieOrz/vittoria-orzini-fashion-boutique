// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type PasswordState = {
  isHidden3: boolean
}

export const passwordState3: PasswordState = { isHidden3: true };

export const toggleMask3 = createAction('AUTH_TOGGLE_MASK3');

export default combineReducers({
  mask3: handleAction(
    toggleMask3,
    (passwordState3, action) => ({
      isHidden3: !passwordState3.isHidden3
    }),
     passwordState3
  ),
});
