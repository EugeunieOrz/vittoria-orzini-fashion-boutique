import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, addNewAddress } from 'bundles/Admin/modules/AddNewAddressFormModule';
import { getUserID } from 'selectors/UserSelector';
import { getUserCountryByIP } from 'selectors/GeolocationSelector';
import AddNewAddress from 'bundles/Admin/components/AddNewAddress';

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
     form: state.admin.addNewAddress.form,
     ...state.admin.addNewAddress.request,
     formInitial: {
       firstName: '',
       lastName: '',
       additional: '',
       address: '',
       zipCode: '',
       city: '',
       country: getUserCountryByIP(state),
       province: '',
       email: '',
       dayTelephone: '',
       eveningTelephone: '',
       defShipAddr: false,
       preferBillAddr: false,
     }
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
    onAddNewAddress: (userID, data) => dispatch(addNewAddress({userID, data})),
    componentWillMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
    componentWillUnmount: () => dispatch(actions.reset(modelPath)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(AddNewAddress));
