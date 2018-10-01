// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type NameState = {
  isShown: boolean
}

export const nameState: NameState = { isShown: false };

export const toggleName = createAction('ADMIN_TOGGLE_NAME');

export default combineReducers({
  nameModal: handleAction(
    toggleName,
    (nameState, action) => ({
      isShown: !nameState.isShown
    }),
     nameState
  ),
});
