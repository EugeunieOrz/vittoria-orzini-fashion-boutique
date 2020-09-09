// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

export const requestState = {
  isPending: false
}

export const setLastItemAlert = createAction('ACCOUNT_SET_LAST_ITEM_ALERT');
export const setLastItemAlertPending = createAction('ACCOUNT_SET_LAST_ITEM_ALERT_PENDING');
export const setLastItemAlertFulfilled = createAction('ACCOUNT_SET_LAST_ITEM_ALERT_FULFILLED');
export const setLastItemAlertRejected = createAction('ACCOUNT_SET_LAST_ITEM_ALERT_REJECTED');

export default combineReducers({
  request: handleActions({
    [setLastItemAlertPending]: () => ({ isPending: true }),
    [setLastItemAlertFulfilled]: () => ({ isPending: false }),
    [setLastItemAlertRejected]: () => ({ isPending: false }),
  }, requestState),
});
