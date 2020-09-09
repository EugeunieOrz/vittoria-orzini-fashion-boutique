import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath2, fillCheckoutData2 } from 'bundles/Account/modules/Checkout2/CheckoutForm2Module';
import { getUserCountryByIPforHome } from 'selectors/GeolocationSelector';
import { toggleAddNewAddress } from 'bundles/Account/modules/Addresses/AddNewAddressModule';
import { toggleShippingAddress } from 'bundles/Account/modules/Addresses/ShippingAddressModule';
import { toggleEditAddress } from 'bundles/Account/modules/Addresses/EditAddressModule';
import { toggleCreditCardType } from 'bundles/Account/modules/CreditCards/CardTypeModule';
import { selectExpMonth5 } from 'bundles/Account/modules/Checkout2/ExpMonth5Module';
import { selectExpYear5 } from 'bundles/Account/modules/Checkout2/ExpYear5Module';
import { getUserID, getUserAddresses } from 'selectors/UserSelector';
import { countryByIP } from 'selectors/GeolocationSelector';
import Checkout2 from 'bundles/Account/components/Checkout2';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  cardType: state.account.toggleCreditCardType.cardType,
  index: state.account.toggleEditAddress.index,
  userID: getUserID(state),
  countryByIP: getUserCountryByIPforHome(state),
  countryByIP2: countryByIP(state),
  addresses: getUserAddresses(state),
  shippingAddress: state.account.toggleShippingAddress.index,
  month: state.account.selectExpMonth5.month,
  year: state.account.selectExpYear5.year,
  form2: state.account.fillCheckoutData2.form2,
  ...state.account.fillCheckoutData2.request,
  formInitial: {
    cardNumber: '4073642301026590',
    month: '',
    year: '',
    code: '987',
    name: '',
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
    fillCheckoutData2: data => dispatch(fillCheckoutData2(data)),
    componentDidMount: () => dispatch(actions.merge(modelPath2, propsFromState.formInitial)),
    componentWillUnmount: () => dispatch(actions.reset(modelPath2)),
    onToggleBtn: v => dispatch(toggleShippingAddress(v)),
    onToggleAddNewAddress: () => dispatch(toggleAddNewAddress()),
    onToggleEditAddress: index => dispatch(toggleEditAddress(index)),
    toggleCreditCardType: v => dispatch(toggleCreditCardType(v)),
    onSelectExpMonth5: (month) => dispatch(selectExpMonth5(month)),
    onSelectExpYear5: (year) => dispatch(selectExpYear5(year)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(Checkout2));
