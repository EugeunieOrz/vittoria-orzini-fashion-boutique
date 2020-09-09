// @flow
/* eslint-disable import/prefer-default-export */
export const countryByIP = (state: Object) => state.geolocation.country;

export const getUserCountryByIP = (state: Object) => {
  const country = countryByIP(state);
  if(country && country !== undefined && country !== '') {
    return country;
  } else {
    return '';
  }
};

export const getUserCountryByIPforHome = (state: Object) => {
  const country = countryByIP(state);
  if(country && country !== undefined && country !== '') {
    return country;
  } else {
    return 'Not Available';
  }
};

export const getCountryByIP = (state: Object) => {
  const chosen = localStorage.getItem('shippingCountry');
  const country1 = chosen + '';
  if(country1 !== 'undefined') {
    return chosen;
  } else {
    const country = countryByIP(state);
    if(country) {
      return country;
    } else {
      return "Not Available"
    }
  }
}
