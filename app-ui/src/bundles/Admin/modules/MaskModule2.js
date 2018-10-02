// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type PasswordState = {
  isHidden2: boolean
}

export const passwordState2: PasswordState = { isHidden2: true };

export const toggleMask2 = createAction('ADMIN_TOGGLE_MASK2');

export default combineReducers({
  mask2: handleAction(
    toggleMask2,
    (passwordState2, action) => ({
      isHidden2: !passwordState2.isHidden2
    }),
     passwordState2
  ),
});
