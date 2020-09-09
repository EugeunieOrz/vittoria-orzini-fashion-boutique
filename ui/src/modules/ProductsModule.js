import { createAction, handleActions } from 'redux-actions';

export const initialState = {
  isPending: false,
  model: [],
};

export const fetchProducts = createAction('FETCH_PRODUCTS');
export const fetchProductsPending = createAction('FETCH_PRODUCTS_PENDING');
export const fetchProductsFulfilled = createAction('FETCH_PRODUCTS_FULFILLED');
export const fetchProductsRejected = createAction('FETCH_PRODUCTS_REJECTED');

export default handleActions({
  [fetchProductsPending]: state => ({ ...state, isPending: true }),
  [fetchProductsFulfilled]: (state, action) => ({ ...state, isPending: false, model: action.payload }),
  [fetchProductsRejected]: state => ({ ...state, isPending: false }),
}, initialState);
