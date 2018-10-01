// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type NewAddressSavedState = {
  isShown: boolean
}

export const newAddressSavedState: NewAddressSavedState = { isShown: false };

export const toggleNewAddressSaved = createAction('ADMIN_TOGGLE_NEW_ADDRESS_SAVED');

export default combineReducers({
  newAddressSavedModal: handleAction(
    toggleNewAddressSaved,
    (newAddressSavedState, action) => ({
      isShown: !newAddressSavedState.isShown
    }),
     newAddressSavedState
  ),
});
