// @flow
import { createAction, handleActions } from 'redux-actions';

export const idState = {
  userID: ''
}

export const passIDToTheNextPage = createAction('AUTH_PASS_ID_TO_THE_NEXT_PAGE');

export default handleActions({
  [passIDToTheNextPage]: (state, action) => ({ ...state, userID: action.payload }),
}, idState);
