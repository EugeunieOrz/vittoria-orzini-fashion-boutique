import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, addNewAddress } from 'bundles/Account/modules/Addresses/AddNewAddressFormModule';
import { toggleAddNewAddress } from 'bundles/Account/modules/Addresses/AddNewAddressModule';
import { getUserID } from 'selectors/UserSelector';
import AddNewAddress from 'bundles/Account/components/Addresses/AddNewAddress';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  form: state.account.addNewAddress.form,
  ...state.account.addNewAddress.request,
  formInitial: {
    firstName: '',
    lastName: '',
    additional: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    province: '',
    email: '',
    dayTelephone: '',
    eveningTelephone: '',
    defShipAddr: false,
    preferBillAddr: false,
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
    onAddNewAddress: (data) => dispatch(addNewAddress(data)),
    componentDidMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
    componentWillUnmount: () => dispatch(actions.reset(modelPath)),
    toggleAddNewAddress: () => dispatch(toggleAddNewAddress()),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(AddNewAddress));
