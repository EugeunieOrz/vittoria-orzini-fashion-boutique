import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { toggleEditCard } from 'bundles/Account/modules/CreditCards/EditCardModule';
import { modelPath, editCard } from 'bundles/Account/modules/CreditCards/EditCardFormModule';
import { selectExpMonth3 } from 'bundles/Account/modules/CreditCards/ExpMonth3Module';
import { selectExpYear3 } from 'bundles/Account/modules/CreditCards/ExpYear3Module';
import { getUserID } from 'selectors/UserSelector';
import { getCardType } from 'selectors/UserSelector';
import { getCardExpMonth } from 'selectors/UserSelector';
import { getCardExpYear } from 'selectors/UserSelector';
import { getBillingFirstName } from 'selectors/UserSelector';
import { getBillingLastName } from 'selectors/UserSelector';
import { getBillingAddress } from 'selectors/UserSelector';
import { getBillingZipCode } from 'selectors/UserSelector';
import { getBillingCity } from 'selectors/UserSelector';
import { getBillingCountry } from 'selectors/UserSelector';
import { getBillingProvince } from 'selectors/UserSelector';
import { getBillingPrefCard } from 'selectors/UserSelector';
import EditCard from 'bundles/Account/components/CreditCards/EditCard';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  cardType: getCardType(state, state.account.toggleEditCard.index),
  userID: getUserID(state),
  form: state.account.editCard.form,
  ...state.account.editCard.request,
  index: state.account.toggleEditCard.index,
  month3: state.account.selectExpMonth3.month,
  year3: state.account.selectExpYear3.year,
  formInitial: {
    cardNumber: '',
    month: getCardExpMonth(state, state.account.toggleEditCard.index),
    year: getCardExpYear(state, state.account.toggleEditCard.index),
    firstName: getBillingFirstName(state, state.account.toggleEditCard.index),
    lastName: getBillingLastName(state, state.account.toggleEditCard.index),
    address: getBillingAddress(state, state.account.toggleEditCard.index),
    zipCode: getBillingZipCode(state, state.account.toggleEditCard.index),
    city: getBillingCity(state, state.account.toggleEditCard.index),
    country: getBillingCountry(state, state.account.toggleEditCard.index),
    province: getBillingProvince(state, state.account.toggleEditCard.index),
    prefCrdCard: getBillingPrefCard(state, state.account.toggleEditCard.index),
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
    onEditCard: (data) => dispatch(editCard(data)),
    toggleEditCard: index => dispatch(toggleEditCard(index)),
    componentWillUnmount: () => dispatch(actions.change(modelPath, propsFromState.formInitial)),
    componentDidMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
    onSelectExpMonth3: (month) => dispatch(selectExpMonth3(month)),
    onSelectExpYear3: (year) => dispatch(selectExpYear3(year)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(EditCard));
