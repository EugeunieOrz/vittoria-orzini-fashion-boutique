// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestState = {
  isPending: false
}

export type NewsletterForm = {
  newsletterFashion: boolean,
  newsletterFineJewelry: boolean,
  newsletterHomeCollection: boolean,
  email: string,
}

export const modelPath: string = 'subscribeToNewsletter.data';
export const formState: NewsletterForm = {
  newsletterFashion: false,
  newsletterFineJewelry: false,
  newsletterHomeCollection: false,
  email: '',
};

export const subscribeToNewsletter = createAction('SUBSCRIBE_TO_NEWSLETTER');
export const subscribeToNewsletterPending = createAction('SUBSCRIBE_TO_NEWSLETTER_PENDING');
export const subscribeToNewsletterFulfilled = createAction('SUBSCRIBE_TO_NEWSLETTER_FULFILLED');
export const subscribeToNewsletterRejected = createAction('SUBSCRIBE_TO_NEWSLETTER_REJECTED');

export default combineReducers({
  request: handleActions({
    [subscribeToNewsletterPending]: () => ({ isPending: true }),
    [subscribeToNewsletterFulfilled]: () => ({ isPending: false }),
    [subscribeToNewsletterRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
