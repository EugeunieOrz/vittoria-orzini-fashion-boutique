export const selectRemoveItemQArr = (state: Object) => {
  const removeItemQArr = localStorage.getItem('removeItemQArr');
  if(removeItemQArr) {
    return JSON.parse(removeItemQArr);
  } else {
    return [];
  }
}
