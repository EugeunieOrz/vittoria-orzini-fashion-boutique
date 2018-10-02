// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type PasswordState = {
  isHidden: boolean
}

export const passwordState: PasswordState = { isHidden: true };

export const toggleMask = createAction('ADMIN_TOGGLE_MASK');

export default combineReducers({
  mask: handleAction(
    toggleMask,
    (passwordState, action) => ({
      isHidden: !passwordState.isHidden
    }),
     passwordState
  ),
});
