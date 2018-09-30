import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { selectDay } from 'bundles/Admin/modules/DayModule';
import { selectMonth } from 'bundles/Admin/modules/MonthModule';
import { selectYear } from 'bundles/Admin/modules/YearModule';
import { modelPath, update } from 'bundles/Admin/modules/UpdateModule';
import { getUserID } from 'selectors/UserSelector';
import EditBDate from 'bundles/Admin/components/EditBDate';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state) => {
   console.log('STATE', state);
   return {
     userID: getUserID(state),
     month: state.admin.selectMonth.monthName.month,
     year: state.admin.selectYear.yearNum.year,
     day: state.admin.selectDay.dayNum.day,
     form: state.admin.update.form,
     ...state.admin.update.request,
     formInitial: {
       day: state.admin.selectDay.dayNum.day,
       month: state.admin.selectMonth.monthName.month,
       year: state.admin.selectYear.yearNum.year,
     },
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

const mergeProps = (propsFromState, propsFromDispatch) => {
  console.log("propsFromState: ", propsFromState);

  const { dispatch } = propsFromDispatch;

  return {
    ...propsFromState,
    onSelectDay: (day) => dispatch(selectDay(day)),
    onSelectMonth: (month) => dispatch(selectMonth(month)),
    onSelectYear: (year) => dispatch(selectYear(year)),
    onUpdate: (userID, data) => dispatch(update({userID, data})),
    componentWillUnmount: () => dispatch(actions.change(modelPath, propsFromState.formInitial)),
    componentWillMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(EditBDate));
