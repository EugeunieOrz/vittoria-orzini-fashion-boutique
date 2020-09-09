import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, fillCheckoutData } from 'bundles/Account/modules/Checkout1/CheckoutFormModule';
import { selectExpMonth1 } from 'bundles/Account/modules/Checkout1/ExpMonth1Module';
import { selectExpYear1 } from 'bundles/Account/modules/Checkout1/ExpYear1Module';
import { countryByIP, getUserCountryByIPforHome } from 'selectors/GeolocationSelector';
import { getUserID } from 'selectors/UserSelector';
import Checkout1 from 'bundles/Account/components/Checkout1';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
 const mapStateToProps = state => ({
   userID: getUserID(state),
   countryByIP: getUserCountryByIPforHome(state),
   countryByIP2: countryByIP(state),
   month: state.account.selectExpMonth1.month,
   year: state.account.selectExpYear1.year,
   form: state.account.fillCheckoutData.form,
   ...state.account.fillCheckoutData.request,
   formInitial: {
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
    fillCheckoutData: data => dispatch(fillCheckoutData(data)),
    componentDidMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
    componentWillUnmount: () => dispatch(actions.reset(modelPath)),
    onSelectExpMonth1: (month) => dispatch(selectExpMonth1(month)),
    onSelectExpYear1: (year) => dispatch(selectExpYear1(year)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(Checkout1));
