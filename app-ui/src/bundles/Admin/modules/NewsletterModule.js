// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type NewsletterForm = {
  updates: boolean,
  newsletterFashion: boolean,
  newsletterVintage: boolean,
  newsletterHomeCollection: boolean,
}

export const modelPath: string = 'admin.updateNewsletter.data';
export const requestState: RequestState = { isPending: false };
export const formState: NewsletterForm = {
  updates: false,
  newsletterFashion: false,
  newsletterVintage: false,
  newsletterHomeCollection: false,
};

export const updateNewsletter = createAction('ADMIN_UPDATE_NEWSLETTER');
export const updateNewsletterPending = createAction('ADMIN_UPDATE_NEWSLETTER_PENDING');
export const updateNewsletterFulfilled = createAction('ADMIN_UPDATE_NEWSLETTER_FULFILLED');
export const updateNewsletterRejected = createAction('ADMIN_UPDATE_NEWSLETTER_REJECTED');

export default combineReducers({
  request: handleActions({
    [updateNewsletterPending]: () => ({ isPending: true }),
    [updateNewsletterFulfilled]: () => ({ isPending: false }),
    [updateNewsletterRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
