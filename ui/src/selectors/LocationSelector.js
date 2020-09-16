// @flow
import get from 'lodash/get';

// eslint-disable-next-line import/prefer-default-export
export const getPathname = (state: Object) => get(state, 'pathname', window.location.pathname);

export const getCountry = () => {
  const country = localStorage.getItem('shippingCountry');
  if(country) {
    return country;
  } else {
    return 'NA';
  }
}
