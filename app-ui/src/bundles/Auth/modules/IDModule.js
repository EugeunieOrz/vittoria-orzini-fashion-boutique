// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type IDState = {
  userID: string
}

export const idState: IDState = { userID: '' };

export const passIDToTheNextPage = createAction('AUTH_PASS_ID_TO_THE_NEXT_PAGE');

export default combineReducers({
  idContent: handleAction(
    passIDToTheNextPage,
    (idState, action) => ({
      userID: action.payload
    }),
     idState
  ),
});
