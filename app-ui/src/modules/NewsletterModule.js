import { createAction, handleActions } from 'redux-actions';

export const initialState = {
  isPending: false,
  model: {},
};

export const fetchNewsletter = createAction('FETCH_NEWSLETTER');
export const fetchNewsletterPending = createAction('FETCH_NEWSLETTER_PENDING');
export const fetchNewsletterFulfilled = createAction('FETCH_NEWSLETTER_FULFILLED');
export const fetchNewsletterRejected = createAction('FETCH_NEWSLETTER_REJECTED');

export default handleActions({
  [fetchNewsletterPending]: state => ({ ...state, isPending: true }),
  [fetchNewsletterFulfilled]: (state, action) => ({ ...state, isPending: false, model: action.payload }),
  [fetchNewsletterRejected]: state => ({ ...state, isPending: false }),
}, initialState);
