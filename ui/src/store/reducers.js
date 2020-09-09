import { combineReducers } from 'redux';
import initReducer from 'modules/InitModule';
import locationReducer from 'modules/LocationModule';
import healthReducer from 'modules/HealthModule';
import stateReducer from 'modules/StateModule';
import userReducer from 'modules/UserModule';
import changeCSQKeyReducer from 'modules/CSQHeaderModule';
import fetchGeolocationReducer from 'modules/GeolocationModule';
import findStoreReducer from 'modules/StoreLocatorModule';
import selectCountryReducer from 'modules/CountryModule';
import selectStoreReducer from 'modules/StoreModule';
import productsReducer from 'modules/ProductsModule';
import toggleMsgReducer from 'modules/MsgModule';

import handleNFCategoriesReducer from 'modules/ItemCategories/NFCategoriesModule';
import handleRTWCategoriesReducer from 'modules/ItemCategories/RTWCategoriesModule';
import showNFCategoriesReducer from 'modules/ItemCategories/NFShowCategoriesModule';
import showRTWCategoriesReducer from 'modules/ItemCategories/RTWShowCategoriesModule';
import showCategoriesReducer from 'modules/ItemCategories/CategoriesModule';
import handleCategoryReducer from 'modules/ItemCategories/FashionCategoriesModule';
import handleSizeReducer from 'modules/ItemCategories/SizeCategoriesModule';
import showSizesReducer from 'modules/ItemCategories/SizesModule';
import handleColorReducer from 'modules/ItemCategories/ColorCategoriesModule';
import handleOrderCategoryReducer from 'modules/ItemCategories/OrderModule';
import showColorsReducer from 'modules/ItemCategories/ColorsModule';
import showOrderCategoriesReducer from 'modules/ItemCategories/OrderCategoriesModule';

import selectLanguageReducer from 'modules/LanguageCountry/LanguageModule';
import showLanguagesReducer from 'modules/LanguageCountry/ShowLanguagesModule';
import toggleShippingCountryReducer from 'modules/LanguageCountry/ShippingToModule';
import toggleAllCountriesReducer from 'modules/LanguageCountry/AllCountriesModule';
import decorateRegionLinkOnToggleReducer from 'modules/LanguageCountry/RegionLinkModule';

import toggleMenuReducer from 'modules/Menu/MenuModule';
import changeCurrentKeyReducer from 'modules/Menu/DecorateOnToggleModule';
import changeInnerCurrentKeyReducer from 'modules/Menu/InnerDecorateOnToggleModule';
import changeInnerCurrentKey2Reducer from 'modules/Menu/InnerDecorateOnToggle2Module';
import toggleFashionMenuReducer from 'modules/Menu/FashionMenuModule';
import toggleFineJewelryMenuReducer from 'modules/Menu/FineJewelryMenuModule';
import toggleHomeCollectionMenuReducer from 'modules/Menu/HomeCollectionMenuModule';
import toggleFashionMenuSMReducer from 'modules/Menu/FashionMenuSMModule';
import toggleJewelryMenuSMReducer from 'modules/Menu/JewelryMenuSMModule';
import toggleHomeMenuSMReducer from 'modules/Menu/HomeMenuSMModule';
import toggleInnerFMenuReducer from 'modules/Menu/InnerFMenuModule';

import subscribeToNewsletterReducer from 'modules/Newsletter/NewsletterModule';
import unsubscribeReducer from 'modules/Newsletter/NewsletterUnsubscribeModule';
import toggleUpdatedNewsletterReducer from 'modules/Newsletter/NewsletterUpdatedModule';
import sendNewsletterReducer from 'modules/Newsletter/NewsletterSubscriptionModule';
import toggleSubscribeToNewsletterReducer from 'modules/Newsletter/ToggleSubscribeToNewsletterModule';

import followOrderReducer from 'modules/Orders/OrderInfoFormModule';
import fillReturnFormReducer from 'modules/Orders/ReturnFormModule';
import fillReturnProductReducer from 'modules/Orders/ReturnProductModule';

import toggleZoomEffectReducer from 'modules/Product/ZoomEffectModule';
import handleImageStyleReducer from 'modules/Product/ProductViewModule';
import toggleProductLookReducer from 'modules/Product/ProductLookModule';
import selectSlideReducer from 'modules/Product/ProductSlideModule';
import selectSizeReducer from 'modules/Product/SizeModule';
import toggleShoppingBtnTitleReducer from 'modules/Product/ShoppingButtonModule';

import filterResultsReducer from 'modules/Search/FilterProductsModule';
import showSearchResultsReducer from 'modules/Search/SearchResultsModule';
import toggleSearchPageReducer from 'modules/Search/SearchPageModule';

import toggleMiniBagReducer from 'modules/Shopping/MiniBagModule';
import removeItemFromGuestBagReducer from 'modules/Shopping/RemoveItemGuestModule';
import toggleAddItemToBagAlertReducer from 'modules/Shopping/AddItemToBagAlertModule';

import signInWReducer from 'modules/Wishlist/SignInWModule';
import toggleSignInWReducer from 'modules/Wishlist/SignInWPageModule';

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    init: initReducer,
    location: locationReducer,
    health: healthReducer,
    user: userReducer,
    changeCSQKey: changeCSQKeyReducer,
    geolocation: fetchGeolocationReducer,
    findStore: findStoreReducer,
    selectCountry: selectCountryReducer,
    selectStore: selectStoreReducer,
    products: productsReducer,
    toggleMsg: toggleMsgReducer,
    handleNFCategory: handleNFCategoriesReducer,
    handleRTWCategory: handleRTWCategoriesReducer,
    showNFCategories: showNFCategoriesReducer,
    showRTWCategories: showRTWCategoriesReducer,
    showCategories: showCategoriesReducer,
    handleCategory: handleCategoryReducer,
    showSizes: showSizesReducer,
    handleSize: handleSizeReducer,
    showColors: showColorsReducer,
    handleColor: handleColorReducer,
    handleOrderCategory: handleOrderCategoryReducer,
    showOrderCategories: showOrderCategoriesReducer,
    selectLanguage: selectLanguageReducer,
    showLanguages: showLanguagesReducer,
    toggleShippingCountry: toggleShippingCountryReducer,
    toggleAllCountries: toggleAllCountriesReducer,
    decorateRegionLinkOnToggle: decorateRegionLinkOnToggleReducer,
    toggleMenu: toggleMenuReducer,
    changeCurrentKey: changeCurrentKeyReducer,
    changeInnerCurrentKey: changeInnerCurrentKeyReducer,
    changeInnerCurrentKey2: changeInnerCurrentKey2Reducer,
    toggleFashionMenu: toggleFashionMenuReducer,
    toggleFineJewelryMenu: toggleFineJewelryMenuReducer,
    toggleHomeCollectionMenu: toggleHomeCollectionMenuReducer,
    toggleFashionMenuSM: toggleFashionMenuSMReducer,
    toggleJewelryMenuSM: toggleJewelryMenuSMReducer,
    toggleHomeMenuSM: toggleHomeMenuSMReducer,
    toggleInnerFMenu: toggleInnerFMenuReducer,
    subscribeToNewsletter: subscribeToNewsletterReducer,
    unsubscribe: unsubscribeReducer,
    toggleUpdatedNewsletter: toggleUpdatedNewsletterReducer,
    newsletter: sendNewsletterReducer,
    toggleSubscribeToNewsletter: toggleSubscribeToNewsletterReducer,
    followOrder: followOrderReducer,
    fillReturnForm: fillReturnFormReducer,
    fillReturnProduct: fillReturnProductReducer,
    filterResults: filterResultsReducer,
    showSearchResults: showSearchResultsReducer,
    toggleSearchPage: toggleSearchPageReducer,
    removeItemFromGuestBag: removeItemFromGuestBagReducer,
    miniBag: toggleMiniBagReducer,
    addItemToBag: toggleAddItemToBagAlertReducer,
    handleImageStyle: handleImageStyleReducer,
    selectSize: selectSizeReducer,
    signInW: signInWReducer,
    toggleZoomEffect: toggleZoomEffectReducer,
    toggleSignInW: toggleSignInWReducer,
    toggleProductLook: toggleProductLookReducer,
    selectSlide: selectSlideReducer,
    toggleShoppingBtnTitle: toggleShoppingBtnTitleReducer,
    ...asyncReducers,
  });

  return (state, action) => appReducer(stateReducer(state, action), action);
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  const s = store;
  s.asyncReducers[key] = reducer;
  s.replaceReducer(makeRootReducer(s.asyncReducers));
};

export default makeRootReducer;
