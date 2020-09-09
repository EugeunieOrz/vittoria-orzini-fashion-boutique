import { all } from 'redux-saga/effects';
import { combineSagas } from 'util/Saga';

import updateBDateSagaBinding from 'bundles/Account/sagas/AccountDetails/UpdateBDateSaga';
import updateNewsletterSagaBinding from 'bundles/Account/sagas/AccountDetails/UpdateNewsletterSaga';
import editNameSagaBinding from 'bundles/Account/sagas/AccountDetails/EditNameSaga';
import editEmailSagaBinding from 'bundles/Account/sagas/AccountDetails/EditEmailSaga';
import changePasswordSagaBinding from 'bundles/Account/sagas/AccountDetails/ChangePasswordSaga';
import removeAccountSagaBinding from 'bundles/Account/sagas/AccountDetails/RemoveAccountSaga';

import addNewAddressSagaBinding from 'bundles/Account/sagas/Addresses/AddNewAddressSaga';
import editAddressSagaBinding from 'bundles/Account/sagas/Addresses/EditAddressSaga';
import removeAddressSagaBinding from 'bundles/Account/sagas/Addresses/RemoveAddressSaga';

import productToCheckoutSagaBinding from 'bundles/Account/sagas/Checkout/ProductToCheckoutSaga';
import productToCheckout2SagaBinding from 'bundles/Account/sagas/Checkout/ProductToCheckout2Saga';
import productToCheckout3SagaBinding from 'bundles/Account/sagas/Checkout/ProductToCheckout3Saga';
import productToCheckout4SagaBinding from 'bundles/Account/sagas/Checkout/ProductToCheckout4Saga';

import addNewCardSagaBinding from 'bundles/Account/sagas/CreditCards/AddNewCardSaga';
import editCardSagaBinding from 'bundles/Account/sagas/CreditCards/EditCardSaga';
import removeCardSagaBinding from 'bundles/Account/sagas/CreditCards/RemoveCardSaga';

import removeItemFromBagSagaBinding from 'bundles/Account/sagas/Shopping/RemoveItemFromBagSaga';
import wItemToBagSagaBinding from 'bundles/Account/sagas/Shopping/WItemToBagSaga';

import lastItemAlertSagaBinding from 'bundles/Account/sagas/Wishlist/LastItemAlertSaga';
import proceedToWishlistSagaBinding from 'bundles/Account/sagas/Wishlist/ProceedToWishlistSaga';
import productToWishlistSagaBinding from 'bundles/Account/sagas/Wishlist/ProductToWishlistSaga';
import removeItemFromWishlistSagaBinding from 'bundles/Account/sagas/Wishlist/RemoveItemFromWishlistSaga';

export default function* accountSaga() {
  yield all(combineSagas([
    updateBDateSagaBinding,
    updateNewsletterSagaBinding,
    editNameSagaBinding,
    editEmailSagaBinding,
    changePasswordSagaBinding,
    removeAddressSagaBinding,
    removeCardSagaBinding,
    addNewAddressSagaBinding,
    addNewCardSagaBinding,
    editAddressSagaBinding,
    editCardSagaBinding,
    removeAccountSagaBinding,
    productToWishlistSagaBinding,
    removeItemFromWishlistSagaBinding,
    lastItemAlertSagaBinding,
    proceedToWishlistSagaBinding,
    removeItemFromBagSagaBinding,
    wItemToBagSagaBinding,
    productToCheckoutSagaBinding,
    productToCheckout2SagaBinding,
    productToCheckout3SagaBinding,
    productToCheckout4SagaBinding,
  ]));
}
