import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, editEmail } from 'bundles/Admin/modules/EditEmailModule';
import { toggleMask3 } from 'bundles/Admin/modules/MaskModule3';
import { getUserEmail } from 'selectors/UserSelector';
import { getUserID } from 'selectors/UserSelector';
import EditEmail from 'bundles/Admin/components/EditEmail';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  email: getUserEmail(state),
  isHidden3: state.admin.toggleMask3.mask3.isHidden3,
  form: state.admin.editEmail.form,
  ...state.admin.editEmail.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onEditEmail: (userID, data) => dispatch(editEmail({userID, data})),
  componentWillUnmount: () => dispatch(actions.reset(modelPath)),
  onToggleMask3: isHidden3 => dispatch(toggleMask3(isHidden3)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(EditEmail));
