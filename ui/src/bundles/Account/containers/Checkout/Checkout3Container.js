import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath3, fillCheckoutData3} from 'bundles/Account/modules/Checkout3/CheckoutForm3Module';
import { countryByIP, getUserCountryByIPforHome } from 'selectors/GeolocationSelector';
import { toggleAddNewCard } from 'bundles/Account/modules/CreditCards/AddNewCardModule';
import { toggleEditCard } from 'bundles/Account/modules/CreditCards/EditCardModule';
import { chooseCreditCard } from 'bundles/Account/modules/CreditCards/CreditCardModule';
import { getUserID, getCardWallet } from 'selectors/UserSelector';
import Checkout3 from 'bundles/Account/components/Checkout3';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
 const mapStateToProps = state => ({
   addNewCardIsShown: state.account.toggleAddNewCard.isShown,
   index: state.account.toggleEditAddress.index,
   userID: getUserID(state),
   countryByIP: getUserCountryByIPforHome(state),
   countryByIP2: countryByIP(state),
   cards: getCardWallet(state),
   creditCard: state.account.chooseCreditCard.index,
   form3: state.account.fillCheckoutData3.form3,
   ...state.account.fillCheckoutData3.request,
   formInitial3: {
     firstName: '',
     lastName: '',
     additional: '',
     address: '',
     zipCode: '',
     city: '',
     country: countryByIP(state),
     province: '',
     email: '',
     telephone: '',
     code: '987',
     name: ''
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
    fillCheckoutData3: data => dispatch(fillCheckoutData3(data)),
    componentDidMount: () => dispatch(actions.merge(modelPath3, propsFromState.formInitial3)),
    componentWillUnmount: () => dispatch(actions.reset(modelPath3)),
    chooseCreditCard: (v) => dispatch(chooseCreditCard(v)),
    onToggleAddNewCard: () => dispatch(toggleAddNewCard()),
    onToggleEditCard: index => dispatch(toggleEditCard(index)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(Checkout3));
