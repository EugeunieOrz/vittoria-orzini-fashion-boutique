import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { toggleAddNewCard } from 'bundles/Account/modules/CreditCards/AddNewCardModule';
import { modelPath, addNewCard } from 'bundles/Account/modules/CreditCards/AddNewCardFormModule';
import { toggleCreditCardType } from 'bundles/Account/modules/CreditCards/CardTypeModule';
import { selectExpMonth } from 'bundles/Account/modules/CreditCards/ExpMonthModule';
import { selectExpYear } from 'bundles/Account/modules/CreditCards/ExpYearModule';
import { getUserID } from 'selectors/UserSelector';
import AddNewCard from 'bundles/Account/components/CreditCards/AddNewCard';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  cardType: state.account.toggleCreditCardType.cardType,
  month: state.account.selectExpMonth.month,
  year: state.account.selectExpYear.year,
  userID: getUserID(state),
  form: state.account.addNewCard.form,
  ...state.account.addNewCard.request,
  formInitial: {
    cardNumber: '4073642301026590',
    month: '',
    year: '',
    firstName: '',
    lastName: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    province: '',
    prefCrdCard: false,
  }
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
    addNewCard: (data) => dispatch(addNewCard(data)),
    componentDidMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
    componentWillUnmount: () => dispatch(actions.reset(modelPath)),
    onToggleBtn: (v) => dispatch(toggleCreditCardType(v)),
    onSelectExpMonth: (month) => dispatch(selectExpMonth(month)),
    onSelectExpYear: (year) => dispatch(selectExpYear(year)),
    toggleAddNewCard: () => dispatch(toggleAddNewCard()),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(AddNewCard));
