/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import togglePasswordFormReducer from 'bundles/Account/modules/AccountDetails/PasswordFormModule';
import toggleEmailReducer from 'bundles/Account/modules/AccountDetails/EmailModule';
import toggleBDateReducer from 'bundles/Account/modules/AccountDetails/BDateModule';
import toggleNameReducer from 'bundles/Account/modules/AccountDetails/NameModule';
import editEmailReducer from 'bundles/Account/modules/AccountDetails/EditEmailModule';
import editNameReducer from 'bundles/Account/modules/AccountDetails/EditNameModule';
import toggleDayReducer from 'bundles/Account/modules/AccountDetails/DayModule';
import toggleMonthReducer from 'bundles/Account/modules/AccountDetails/MonthModule';
import toggleYearReducer from 'bundles/Account/modules/AccountDetails/YearModule';
import toggleMaskReducer from 'bundles/Account/modules/AccountDetails/MaskModule';
import toggleMask2Reducer from 'bundles/Account/modules/AccountDetails/MaskModule2';
import toggleMask3Reducer from 'bundles/Account/modules/AccountDetails/MaskModule3';
import updateReducer from 'bundles/Account/modules/AccountDetails/UpdateModule';
import updateNewsletterReducer from 'bundles/Account/modules/AccountDetails/NewsletterModule';
import changePasswordReducer from 'bundles/Account/modules/AccountDetails/ChangePasswordModule';
import checkPasswordStrengthReducer from 'bundles/Account/modules/AccountDetails/PasswordModule';
import toggleClosingAccountReducer from 'bundles/Account/modules/AccountDetails/ClosingAccountModule';

import toggleExpMonthReducer from 'bundles/Account/modules/CreditCards/ExpMonthModule';
import toggleExpYearReducer from 'bundles/Account/modules/CreditCards/ExpYearModule';
import selectExpMonth3Reducer from 'bundles/Account/modules/CreditCards/ExpMonth3Module';
import selectExpYear3Reducer from 'bundles/Account/modules/CreditCards/ExpYear3Module';
import selectExpMonth2Reducer from 'bundles/Account/modules/CreditCards/ExpMonth2Module';
import selectExpYear2Reducer from 'bundles/Account/modules/CreditCards/ExpYear2Module';
import selectExpMonth4Reducer from 'bundles/Account/modules/CreditCards/ExpMonth4Module';
import selectExpYear4Reducer from 'bundles/Account/modules/CreditCards/ExpYear4Module';
import showRemoveCardModalReducer from 'bundles/Account/modules/CreditCards/RemoveCardQModule';
import removeCardReducer from 'bundles/Account/modules/CreditCards/RemoveCardQModule';
import toggleAddNewCardReducer from 'bundles/Account/modules/CreditCards/AddNewCardModule';
import toggleCreditCardTypeReducer from 'bundles/Account/modules/CreditCards/CardTypeModule';
import toggleEditCardReducer from 'bundles/Account/modules/CreditCards/EditCardModule';
import addNewCardReducer from 'bundles/Account/modules/CreditCards/AddNewCardFormModule';
import editCardReducer from 'bundles/Account/modules/CreditCards/EditCardFormModule';
import chooseCreditCardReducer from 'bundles/Account/modules/CreditCards/CreditCardModule';

import showRemoveAddressModalReducer from 'bundles/Account/modules/Addresses/RemoveAddressQModule';
import removeAddressReducer from 'bundles/Account/modules/Addresses/RemoveAddressQModule';
import toggleAddNewAddressReducer from 'bundles/Account/modules/Addresses/AddNewAddressModule';
import toggleEditAddressReducer from 'bundles/Account/modules/Addresses/EditAddressModule';
import addNewAddressReducer from 'bundles/Account/modules/Addresses/AddNewAddressFormModule';
import editAddressReducer from 'bundles/Account/modules/Addresses/EditAddressFormModule';
import toggleShippingAddressReducer from 'bundles/Account/modules/Addresses/ShippingAddressModule';

import addWItemToBagReducer from 'bundles/Account/modules/Wishlist/AddWItemToBagModule';
import toggleAddItemToWishlistAlertReducer from 'bundles/Account/modules/Wishlist/AddItemToWishlistAlertModule';
import getLastItemReducer from 'bundles/Account/modules/Wishlist/LastItemAlertModule';
import setLastItemAlertReducer from 'bundles/Account/modules/Wishlist/LastItemAlertFormModule';

import fillCheckoutDataReducer from 'bundles/Account/modules/Checkout1/CheckoutFormModule';
import selectExpMonth1Reducer from 'bundles/Account/modules/Checkout1/ExpMonth1Module';
import selectExpYear1Reducer from 'bundles/Account/modules/Checkout1/ExpYear1Module';

import selectExpMonth5Reducer from 'bundles/Account/modules/Checkout2/ExpMonth5Module';
import selectExpYear5Reducer from 'bundles/Account/modules/Checkout2/ExpYear5Module';
import fillCheckoutData2Reducer from 'bundles/Account/modules/Checkout2/CheckoutForm2Module';

import fillCheckoutData3Reducer from 'bundles/Account/modules/Checkout3/CheckoutForm3Module';
import fillCheckoutData4Reducer from 'bundles/Account/modules/Checkout4/CheckoutForm4Module';

import toggleProfileActiveKeyReducer from 'bundles/Account/modules/ProfileActiveKeyModule';

export default combineReducers({
  addWItemToBag: addWItemToBagReducer,
  changePassword: changePasswordReducer,
  checkPasswordStrength: checkPasswordStrengthReducer,
  toggleClosingAccount: toggleClosingAccountReducer,
  editEmail: editEmailReducer,
  editName: editNameReducer,
  toggleBDate: toggleBDateReducer,
  toggleEmail: toggleEmailReducer,
  toggleMask: toggleMaskReducer,
  toggleMask2: toggleMask2Reducer,
  toggleMask3: toggleMask3Reducer,
  toggleName: toggleNameReducer,
  togglePasswordForm: togglePasswordFormReducer,
  selectDay: toggleDayReducer,
  selectMonth: toggleMonthReducer,
  selectYear: toggleYearReducer,
  selectExpMonth: toggleExpMonthReducer,
  selectExpYear: toggleExpYearReducer,
  selectExpMonth1: selectExpMonth1Reducer,
  selectExpYear1: selectExpYear1Reducer,
  selectExpMonth3: selectExpMonth3Reducer,
  selectExpYear3: selectExpYear3Reducer,
  selectExpMonth2: selectExpMonth2Reducer,
  selectExpYear2: selectExpYear2Reducer,
  selectExpMonth4: selectExpMonth4Reducer,
  selectExpYear4: selectExpYear4Reducer,
  selectExpMonth5: selectExpMonth5Reducer,
  selectExpYear5: selectExpYear5Reducer,
  fillCheckoutData: fillCheckoutDataReducer,
  fillCheckoutData2: fillCheckoutData2Reducer,
  fillCheckoutData3: fillCheckoutData3Reducer,
  fillCheckoutData4: fillCheckoutData4Reducer,
  update: updateReducer,
  updateNewsletter: updateNewsletterReducer,
  removeAddress: removeAddressReducer,
  removeCard: removeCardReducer,
  showRemoveAddressModal: showRemoveAddressModalReducer,
  showRemoveCardModal: showRemoveCardModalReducer,
  addNewAddress: addNewAddressReducer,
  addNewCard: addNewCardReducer,
  editAddress: editAddressReducer,
  editCard: editCardReducer,
  toggleAddNewAddress: toggleAddNewAddressReducer,
  toggleShippingAddress: toggleShippingAddressReducer,
  toggleAddNewCard: toggleAddNewCardReducer,
  toggleCreditCardType: toggleCreditCardTypeReducer,
  toggleEditAddress: toggleEditAddressReducer,
  toggleEditCard: toggleEditCardReducer,
  chooseCreditCard: chooseCreditCardReducer,
  toggleAddItemToWishlistAlert: toggleAddItemToWishlistAlertReducer,
  toggleProfileActiveKey: toggleProfileActiveKeyReducer,
  getLastItem: getLastItemReducer,
  setLastItemAlert: setLastItemAlertReducer,
});
