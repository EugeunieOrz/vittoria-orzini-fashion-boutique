import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { showRemoveAddressModal } from 'bundles/Admin/modules/RemoveAddressQModule';
import { toggleUpdate } from 'bundles/Admin/modules/DetailsUpdateModule';
import { togglePasswordForm } from 'bundles/Admin/modules/PasswordFormModule';
import { toggleAddNewAddress } from 'bundles/Admin/modules/AddNewAddressModule';
import { toggleAddressRemoved } from 'bundles/Admin/modules/AddressRemovedModule';
import { toggleEditAddress } from 'bundles/Admin/modules/EditAddressModule';
import { toggleNewAddressSaved } from 'bundles/Admin/modules/NewAddressSavedModule';
import { toggleUpdatedAddress } from 'bundles/Admin/modules/AddressUpdatedModule';
import { toggleBDate } from 'bundles/Admin/modules/BDateModule';
import { toggleEmail } from 'bundles/Admin/modules/EmailModule';
import { toggleName } from 'bundles/Admin/modules/NameModule';
import { modelPath, updateNewsletter } from 'bundles/Admin/modules/NewsletterModule';
import { selectID } from 'bundles/Admin/modules/SectionModule';
import { signOutUser } from 'modules/UserModule';
import { fetchGeolocation } from 'modules/GeolocationModule';
import { getUserFirstName, getUserName, getUserEmail } from 'selectors/UserSelector';
import { getUserBDate, getUserAddresses } from 'selectors/UserSelector';
import Dashboard from 'bundles/Admin/components/Dashboard';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state) => {
   console.log('STATE', state);
   return {
     addNewAddressIsShown: state.admin.toggleAddNewAddress.addNewAddressModal.isShown,
     addresses: getUserAddresses(state),
     bdate: getUserBDate(state),
     editAddressIsShown: state.admin.toggleEditAddress.isShown,
     editEmailIsShown: state.admin.toggleEmail.emailModal.isShown,
     editNameIsShown: state.admin.toggleName.nameModal.isShown,
     index: state.admin.toggleEditAddress.index,
     isShown: state.admin.toggleBDate.bdateModal.isShown,
     isShownRemoveAddress: state.admin.showRemoveAddressModal.isShown,
     isShownUpdated: state.admin.toggleUpdate.detailsUpdateModal.isShown,
     isShownUpdatedAddress: state.admin.toggleUpdatedAddress.addressUpdateModal.isShown,
     passwordFormIsShown: state.admin.togglePasswordForm.passwordModal.isShown,
     removedAddressMsg: state.admin.toggleAddressRemoved.addressRemovedModal.isShown,
     savedNewAddressIsShown: state.admin.toggleNewAddressSaved.newAddressSavedModal.isShown,
     section: state.admin.toggleSection.sectionID.section,
     userEmail: getUserEmail(state),
     userFirstName: getUserFirstName(state),
     userName: getUserName(state),
     form: state.admin.updateNewsletter.form,
     ...state.admin.updateNewsletter.request,
   }
 }
/* const mapStateToProps = state => ({
  userName: getUserName(state),
}); */

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch) => ({
  selectID: valueID => dispatch(selectID(valueID)),
  onSignOut: () => dispatch(signOutUser()),
  onToggleAddNewAddress: () => dispatch(toggleAddNewAddress()),
  onToggleEditAddress: index => dispatch(toggleEditAddress(index)),
  onToggleUpdatedAddress: () => dispatch(toggleUpdatedAddress()),
  onToggleBDate: () => dispatch(toggleBDate()),
  onToggleUpdate: () => dispatch(toggleUpdate()),
  onTogglePasswordForm: () => dispatch(togglePasswordForm()),
  onToggleEmail: () => dispatch(toggleEmail()),
  onToggleName: () => dispatch(toggleName()),
  onUpdateNewsletter: data => dispatch(updateNewsletter(data)),
  onToggleNewAddressSaved: () => dispatch(toggleNewAddressSaved()),
  onToggleAddressRemoved: () => dispatch(toggleAddressRemoved()),
  onShowRemoveAddressModal: index => dispatch(showRemoveAddressModal(index)),
  onFetchGeolocation: () => dispatch(fetchGeolocation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(Dashboard));
