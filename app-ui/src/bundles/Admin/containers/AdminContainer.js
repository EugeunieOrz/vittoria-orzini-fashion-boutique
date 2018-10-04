import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { toggleUpdate } from 'bundles/Admin/modules/DetailsUpdateModule';
import { togglePasswordForm } from 'bundles/Admin/modules/PasswordFormModule';
import { toggleAddNewAddress } from 'bundles/Admin/modules/AddNewAddressModule';
import { toggleEditAddress } from 'bundles/Admin/modules/EditAddressModule';
import { toggleNewAddressSaved } from 'bundles/Admin/modules/NewAddressSavedModule';
import { toggleUpdatedAddress } from 'bundles/Admin/modules/AddressUpdatedModule';
import { toggleBDate } from 'bundles/Admin/modules/BDateModule';
import { toggleEmail } from 'bundles/Admin/modules/EmailModule';
import { toggleName } from 'bundles/Admin/modules/NameModule';
import { modelPath, updateNewsletter } from 'bundles/Admin/modules/NewsletterModule';
import { selectID } from 'bundles/Admin/modules/SectionModule';
import { signOutUser } from 'modules/UserModule';
import { getUserFirstName } from 'selectors/UserSelector';
import { getUserName } from 'selectors/UserSelector';
import { getUserEmail } from 'selectors/UserSelector';
import { getUserBDate } from 'selectors/UserSelector';
import { getUserAddresses } from 'selectors/UserSelector';
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
     isShownUpdated: state.admin.toggleUpdate.detailsUpdateModal.isShown,
     isShownUpdatedAddress: state.admin.toggleUpdatedAddress.addressUpdateModal.isShown,
     passwordFormIsShown: state.admin.togglePasswordForm.passwordModal.isShown,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(Dashboard));
