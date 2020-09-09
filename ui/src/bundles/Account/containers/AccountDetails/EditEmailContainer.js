import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, editEmail } from 'bundles/Account/modules/AccountDetails/EditEmailModule';
import { toggleEmail } from 'bundles/Account/modules/AccountDetails/EmailModule';
import { toggleMask3 } from 'bundles/Account/modules/AccountDetails/MaskModule3';
import { getUserEmail } from 'selectors/UserSelector';
import { getUserID } from 'selectors/UserSelector';
import EditEmail from 'bundles/Account/components/AccountDetails/EditEmail';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  email: getUserEmail(state),
  isHidden3: state.account.toggleMask3.isHidden3,
  form: state.account.editEmail.form,
  ...state.account.editEmail.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onEditEmail: (userID, data) => dispatch(editEmail({userID, data})),
  componentDidMount: () => dispatch(actions.reset(modelPath)),
  onToggleMask3: isHidden3 => dispatch(toggleMask3(isHidden3)),
  toggleEmail: () => dispatch(toggleEmail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(EditEmail));
