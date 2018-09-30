// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type BDateState = {
  isShown: boolean
}

export const bdateState: BDateState = { isShown: false };

export const toggleBDate = createAction('ADMIN_TOGGLE_BDATE');

export default combineReducers({
  bdateModal: handleAction(
    toggleBDate,
    (bdateState, action) => ({
      isShown: !bdateState.isShown
    }),
     bdateState
  ),
});
