import { combineReducers } from 'redux';
import displaySectionReducer from 'bundles/Admin/modules/SectionModule';
import togglePasswordFormReducer from 'bundles/Admin/modules/PasswordFormModule';
import toggleUpdateReducer from 'bundles/Admin/modules/DetailsUpdateModule';
import toggleEmailReducer from 'bundles/Admin/modules/EmailModule';
import toggleBDateReducer from 'bundles/Admin/modules/BDateModule';
import toggleMaskReducer from 'bundles/Admin/modules/MaskModule';
import toggleMask2Reducer from 'bundles/Admin/modules/MaskModule2';
import toggleMask3Reducer from 'bundles/Admin/modules/MaskModule3';
import toggleNameReducer from 'bundles/Admin/modules/NameModule';
import toggleDayReducer from 'bundles/Admin/modules/DayModule';
import editEmailReducer from 'bundles/Admin/modules/EditEmailModule';
import editNameReducer from 'bundles/Admin/modules/EditNameModule';
import toggleMonthReducer from 'bundles/Admin/modules/MonthModule';
import toggleYearReducer from 'bundles/Admin/modules/YearModule';
import updateReducer from 'bundles/Admin/modules/UpdateModule';
import updateNewsletterReducer from 'bundles/Admin/modules/NewsletterModule';
import changePasswordReducer from 'bundles/Admin/modules/ChangePasswordModule';
import checkPasswordStrengthReducer from 'bundles/Admin/modules/PasswordModule';

export default combineReducers({
  changePassword: changePasswordReducer,
  checkPasswordStrength: checkPasswordStrengthReducer,
  editEmail: editEmailReducer,
  editName: editNameReducer,
  toggleBDate: toggleBDateReducer,
  toggleUpdate: toggleUpdateReducer,
  toggleEmail: toggleEmailReducer,
  toggleMask: toggleMaskReducer,
  toggleMask2: toggleMask2Reducer,
  toggleMask3: toggleMask3Reducer,
  toggleName: toggleNameReducer,
  togglePasswordForm: togglePasswordFormReducer,
  selectDay: toggleDayReducer,
  selectMonth: toggleMonthReducer,
  selectYear: toggleYearReducer,
  toggleSection: displaySectionReducer,
  update: updateReducer,
  updateNewsletter: updateNewsletterReducer,
});
