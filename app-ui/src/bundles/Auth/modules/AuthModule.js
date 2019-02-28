import { combineReducers } from 'redux';
import signUpReducer from 'bundles/Auth/modules/SignUpModule';
import toggleMaskReducer from 'bundles/Auth/modules/MaskModule';
import checkPasswordStrengthReducer from 'bundles/Auth/modules/PasswordModule';
import getIDReducer from 'bundles/Auth/modules/IDModule';
import signInReducer from 'bundles/Auth/modules/SignInModule';
import recoverPasswordReducer from 'bundles/Auth/modules/RecoverPasswordModule';
import resetPasswordReducer from 'bundles/Auth/modules/ResetPasswordModule';
import passwordSurveyReducer from 'bundles/Auth/modules/PasswordSurveyModule';
import submitPasswordSurveyReducer from 'bundles/Auth/modules/PasswordSurveyModule';
import getEmailReducer from 'bundles/Auth/modules/EmailModule';

export default combineReducers({
  signUp: signUpReducer,
  signIn: signInReducer,
  recoverPassword: recoverPasswordReducer,
  resetPassword: resetPasswordReducer,
  toggleMask: toggleMaskReducer,
  checkPasswordStrength: checkPasswordStrengthReducer,
  getID: getIDReducer,
  togglePasswdRadioBtn: passwordSurveyReducer,
  submitPasswordSurvey: submitPasswordSurveyReducer,
  getEmail: getEmailReducer,
});
