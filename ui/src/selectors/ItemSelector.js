export const selectItems = (state: Object) => {
  const addedItems = localStorage.getItem('addedItems');
  if(addedItems) {
    return JSON.parse(addedItems);
  } else {
    return [];
  }
}

export const selectItemIDs = (state: Object) => {
  const addedItems = localStorage.getItem('addedItems');
  if(addedItems) {
    const parsed = JSON.parse(addedItems);
    var ids = [];
    for(var i = 0; i < parsed.length; i++) {
      ids.push(parsed[i].product.id);
    }
    return ids;
  } else {
    return [];
  }
}

export const selectItem = (state: Object) => {
  const addedItem = JSON.parse(localStorage.getItem('addedItem'));
  if(addedItem) {
    return addedItem;
  } else {
    return {};
  }
}

export const selectWItem = (state: Object) => {
  const wItem = JSON.parse(localStorage.getItem('wishItem'));
  if(wItem) {
    return wItem.product;
  } else {
    return {};
  }
}

export const selectWItemName = (state: Object) => {
  if(selectWItem(state) && selectWItem(state).name !== undefined) {
    return selectWItem(state).name;
  } else {
    return '';
  }
}

export const selectWItemIndex = (state: Object) => {
  if(selectWItem(state) &&
  typeof selectWItem(state).links !== 'undefined' &&
  selectWItem(state).links.length > 0 && selectWItem(state).links !== '') {
    return selectWItem(state).links[0];
  } else {
    return '';
  }
}

export const selectWItemCategory = (state: Object) => {
  if(selectWItem(state) && selectWItem(state).category !== undefined) {
    return selectWItem(state).category.toLowerCase();
  } else {
    return '';
  }
}

export const selectWItemCollectionType = (state: Object) => {
  if(selectWItem(state) && selectWItem(state).typeOfCollection !== undefined) {
    return selectWItem(state).typeOfCollection.toLowerCase();
  } else {
    return '';
  }
}

export const selectWItemDepartment = (state: Object) => {
  if(selectWItem(state) && selectWItem(state).department !== undefined) {
    return selectWItem(state).department.toLowerCase();
  } else {
    return '';
  }
}

export const selectItemName = (state: Object) => {
  if(selectItem(state) && selectItem(state).name !== undefined) {
    return selectItem(state).name;
  } else {
    return '';
  }
}

export const selectItemIndex = (state: Object) => {
  if(selectItem(state) &&
  typeof selectItem(state).links !== 'undefined' &&
  selectItem(state).links.length > 0 && selectItem(state).links !== '') {
    return selectItem(state).links[0];
  } else {
    return '';
  }
}

export const selectItemCategory = (state: Object) => {
  if(selectItem(state) && selectItem(state).category !== undefined) {
    return selectItem(state).category.toLowerCase();
  } else {
    return '';
  }
}
export const selectItemCollectionType = (state: Object) => {
  if(selectItem(state) && selectItem(state).typeOfCollection !== undefined) {
    return selectItem(state).typeOfCollection.toLowerCase();
  } else {
    return '';
  }
}
export const selectItemDepartment = (state: Object) => {
  if(selectItem(state) && selectItem(state).department !== undefined) {
    return selectItem(state).department.toLowerCase();
  } else {
    return '';
  }
}
