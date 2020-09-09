// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';

export const addWItemToBagRequestState = {
  isPending: false
}

export const addWItemToBag = createAction('ACCOUNT_ADD_WITEM_TO_BAG');
export const addWItemToBagPending = createAction('ACCOUNT_ADD_WITEM_TO_BAG_PENDING');
export const addWItemToBagFulfilled = createAction('ACCOUNT_ADD_WITEM_TO_BAG_FULFILLED');
export const addWItemToBagRejected = createAction('ACCOUNT_ADD_WITEM_TO_BAG_REJECTED');

export default combineReducers({
  request: handleActions({
    [addWItemToBagPending]: () => ({ isPending: true }),
    [addWItemToBagFulfilled]: () => ({ isPending: false }),
    [addWItemToBagRejected]: () => ({ isPending: false }),
  }, addWItemToBagRequestState),
});
