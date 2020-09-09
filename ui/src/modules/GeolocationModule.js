import { createAction, handleActions } from 'redux-actions';

export const initialState = {
  isFetching: false,
  country: '',
};

export const fetchGeolocation = createAction('FETCH_GEOLOCATION');
export const fetchGeolocationPending = createAction('FETCH_GEOLOCATION_PENDING');
export const fetchGeolocationFulfilled = createAction('FETCH_GEOLOCATION_FULFILLED');
export const fetchGeolocationRejected = createAction('FETCH_GEOLOCATION_REJECTED');
export const resetModelPathAndFetchGeolocation = createAction('RESET_MODELPATH_AND_FETCH_GEOLOCATION');

export default handleActions({
  [fetchGeolocationPending]: state => ({ ...state, isFetching: true }),
  [fetchGeolocationFulfilled]: (state, action) =>
    ({ ...state, isFetching: false, country: action.payload }),
  [fetchGeolocationRejected]: state =>
    ({ ...state, isFetching: false, country: '' }),
}, initialState);
