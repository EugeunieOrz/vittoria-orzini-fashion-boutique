// @flow
import { createAction, handleActions } from 'redux-actions';

export const filterProductsState = {
  filteredProducts: []
}

export const filterProducts = createAction('FILTER_PRODUCTS');
export const filterResults = createAction('FILTER_RESULTS');

export default handleActions({
  [filterResults]: (state, action) => ({...state, filteredProducts: action.payload }),
}, filterProductsState);
