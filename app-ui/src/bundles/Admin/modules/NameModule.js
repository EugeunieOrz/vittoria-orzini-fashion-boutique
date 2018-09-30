// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type NameState = {
  editNameIsShown: boolean
}

export const nameState: NameState = { editNameIsShown: false };

export const toggleName = createAction('ADMIN_TOGGLE_NAME');

export default combineReducers({
  nameModal: handleAction(
    toggleName,
    (nameState, action) => ({
      editNameIsShown: !nameState.editNameIsShown
    }),
     nameState
  ),
});
