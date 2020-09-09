export const getProducts = (state: Object) => state.products.model;

export const getFashionProducts = (state: Object) => {
  if(typeof getProducts(state) !== 'undefined' &&
  getProducts(state).length > 0 && getProducts(state) !== '') {
    const fashion = getProducts(state).filter(function(product) {
      const filteredProducts = product.department.indexOf("Fashion") > -1;
      return filteredProducts;
    });
    return fashion;
  } else {
    return [];
  }
}

export const getReadyToWearProducts = (state: Object) => {
  if(typeof getFashionProducts(state) !== 'undefined' &&
  getFashionProducts(state).length > 0 && getFashionProducts(state) !== '') {
    const fashion = getFashionProducts(state).filter(function(product) {
      const filteredProducts = product.typeOfCollection.indexOf("Ready-to-Wear") > -1;
      return filteredProducts;
    });
    return fashion;
  } else {
    return [];
  }
}

export const getNewInFashionProducts = (state: Object) => {
  if(getFashionProducts(state) !== undefined && getFashionProducts(state).length > 0) {
    const newIn = getFashionProducts(state).filter(function(product) {
      const filteredProducts = product.stateOfProduct.indexOf("New Arrivals") > -1;
      return filteredProducts;
    });
    return newIn;
  } else {
    return [];
  }
}

export const getDresses = (state: Object) => {
  if(getFashionProducts(state) !== undefined && getFashionProducts(state).length > 0) {
    const dresses = getFashionProducts(state).filter(function(product) {
      const filteredProducts = product.category.indexOf("Dresses") > -1;
      return filteredProducts;
    });
    return dresses;
  } else {
    return [];
  }
}

export const getJackets = (state: Object) => {
  if(getFashionProducts(state) !== undefined && getFashionProducts(state).length > 0) {
    const newIn = getFashionProducts(state).filter(function(product) {
      const filteredProducts = product.category.indexOf("Jackets") > -1;
      return filteredProducts;
    });
    return newIn;
  } else {
    return [];
  }
}

export const getEvening = (state: Object) => {
  if(getFashionProducts(state) !== undefined && getFashionProducts(state).length > 0) {
    const newIn = getFashionProducts(state).filter(function(product) {
      const filteredProducts = product.category.indexOf("Evening") > -1;
      return filteredProducts;
    });
    return newIn;
  } else {
    return [];
  }
}

export const getImgIndex = (state: Object, id: string) => {
  if(getProducts(state) !== undefined && getProducts(state).length > 0) {
    const product = getProducts(state).find(pr => pr.id === id);
    if(product) {
      return product.links[0];
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export const getItemName = (state: Object, id: string) => {
  if(getProducts(state) !== undefined && getProducts(state).length > 0) {
    const product = getProducts(state).find(pr => pr.id === id);
    if(product) {
      return product.name;
    } else {
      return "";
    }
  } else {
    return "";
  }
}
