import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { getUserID } from 'selectors/UserIDSelector';
import PasswordSurvey from 'bundles/Auth/components/PasswordSurvey';
import { submitPasswordSurvey, togglePasswdRadioBtn } from 'bundles/Auth/modules/PasswordSurveyModule';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
 const mapStateToProps = state => ({
   passwordSurvey: state.auth.togglePasswdRadioBtn.ps.passwordSurvey,
   userID: getUserID(state),
 });

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onToggleBtn: (v) => dispatch(togglePasswdRadioBtn(v)),
  onSubmit: (data) => dispatch(submitPasswordSurvey(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(PasswordSurvey));
