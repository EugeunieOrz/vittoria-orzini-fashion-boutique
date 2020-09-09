export const filterBy = (
  products: Array,
  category: string,
  size: string,
  color: string,
  order: string
) => sortBy(products, order).filter(function(product) {
  var ok = true;
  if(category !== '') {
    ok = product.subCategory === category;
  }
  if(ok && color !== '') {
    ok = product.color.color === color;
  }
  if(ok && size !== '') {
    ok = product.size.some(s => s.number === size)
  }
  if(ok && order === 'New Arrivals') {
    ok = product.stateOfProduct === order;
  }
  return ok;
});

export const filterJacketsBy = (
  products: Array,
  size: string,
  color: string,
  order: string
) => sortBy(products, order).filter(function(product) {
  var ok = true;
  if(color !== '') {
    ok = product.color.color === color;
  }
  if(ok && size !== '') {
    ok = product.size.some(s => s.number === size)
  }
  if(ok && order === 'New Arrivals') {
    ok = product.stateOfProduct === order;
  }
  return ok;
});

export const filterByCategory = (
  products: Array,
  category: string,
  size: string,
  color: string,
  order: string
) => sortBy(products, order).filter(function(product) {
  var ok = true;
  if(category !== '') {
    ok = product.category === category;
  }
  if(ok && color !== '') {
    ok = product.color.color === color;
  }
  if(ok && size !== '') {
    ok = product.size.some(s => s.number === size)
  }
  if(ok && order === 'New Arrivals') {
    ok = product.stateOfProduct === order;
  }
  return ok;
});

const sortBy = (products: Array, order: string) => {
  if(order === 'High to Low Price') {
    return products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if(order === 'Low to High Price') {
    return products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else {
    return products;
  }
}
