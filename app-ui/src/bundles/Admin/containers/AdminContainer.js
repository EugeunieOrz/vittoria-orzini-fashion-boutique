import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { toggleUpdate } from 'bundles/Admin/modules/DetailsUpdateModule';
import { togglePasswordForm } from 'bundles/Admin/modules/PasswordFormModule';
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
     bdate: getUserBDate(state),
     editEmailIsShown: state.admin.toggleEmail.emailModal.editEmailIsShown,
     editNameIsShown: state.admin.toggleName.nameModal.editNameIsShown,
     isShown: state.admin.toggleBDate.bdateModal.isShown,
     isShownUpdated: state.admin.toggleUpdate.detailsUpdateModal.isShownUpdated,
     passwordFormIsShown: state.admin.togglePasswordForm.passwordModal.passwordFormIsShown,
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
  onToggleBDate: () => dispatch(toggleBDate()),
  onToggleUpdate: () => dispatch(toggleUpdate()),
  onTogglePasswordForm: () => dispatch(togglePasswordForm()),
  onToggleEmail: () => dispatch(toggleEmail()),
  onToggleName: () => dispatch(toggleName()),
  onUpdateNewsletter: data => dispatch(updateNewsletter(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(Dashboard));
