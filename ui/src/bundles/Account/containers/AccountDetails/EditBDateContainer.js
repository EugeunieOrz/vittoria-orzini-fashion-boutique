import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { toggleBDate } from 'bundles/Account/modules/AccountDetails/BDateModule';
import { selectDay } from 'bundles/Account/modules/AccountDetails/DayModule';
import { selectMonth } from 'bundles/Account/modules/AccountDetails/MonthModule';
import { selectYear } from 'bundles/Account/modules/AccountDetails/YearModule';
import { modelPath, update } from 'bundles/Account/modules/AccountDetails/UpdateModule';
import { getUserID } from 'selectors/UserSelector';
import EditBDate from 'bundles/Account/components/AccountDetails/EditBDate';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  month: state.account.selectMonth.month,
  year: state.account.selectYear.year,
  day: state.account.selectDay.day,
  form: state.account.update.form,
  ...state.account.update.request,
  formInitial: {
    day: state.account.selectDay.day,
    month: state.account.selectMonth.month,
    year: state.account.selectYear.year,
  },
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */

const mergeProps = (propsFromState, propsFromDispatch) => {

  const { dispatch } = propsFromDispatch;

  return {
    ...propsFromState,
    onSelectDay: (day) => dispatch(selectDay(day)),
    onSelectMonth: (month) => dispatch(selectMonth(month)),
    onSelectYear: (year) => dispatch(selectYear(year)),
    onUpdate: (userID, data) => dispatch(update({userID, data})),
    componentDidMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
    toggleBDate: () => dispatch(toggleBDate()),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(EditBDate));
