import { createAction, handleActions } from 'redux-actions';

export const initialState = {
  health: false,
  products: false,
  user: false,
};

export const initApp = createAction('INIT_APP');

export const setHealthInitialized = createAction('SET_HEALTH_INITIALIZED');
export const setProductsInitialized = createAction('SET_PRODUCTS_INITIALIZED');
export const setUserInitialized = createAction('SET_USER_INITIALIZED');

export default handleActions({
  [setHealthInitialized]: state => ({ ...state, health: true }),
  [setProductsInitialized]: state => ({ ...state, products: true }),
  [setUserInitialized]: state => ({ ...state, user: true }),
}, initialState);
