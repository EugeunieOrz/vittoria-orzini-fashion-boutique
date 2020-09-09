import { getPathname } from 'selectors/LocationSelector';
import { getDresses, getReadyToWearProducts, getNewInFashionProducts } from 'selectors/ProductsSelector';

export const getCategories = (state: Object) => {
  const catArr1 = getPathname(state).split("/");
  catArr1.shift();
  const catArr = catArr1.map(m => m.replace(/\//g, '').replace(/-/g, " "));
  return catArr;
}

export const getCategoryLink = (state: Object) => {
  const categoryLink = localStorage.getItem('category-link');
  if(categoryLink) {
    return categoryLink;
  } else {
    return getPathname(state);
  }
}

export const getDressesCategories = (state: Object) => {
  if(typeof getDresses(state) !== 'undefined' &&
  getDresses(state).length > 0 && getDresses(state) !== '') {
    const cats = getDresses(state).map(d => d.subCategory);
    const unique = new Set(cats);
    const list = Array.from(unique);
    return list;
  } else {
    return [];
  }
}

export const getReadyToWearCategories = (state: Object) => {
  const readyToWear = getReadyToWearProducts(state);
  if(typeof readyToWear !== 'undefined' &&
  readyToWear.length > 0 && readyToWear !== '') {
    const cats = readyToWear.map(d => d.category);
    const unique = new Set(cats);
    const list = Array.from(unique);
    return list;
  } else {
    return [];
  }
}

export const getNewInFashionCategories = (state: Object) => {
  const newIn = getNewInFashionProducts(state);
  if(typeof newIn !== 'undefined' &&
  newIn.length > 0 && newIn !== '') {
    const cats = newIn.map(d => d.category);
    const unique = new Set(cats);
    const list = Array.from(unique);
    return list;
  } else {
    return [];
  }
}
