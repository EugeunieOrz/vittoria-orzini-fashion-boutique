export const getShoppingBag = () => {
  const shoppingBag = localStorage.getItem('shoppingBag');
  if(shoppingBag) {
    const shoppingB = JSON.parse(shoppingBag);
    localStorage.setItem('shoppingID', shoppingB.id);
    return shoppingB;
  } else {
    return {};
  }
}

export const getShoppingID = () => {
  const shoppingID = localStorage.getItem('shoppingID');
  if(shoppingID) {
    return shoppingID;
  } else {
    return '';
  }
}

export const selectOrderID = () => {
  const id = sessionStorage.getItem('orderID');
  if(id) {
    return id;
  } else {
    return '';
  }
}

export const selectPurchasedItems = () => {
  const items = sessionStorage.getItem('purchasedItems');
  if(items) {
    return JSON.parse(items);
  } else {
    return [];
  }
}
