import { combineReducers } from 'redux';
import displaySectionReducer from 'bundles/Admin/modules/SectionModule';
import showRemoveAddressModalReducer from 'bundles/Admin/modules/RemoveAddressQModule';
import removeAddressReducer from 'bundles/Admin/modules/RemoveAddressQModule';
import toggleAddressRemovedReducer from 'bundles/Admin/modules/AddressRemovedModule';
import togglePasswordFormReducer from 'bundles/Admin/modules/PasswordFormModule';
import toggleUpdateReducer from 'bundles/Admin/modules/DetailsUpdateModule';
import toggleAddressUpdateReducer from 'bundles/Admin/modules/AddressUpdatedModule';
import toggleEmailReducer from 'bundles/Admin/modules/EmailModule';
import toggleAddNewAddressReducer from 'bundles/Admin/modules/AddNewAddressModule';
import toggleEditAddressReducer from 'bundles/Admin/modules/EditAddressModule';
import toggleNewAddressSavedReducer from 'bundles/Admin/modules/NewAddressSavedModule';
import addNewAddressReducer from 'bundles/Admin/modules/AddNewAddressFormModule';
import toggleBDateReducer from 'bundles/Admin/modules/BDateModule';
import toggleMaskReducer from 'bundles/Admin/modules/MaskModule';
import toggleMask2Reducer from 'bundles/Admin/modules/MaskModule2';
import toggleMask3Reducer from 'bundles/Admin/modules/MaskModule3';
import toggleNameReducer from 'bundles/Admin/modules/NameModule';
import toggleDayReducer from 'bundles/Admin/modules/DayModule';
import editEmailReducer from 'bundles/Admin/modules/EditEmailModule';
import editNameReducer from 'bundles/Admin/modules/EditNameModule';
import editAddressReducer from 'bundles/Admin/modules/EditAddressFormModule';
import toggleMonthReducer from 'bundles/Admin/modules/MonthModule';
import toggleYearReducer from 'bundles/Admin/modules/YearModule';
import updateReducer from 'bundles/Admin/modules/UpdateModule';
import updateNewsletterReducer from 'bundles/Admin/modules/NewsletterModule';
import changePasswordReducer from 'bundles/Admin/modules/ChangePasswordModule';
import checkPasswordStrengthReducer from 'bundles/Admin/modules/PasswordModule';

export default combineReducers({
  addNewAddress: addNewAddressReducer,
  changePassword: changePasswordReducer,
  checkPasswordStrength: checkPasswordStrengthReducer,
  editAddress: editAddressReducer,
  editEmail: editEmailReducer,
  editName: editNameReducer,
  removeAddress: removeAddressReducer,
  showRemoveAddressModal: showRemoveAddressModalReducer,
  toggleAddressRemoved: toggleAddressRemovedReducer,
  toggleAddNewAddress: toggleAddNewAddressReducer,
  toggleEditAddress: toggleEditAddressReducer,
  toggleUpdatedAddress: toggleAddressUpdateReducer,
  toggleBDate: toggleBDateReducer,
  toggleUpdate: toggleUpdateReducer,
  toggleEmail: toggleEmailReducer,
  toggleMask: toggleMaskReducer,
  toggleMask2: toggleMask2Reducer,
  toggleMask3: toggleMask3Reducer,
  toggleName: toggleNameReducer,
  togglePasswordForm: togglePasswordFormReducer,
  toggleNewAddressSaved: toggleNewAddressSavedReducer,
  selectDay: toggleDayReducer,
  selectMonth: toggleMonthReducer,
  selectYear: toggleYearReducer,
  toggleSection: displaySectionReducer,
  update: updateReducer,
  updateNewsletter: updateNewsletterReducer,
});
