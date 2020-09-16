import { all } from 'redux-saga/effects';
import { combineSagas } from 'util/Saga';
import healthSagaBinding from 'sagas/HealthSaga';
import userSagaBinding from 'sagas/UserSaga';
import selectLanguageSagaBinding from 'sagas/SelectLanguageSaga';
import productsSagaBinding from 'sagas/ProductsSaga';
import productViewSagaBinding from 'sagas/ProductViewSaga';
import clientServicePageSagaBinding from 'sagas/ClientServicePageSaga';
import clientServiceKeySagaBinding from 'sagas/ClientServiceKeySaga';
import storeLocatorPageSagaBinding from 'sagas/StoreLocatorPageSaga';
import resetModelPathAndRemoveItemFromStorageSagaBinding from 'sagas/ResetModelPathAndRemoveItemFromStorageSaga';
import msgToCustomerSagaBinding from 'sagas/MsgToCustomerSaga';

import colorFilterSagaBinding from 'sagas/Filters/ColorFilterSaga';
import orderFilterSagaBinding from 'sagas/Filters/OrderFilterSaga';
import sizeFilterSagaBinding from 'sagas/Filters/SizeFilterSaga';
import dressFilterSagaBinding from 'sagas/Filters/DressFilterSaga';
import newInFilterSagaBinding from 'sagas/Filters/NewInFilterSaga';
import rtwFilterSagaBinding from 'sagas/Filters/RTWFilterSaga';

import filterResultsSagaBinding from 'sagas/HomePage/FilterResultsSaga';
import fashionCategorySagaBinding from 'sagas/HomePage/FashionCategorySaga';
import searchResultsSagaBinding from 'sagas/HomePage/SearchResultsSaga';

import shippingToSagaBinding from 'sagas/LanguageCountry/ShippingToSaga';
import shippingCountryListSagaBinding from 'sagas/LanguageCountry/ShippingCountryListSaga';
import decorateRegionLinkOnToggleSagaBinding from 'sagas/LanguageCountry/RegionLinkSaga';

import toggleFashionMenuSagaBinding from 'sagas/Menu/FashionMenuSaga';
import toggleFineJewelryMenuSagaBinding from 'sagas/Menu/FineJewelryMenuSaga';
import toggleHomeCollectionMenuSagaBinding from 'sagas/Menu/HomeCollectionMenuSaga';
import toggleMenuContentSagaBinding from 'sagas/Menu/MenuContentSaga';
import toggleInnerMenuContentSagaBinding from 'sagas/Menu/InnerMenuContentSaga';
import toggleInnerMenuContent2SagaBinding from 'sagas/Menu/InnerMenuContent2Saga';

import removeItemFromGuestShoppingBagBinding from 'sagas/Shopping/RemoveItemFromGuestShoppingBagSaga';
import editQtyInShoppingBagSagaBinding from 'sagas/Shopping/EditQtyInShoppingBagSaga';
import editSizeInShoppingBagSagaBinding from 'sagas/Shopping/EditSizeInShoppingBagSaga';
import closeMiniBagEtcSagaBinding from 'sagas/Shopping/CloseMiniBagEtcSaga';

import subscribeToNewsletterSagaBinding from 'sagas/Newsletter/SubscribeToNewsletterSaga';
import unsubscribeFromNewsletterSagaBinding from 'sagas/Newsletter/UnsubscribeFromNewsletterSaga';
import newsletterSubscriptionSagaBinding from 'sagas/Newsletter/NewsletterSubscriptionSaga';

import followOrderSagaBinding from 'sagas/Orders/FollowOrderSaga';
import returnFormSagaBinding from 'sagas/Orders/ReturnFormSaga';
import checkItemToReturnSagaBinding from 'sagas/Orders/CheckItemToReturnSaga';
import returnProductSagaBinding from 'sagas/Orders/ReturnProductSaga';
import proceedToReturnFormSagaBinding from 'sagas/Orders/ProceedToReturnFormSaga';

import productToShoppingBagSagaBinding from 'sagas/Product/ProductToShoppingBagSaga';
import productToGuestShoppingBagSagaBinding from 'sagas/Product/ProductToGuestShoppingBagSaga';
import productLookSagaBinding from 'sagas/Product/ProductLookSaga';
import zoomImageSagaBinding from 'sagas/Product/ZoomImageSaga';

import signInWSagaBinding from 'sagas/Wishlist/SignInWSaga';
import signInWPageSagaBinding from 'sagas/Wishlist/SignInWPageSaga';
import openMyWishlistSagaBinding from 'sagas/Wishlist/OpenMyWishlistSaga';
import { sagaMiddleware } from './middleware';

export function* rootSaga() {
  yield all(combineSagas([
    healthSagaBinding,
    userSagaBinding,
    selectLanguageSagaBinding,
    toggleMenuContentSagaBinding,
    toggleInnerMenuContentSagaBinding,
    toggleInnerMenuContent2SagaBinding,
    productsSagaBinding,
    productViewSagaBinding,
    clientServicePageSagaBinding,
    clientServiceKeySagaBinding,
    storeLocatorPageSagaBinding,
    resetModelPathAndRemoveItemFromStorageSagaBinding,
    msgToCustomerSagaBinding,
    colorFilterSagaBinding,
    orderFilterSagaBinding,
    sizeFilterSagaBinding,
    dressFilterSagaBinding,
    newInFilterSagaBinding,
    rtwFilterSagaBinding,
    filterResultsSagaBinding,
    fashionCategorySagaBinding,
    searchResultsSagaBinding,
    shippingToSagaBinding,
    shippingCountryListSagaBinding,
    decorateRegionLinkOnToggleSagaBinding,
    toggleFashionMenuSagaBinding,
    toggleFineJewelryMenuSagaBinding,
    toggleHomeCollectionMenuSagaBinding,
    removeItemFromGuestShoppingBagBinding,
    subscribeToNewsletterSagaBinding,
    unsubscribeFromNewsletterSagaBinding,
    newsletterSubscriptionSagaBinding,
    followOrderSagaBinding,
    returnFormSagaBinding,
    checkItemToReturnSagaBinding,
    returnProductSagaBinding,
    proceedToReturnFormSagaBinding,
    editQtyInShoppingBagSagaBinding,
    editSizeInShoppingBagSagaBinding,
    closeMiniBagEtcSagaBinding,
    productToShoppingBagSagaBinding,
    productToGuestShoppingBagSagaBinding,
    signInWSagaBinding,
    zoomImageSagaBinding,
    signInWPageSagaBinding,
    openMyWishlistSagaBinding,
    productLookSagaBinding,
  ]));
}

export const injectSaga = (store, { key, saga }) => {
  if (Object.hasOwnProperty.call(store.asyncSagas, key)) return;

  const s = store;
  s.asyncSagas[key] = saga;
  sagaMiddleware.run(s.asyncSagas[key]);
};
