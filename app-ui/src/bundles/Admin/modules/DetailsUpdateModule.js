// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type DetailsUpdateState = {
  isShownUpdated: boolean
}

export const detailsUpdateState: DetailsUpdateState = { isShownUpdated: false };

export const toggleUpdate = createAction('ADMIN_TOGGLE_DETAILS_UPDATE');

export default combineReducers({
  detailsUpdateModal: handleAction(
    toggleUpdate,
    (detailsUpdateState, action) => ({
      isShownUpdated: !detailsUpdateState.isShownUpdated
    }),
     detailsUpdateState
  ),
});
