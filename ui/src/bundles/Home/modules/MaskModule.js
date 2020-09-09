// @flow
import { createAction, handleActions } from 'redux-actions';

export const passwordState = {
  isHidden: true
}

export const toggleMask = createAction('AUTH_TOGGLE_MASK');

export default handleActions({
  [toggleMask]: (state, action) => ({ ...state, isHidden: !state.isHidden }),
}, passwordState);
