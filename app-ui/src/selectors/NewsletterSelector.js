// @flow
/* eslint-disable import/prefer-default-export */
export const getNewsletter = (state: Object) => state.newsletter.model;
export const getNewsletterUpdates = (state: Object) => {
  if(state !== undefined && getNewsletter(state) !== undefined
     && getNewsletter(state).updates !== undefined
     && getNewsletter(state).updates.isChecked !== undefined) {
    return getNewsletter(state).updates.isChecked;
  } else {
    return false;
  }
}
export const getNewsletterFashion = (state: Object) => {
  if(state !== undefined && getNewsletter(state) !== undefined
     && getNewsletter(state).newsletterFashion !== undefined
     && getNewsletter(state).newsletterFashion.isChecked !== undefined) {
    return getNewsletter(state).newsletterFashion.isChecked;
  } else {
    return false;
  }
}
export const getNewsletterVintage = (state: Object) => {
  if(state !== undefined && getNewsletter(state) !== undefined
     && getNewsletter(state).newsletterVintage !== undefined
     && getNewsletter(state).newsletterVintage.isChecked !== undefined) {
    return getNewsletter(state).newsletterVintage.isChecked;
  } else {
    return false;
  }
}
export const getNewsletterHomeCollection = (state: Object) => {
  if(state !== undefined && getNewsletter(state) !== undefined
     && getNewsletter(state).newsletterHomeCollection !== undefined
     && getNewsletter(state).newsletterHomeCollection.isChecked !== undefined) {
    return getNewsletter(state).newsletterHomeCollection.isChecked;
  } else {
    return false;
  }
}
