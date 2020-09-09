// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type OrderInfoForm = {
  orderNumber: string,
}

export const modelPath: string = 'followOrder.data';
export const requestState: RequestState = { isPending: false };
export const formState: OrderInfoForm = {
  orderNumber: '',
};

export const followOrder = createAction('FOLLOW_ORDER');
export const followOrderPending = createAction('FOLLOW_ORDER_PENDING');
export const followOrderFulfilled = createAction('FOLLOW_ORDER_FULFILLED');
export const followOrderRejected = createAction('FOLLOW_ORDER_REJECTED');

export default combineReducers({
  request: handleActions({
    [followOrderPending]: () => ({ isPending: true }),
    [followOrderFulfilled]: () => ({ isPending: false }),
    [followOrderRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
