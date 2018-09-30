import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import PasswordSurvey from 'bundles/Auth/components/PasswordSurvey';
import { submitPasswordSurvey, togglePasswdRadioBtn } from 'bundles/Auth/modules/PasswordSurveyModule';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
 const mapStateToProps = (state) => {
    console.log('STATE', state);
    return {
      passwordSurvey: state.auth.togglePasswdRadioBtn.ps.passwordSurvey,
      userID: state.auth.getID.idContent.userID,
    }
  }
/*const mapStateToProps = state => ({
  isChecked: state.auth.togglePasswdRadioBtn.passwdRadioBtn.isChecked,
  userID: state.auth.getID.idContent.userID,
  form: state.auth.submitPasswordSurvey.form,
  ...state.auth.submitPasswordSurvey.request,
}); */

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
