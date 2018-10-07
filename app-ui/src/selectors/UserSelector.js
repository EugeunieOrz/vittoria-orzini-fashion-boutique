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
export const getUserAddresses = (state: Object) => {
    if(state !== undefined && getUser(state) !== undefined &&
       getUser(state).addressBook !== undefined) {
      return getUser(state).addressBook;
    } else {
      return '';
    }
  }
export const getUserAddressFirstName = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].firstName !== undefined) {
    return getUser(state).addressBook[index].firstName;
  } else {
    return '';
  }
}

export const getUserAddressLastName = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].lastName !== undefined) {
    return getUser(state).addressBook[index].lastName;
  } else {
    return '';
  }
}
export const getUserAddressAdditional = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].addInf.descr !== undefined) {
    return getUser(state).addressBook[index].addInf.descr;
  } else {
    return '';
  }
}
export const getUserAddressBookAddress = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].address !== undefined) {
    return getUser(state).addressBook[index].address;
  } else {
    return '';
  }
}
export const getUserAddressZipCode = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].zipCode !== undefined) {
    return getUser(state).addressBook[index].zipCode;
  } else {
    return '';
  }
}
export const getUserAddressCity = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].city !== undefined) {
    return getUser(state).addressBook[index].city;
  } else {
    return '';
  }
}
export const getUserAddressCountry = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].country !== undefined) {
    return getUser(state).addressBook[index].country;
  } else {
    return '';
  }
}
export const getUserAddresszProvince = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].state !== undefined) {
    return getUser(state).addressBook[index].state;
  } else {
    return '';
  }
}
export const getUserAddressEmail = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].email !== undefined) {
    return getUser(state).addressBook[index].email;
  } else {
    return '';
  }
}
export const getUserAddressDayTelephone = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].dayTel.telephone !== undefined) {
    return getUser(state).addressBook[index].dayTel.telephone;
  } else {
    return '';
  }
}
export const getUserAddressEveningTelephone = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].eveningTel.telephone !== undefined) {
    return getUser(state).addressBook[index].eveningTel.telephone;
  } else {
    return '';
  }
}
export const getUserAddressPreferredShipping = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].mark1.checked !== undefined) {
    return getUser(state).addressBook[index].mark1.checked;
  } else {
    return false;
  }
}
export const getUserAddressPreferredBilling = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).addressBook[index] !== undefined &&
     getUser(state).addressBook[index].mark2.checked !== undefined) {
    return getUser(state).addressBook[index].mark2.checked;
  } else {
    return false;
  }
}
