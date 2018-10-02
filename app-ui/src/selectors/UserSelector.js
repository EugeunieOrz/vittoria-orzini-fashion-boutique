// @flow
export const getUser = (state: Object) => state.user.model;
export const getUserID = (state: Object) => getUser(state).id;
export const getUserName = (state: Object) => getUser(state).name;
export const getUserFirstName = (state: Object) => getUser(state).firstName;
export const getUserLastName = (state: Object) => getUser(state).lastName;
export const getUserTitle = (state: Object) => getUser(state).title;
export const getUserEmail = (state: Object) => getUser(state).email;
export const getUserBDate = (state: Object) => getUser(state).dateOfBirth;
export const getNewsletterUpdates = (state: Object) =>
  getUser(state).newsletters[0].updates.isChecked;
export const getNewsletterFashion = (state: Object) =>
  getUser(state).newsletters[0].newsletterFashion.isChecked;
export const getNewsletterVintage = (state: Object) =>
  getUser(state).newsletters[0].newsletterVintage.isChecked;
export const getNewsletterHomeCollection = (state: Object) =>
  getUser(state).newsletters[0].newsletterHomeCollection.isChecked;
