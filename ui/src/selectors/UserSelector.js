// @flow
export const getUser = (state: Object) => state.user.model;
export const getUserID = (state: Object) => getUser(state).id;
export const getUserTypeOfAccount = (state: Object) => {
  if(getUser(state) !== undefined && getUser(state).typeOfAccount !== undefined) {
    return getUser(state).typeOfAccount;
  } else {
    return '';
  }
}
export const getUserName = (state: Object) => {
  if(getUser(state) !== undefined && getUserFirstName(state) !== undefined &&
  getUserLastName(state) !== undefined) {
    return getUserFirstName(state) + ' ' + getUserLastName(state);
  } else {
    return '';
  }
}
export const getUserFirstName = (state: Object) => {
  if(getUser(state) !== undefined && getUser(state).firstName !== undefined) {
    return getUser(state).firstName;
  } else {
    return '';
  }
}
export const getUserLastName = (state: Object) => {
  if(getUser(state) !== undefined && getUser(state).lastName !== undefined) {
    return getUser(state).lastName;
  } else {
    return '';
  }
}
export const getUserTitle = (state: Object) => {
  if(getUser(state) !== undefined && getUser(state).title !== undefined) {
    return getUser(state).title;
  } else {
    return '';
  }
}
export const getUserEmail = (state: Object) => getUser(state).email;
export const getUserBDate = (state: Object) => {
  if(getUser(state) !== undefined && getUser(state).dateOfBirth !== undefined) {
    return getUser(state).dateOfBirth;
  } else {
    return '';
  }
}

export const getNewsletterFashion = (state: Object) => {
  if(getUser(state) !== undefined && getUser(state).newsletters && getUser(state).newsletters !== undefined &&
  Object.keys(getUser(state).newsletters).length !== 0 &&
  Object.keys(getUser(state).newsletters.newsletterFashion).length !== 0 &&
  getUser(state).newsletters.newsletterFashion.isChecked !== undefined) {
    return getUser(state).newsletters.newsletterFashion.isChecked;
  } else {
    return false;
  }
}

export const getNewsletterFineJewelry = (state: Object) => {
  if(getUser(state) !== undefined && getUser(state).newsletters && getUser(state).newsletters !== undefined &&
  Object.keys(getUser(state).newsletters).length !== 0 &&
  Object.keys(getUser(state).newsletters.newsletterFineJewelry).length !== 0 &&
  getUser(state).newsletters.newsletterFineJewelry.isChecked !== undefined) {
    return getUser(state).newsletters.newsletterFineJewelry.isChecked;
  } else {
    return false;
  }
}

export const getNewsletterHomeCollection = (state: Object) => {
  if(getUser(state) !== undefined && getUser(state).newsletters && getUser(state).newsletters !== undefined &&
  Object.keys(getUser(state).newsletters).length !== 0 &&
  Object.keys(getUser(state).newsletters.newsletterHomeCollection).length !== 0 &&
  getUser(state).newsletters.newsletterHomeCollection.isChecked !== undefined) {
    return getUser(state).newsletters.newsletterHomeCollection.isChecked;
  } else {
    return false;
  }
}

export const getUserAddresses = (state: Object) => {
    if(state !== undefined && getUser(state) !== undefined &&
       getUser(state).addressBook !== undefined) {
      return getUser(state).addressBook;
    } else {
      return [];
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
export const getUserAddressProvince = (state: Object, index: Number) => {
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

export const getCardWallet = (state: Object) => {
  if(state !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet !== undefined) {
       return getUser(state).cardWallet;
  } else {
       return [];
  }
}

export const getCardType = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].cardType !== undefined) {
    return getUser(state).cardWallet[index].cardType;
  } else {
    return '';
  }
}

export const getCardNumber = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].cardNumber !== undefined) {
    return getUser(state).cardWallet[index].cardNumber;
  } else {
    return '';
  }
}

export const getCardExpMonth = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].expMonth !== undefined) {
    return getUser(state).cardWallet[index].expMonth;
  } else {
    return '';
  }
}

export const getCardExpYear = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].expYear !== undefined) {
    return getUser(state).cardWallet[index].expYear;
  } else {
    return '';
  }
}

export const getBillingFirstName = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].address !== undefined &&
     getUser(state).cardWallet[index].address.firstName) {
    return getUser(state).cardWallet[index].address.firstName;
  } else {
    return '';
  }
}

export const getBillingLastName = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].address !== undefined &&
     getUser(state).cardWallet[index].address.lastName) {
    return getUser(state).cardWallet[index].address.lastName;
  } else {
    return '';
  }
}

export const getBillingAddress = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].address !== undefined &&
     getUser(state).cardWallet[index].address.address) {
    return getUser(state).cardWallet[index].address.address;
  } else {
    return '';
  }
}

export const getBillingZipCode = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].address !== undefined &&
     getUser(state).cardWallet[index].address.zipCode) {
    return getUser(state).cardWallet[index].address.zipCode;
  } else {
    return '';
  }
}

export const getBillingCity = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].address !== undefined &&
     getUser(state).cardWallet[index].address.city) {
    return getUser(state).cardWallet[index].address.city;
  } else {
    return '';
  }
}

export const getBillingProvince = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].address !== undefined &&
     getUser(state).cardWallet[index].address.state !== undefined &&
     getUser(state).cardWallet[index].address.state.content !== undefined) {
    return getUser(state).cardWallet[index].address.state.content;
  } else {
    return '';
  }
}

export const getBillingCountry = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].address !== undefined &&
     getUser(state).cardWallet[index].address.country) {
    return getUser(state).cardWallet[index].address.country;
  } else {
    return '';
  }
}

export const getBillingPrefCard = (state: Object, index: Number) => {
  if(state !== undefined && index !== undefined && getUser(state) !== undefined &&
     getUser(state).cardWallet[index] !== undefined &&
     getUser(state).cardWallet[index].prefCrdCard !== undefined &&
     getUser(state).cardWallet[index].prefCrdCard.mark !== undefined) {
    return getUser(state).cardWallet[index].prefCrdCard.mark;
  } else {
    return false;
  }
}

export const getUserShoppingBagTotal = (state: Object) => {
    if(state !== undefined && getUser(state) !== undefined &&
    getUser(state).shoppingBag !== undefined && getUser(state).shoppingBag.total !== undefined) {
      return getUser(state).shoppingBag.total;
    } else {
      return 0;
    }
}

export const getUserAddedItems = (state: Object) => {
    if(state !== undefined && getUser(state) !== undefined &&
    getUser(state).shoppingBag !== undefined) {
      if(!localStorage.shoppingID) {
        if(getUser(state).shoppingBag.id !== undefined) {
          const shoppingID = getUser(state).shoppingBag.id;
          localStorage.setItem('shoppingID', shoppingID);
        }
      }
      if(getUser(state).shoppingBag.addedItems !== undefined) {
        return getUser(state).shoppingBag.addedItems;
      } else {
        return {};
      }
    } else {
      return {};
    }
}

export const getUserOrders = (state: Object) => {
  if(state !== undefined && getUser(state) !== undefined &&
  getUser(state).orders !== undefined) {
    return getUser(state).orders;
  } else {
    return [];
  }
}

export const getUserWishlist = (state: Object) => {
  if(state !== undefined && getUser(state) !== undefined &&
  (getUser(state).wishlist !== undefined && getUser(state).wishlist.length > 0)) {
    return getUser(state).wishlist;
  } else {
    return [];
  }
}

export const getUserNotifications = (state: Object) => {
  if(state !== undefined && getUser(state) !== undefined &&
  (getUser(state).notifications !== undefined && getUser(state).notifications.length > 0)) {
    return getUser(state).notifications;
  } else {
    return [];
  }
}
