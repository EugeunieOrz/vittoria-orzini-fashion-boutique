export const getEmail = (state: Object) => {
  const email = sessionStorage.getItem('email');
  if(email) {
    return email;
  } else if(state !== undefined && state.auth !== undefined &&
      state.auth.passEmail !== undefined && state.auth.passEmail.email !== undefined) {
    return state.auth.passEmail.email;
  } else {
    return {};
  }
}

export const getCustomerEmail = () => {
  const email = localStorage.getItem('customerEmail');
  if(email) {
    return email;
  } else {
    return "";
  }
}
