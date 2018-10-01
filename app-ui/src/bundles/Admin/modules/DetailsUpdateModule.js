// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type DetailsUpdateState = {
  isShown: boolean
}

export const detailsUpdateState: DetailsUpdateState = { isShown: false };

export const toggleUpdate = createAction('ADMIN_TOGGLE_DETAILS_UPDATE');

export default combineReducers({
  detailsUpdateModal: handleAction(
    toggleUpdate,
    (detailsUpdateState, action) => ({
      isShown: !detailsUpdateState.isShown
    }),
     detailsUpdateState
  ),
});
