// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type NewsletterForm = {
  newsletterFashion: boolean,
  newsletterFineJewelry: boolean,
  newsletterHomeCollection: boolean,
}

export const modelPath: string = 'account.updateNewsletter.data';
export const requestState: RequestState = { isPending: false };
export const formState: NewsletterForm = {
  newsletterFashion: false,
  newsletterFineJewelry: false,
  newsletterHomeCollection: false,
};

export const updateNewsletter = createAction('ACCOUNT_UPDATE_NEWSLETTER');
export const updateNewsletterPending = createAction('ACCOUNT_UPDATE_NEWSLETTER_PENDING');
export const updateNewsletterFulfilled = createAction('ACCOUNT_UPDATE_NEWSLETTER_FULFILLED');
export const updateNewsletterRejected = createAction('ACCOUNT_UPDATE_NEWSLETTER_REJECTED');

export default combineReducers({
  request: handleActions({
    [updateNewsletterPending]: () => ({ isPending: true }),
    [updateNewsletterFulfilled]: () => ({ isPending: false }),
    [updateNewsletterRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
