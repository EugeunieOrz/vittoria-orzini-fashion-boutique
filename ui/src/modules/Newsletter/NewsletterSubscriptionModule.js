// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

export const requestState = {
  isPending: false
}

export const sendNewsletter = createAction('SEND_NEWSLETTER');
export const sendNewsletterPending = createAction('SEND_NEWSLETTER_PENDING');
export const sendNewsletterFulfilled = createAction('SEND_NEWSLETTER_FULFILLED');
export const sendNewsletterRejected = createAction('SEND_NEWSLETTER_REJECTED');

export default combineReducers({
  request: handleActions({
    [sendNewsletterPending]: () => ({ isPending: true }),
    [sendNewsletterFulfilled]: () => ({ isPending: false }),
    [sendNewsletterRejected]: () => ({ isPending: false }),
  }, requestState),
});
