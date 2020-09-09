// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestState = {
  isPending: false
}

export type NewsletterUnsubscribeForm = {
  newsletterFashion: boolean,
  newsletterFineJewelry: boolean,
  newsletterHomeCollection: boolean,
}

export const modelPath: string = 'unsubscribe.data';
export const formState: NewsletterUnsubscribeForm = {
  newsletterFashion: false,
  newsletterFineJewelry: false,
  newsletterHomeCollection: false,
};

export const unsubscribe = createAction('UNSUBSCRIBE_FROM_NEWSLETTER');
export const unsubscribePending = createAction('UNSUBSCRIBE_FROM_NEWSLETTER_PENDING');
export const unsubscribeFulfilled = createAction('UNSUBSCRIBE_FROM_NEWSLETTER_FULFILLED');
export const unsubscribeRejected = createAction('UNSUBSCRIBE_FROM_NEWSLETTER_REJECTED');

export const fillUnsubscribeForm = createAction('FILL_UNSUBSCRIBE_FORM');

export const validateNewsletterID = createAction('VALIDATE_NEWSLETTER_TASK_ID');

export default combineReducers({
  request: handleActions({
    [unsubscribePending]: () => ({ isPending: true }),
    [unsubscribeFulfilled]: () => ({ isPending: false }),
    [unsubscribeRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
