// @flow
import { call, put, take } from 'redux-saga/effects';
import { handleError } from 'util/Saga';
import { addProductToGuestShoppingBag } from 'modules/Product/ProductViewModule';
import { toggleAddItemToBagAlert } from 'modules/Shopping/AddItemToBagAlertModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import ShoppingAPI from 'apis/ShoppingGuestAPI';
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
export function* productToGuestShoppingBagSaga(api: ShoppingAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(addProductToGuestShoppingBag().type);
    try {
      const product = payload.product;
      localStorage.setItem('addedItem', JSON.stringify(product));
      const bag = payload.shoppingBag;
      if(bag && bag !== undefined && Object.keys(bag).length !== 0) {
        const response = yield call([api, api.addProductToShoppingBag], payload);
        const shoppingBag = response.details;
        if(shoppingBag && shoppingBag !== undefined && Object.keys(shoppingBag).length !== 0) {
          const shoppingID = shoppingBag.id;
          localStorage.setItem('shoppingID', shoppingID);
          localStorage.setItem('shoppingBag', JSON.stringify(shoppingBag));
        }
        yield put(toggleAddItemToBagAlert());
      } else {
        const uuidv1 = require('uuid/v1');
        const shoppingBagID = uuidv1();
        payload.shoppingBag = {
          id: shoppingBagID,
          addedItems: [{
            id: shoppingBagID,
            name: "name",
            description: "description",
            details: ["details"],
            composition: [{fabric: "fabric", percentage: "percentage"}],
            color: {color: "color", imgIndex: "imgIndex"},
            size: [{
              number: "number",
              quantity: 0,
              availability: "availability"
              }],
            inventory: 0,
            price: 0.0,
            currency: "currency",
            nameOfImg: 0,
            category: "category",
            subCategory: "subCategory",
            stateOfProduct: "stateOfProduct",
            department: "department",
            typeOfCollection: "typeOfCollection",
            links: ["sample link"],
            availability: "Available",
            shippingCosts: 0.0,
            total: 0.0
            }],
          total: 0.0
        };
        const response = yield call([api, api.addProductToShoppingBag], payload);
        const shoppingBag = response.details;
        if(shoppingBag && shoppingBag !== undefined && Object.keys(shoppingBag).length !== 0) {
          const shoppingID = shoppingBag.id;
          localStorage.setItem('shoppingID', shoppingID);
          localStorage.setItem('shoppingBag', JSON.stringify(shoppingBag));
        }
        yield put(toggleAddItemToBagAlert());
      }
    } catch (e) {
      yield put(showMsg("itemOutOfStockAlert2"));
      yield put(toggleMsg());
      yield call(handleError, e);
    }
  }
}

const api = new ShoppingAPI();
export default [productToGuestShoppingBagSaga, api];
