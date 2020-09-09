// @flow
import { createAction, handleActions } from 'redux-actions';

export const toggleSubscribeToNewsletterState = {
  isShown: false
}

export const toggleSubscribeToNewsletter = createAction('TOGGLE_SUBSCRIBE_TO_NEWSLETTER');

export default handleActions({
  [toggleSubscribeToNewsletter]: (state, action) => ({...state, isShown: !state.isShown }),
}, toggleSubscribeToNewsletterState);
