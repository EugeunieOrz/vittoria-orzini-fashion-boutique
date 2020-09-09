// @flow
import { createAction, handleActions } from 'redux-actions';

export const newsletterUpdatedState = {
  isShown: false
}

export const toggleUpdatedNewsletter = createAction('TOGGLE_NEWSLETTER_UPDATED');

export default handleActions({
  [toggleUpdatedNewsletter]: (state, action) => ({...state, isShown: !state.isShown }),
}, newsletterUpdatedState);
