import { combineReducers } from 'redux';
import checkEmailReducer from 'bundles/Home/modules/CheckEmailModule';
import completeSignInFormReducer from 'bundles/Home/modules/CompleteSignInFormModule';
import createAccountReducer from 'bundles/Home/modules/CreateAccountModule';
import checkPasswordStrengthReducer from 'bundles/Home/modules/PasswordModule';
import toggleMaskReducer from 'bundles/Home/modules/MaskModule';

export default combineReducers({
  checkEmail: checkEmailReducer,
  checkPasswordStrength: checkPasswordStrengthReducer,
  completeSignInForm: completeSignInFormReducer,
  createAccount: createAccountReducer,
  toggleMask: toggleMaskReducer,
});
