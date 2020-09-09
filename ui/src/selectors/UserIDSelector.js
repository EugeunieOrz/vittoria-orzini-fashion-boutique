export const getUserID = (state: Object) => {
  const userID = sessionStorage.getItem('userID');
  if(userID) {
    return userID;
  } else if(state !== undefined && state.auth !== undefined && state.auth.getID !== undefined &&
      state.auth.getID.userID !== undefined) {
    return state.auth.getID.userID;
  } else {
    return '';
  }
}
