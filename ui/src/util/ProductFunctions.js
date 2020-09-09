export const formatNum = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const checkTotal = (items: Array) => {
  var lengthArr = items.length;
  var subtotal = 0;
  for(var i = 0; i < lengthArr; i++) {
    subtotal += items[i].price * items[i].inventory;
  }
  return items[0].currency + " " + formatNum(subtotal);
}
