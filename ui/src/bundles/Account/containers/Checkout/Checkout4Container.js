import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath4, fillCheckoutData4 } from 'bundles/Account/modules/Checkout4/CheckoutForm4Module';
import { getUserCountryByIPforHome } from 'selectors/GeolocationSelector';
import { toggleAddNewAddress } from 'bundles/Account/modules/Addresses/AddNewAddressModule';
import { toggleAddNewCard } from 'bundles/Account/modules/CreditCards/AddNewCardModule';
import { toggleShippingAddress } from 'bundles/Account/modules/Addresses/ShippingAddressModule';
import { toggleEditAddress } from 'bundles/Account/modules/Addresses/EditAddressModule';
import { toggleEditCard } from 'bundles/Account/modules/CreditCards/EditCardModule';
import { chooseCreditCard } from 'bundles/Account/modules/CreditCards/CreditCardModule';
import { getUserID, getUserAddresses, getCardWallet } from 'selectors/UserSelector';
import { countryByIP } from 'selectors/GeolocationSelector';
import Checkout4 from 'bundles/Account/components/Checkout4';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
 const mapStateToProps = state => ({
   index: state.account.toggleEditAddress.index,
   userID: getUserID(state),
   countryByIP: getUserCountryByIPforHome(state),
   countryByIP2: countryByIP(state),
   addresses: getUserAddresses(state),
   cards: getCardWallet(state),
   creditCard: state.account.chooseCreditCard.index,
   shippingAddress: state.account.toggleShippingAddress.index,
   form4: state.account.fillCheckoutData4.form4,
   ...state.account.fillCheckoutData4.request,
   formInitial: {
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
    fillCheckoutData4: data => dispatch(fillCheckoutData4(data)),
    componentDidMount: () => dispatch(actions.merge(modelPath4, propsFromState.formInitial)),
    componentWillUnmount: () => dispatch(actions.reset(modelPath4)),
    onToggleBtn: (v) => dispatch(toggleShippingAddress(v)),
    chooseCreditCard: (v) => dispatch(chooseCreditCard(v)),
    onToggleAddNewAddress: () => dispatch(toggleAddNewAddress()),
    onToggleAddNewCard: () => dispatch(toggleAddNewCard()),
    onToggleEditAddress: index => dispatch(toggleEditAddress(index)),
    onToggleEditCard: index => dispatch(toggleEditCard(index)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(Checkout4));
