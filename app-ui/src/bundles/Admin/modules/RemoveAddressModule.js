// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export const initialState = {
  isPending: false,
  index: 0,
};

export const removeAddress = createAction('ADMIN_CONFIRM_REMOVING_OF_ADDRESS');
export const removeAddressPending = createAction('ADMIN_CONFIRM_REMOVING_OF_ADDRESS_PENDING');
export const removeAddressFulfilled = createAction('ADMIN_CONFIRM_REMOVING_OF_ADDRESS_FULFILLED');
export const removeAddressRejected = createAction('ADMIN_CONFIRM_REMOVING_OF_ADDRESS_REJECTED');

export default combineReducers({
  request: handleActions({
    [removeAddressPending]: () => ({ isPending: true }),
    [removeAddressFulfilled]: (state, action) => ({ ...state, isPending: false, index: action.payload.indexToRemoveAddress }),
    [removeAddressRejected]: () => ({ isPending: false }),
  }, initialState),
});
