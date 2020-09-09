import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, editAddress } from 'bundles/Account/modules/Addresses/EditAddressFormModule';
import { toggleEditAddress } from 'bundles/Account/modules/Addresses/EditAddressModule';
import { getUserID } from 'selectors/UserSelector';
import {
  getUserAddressFirstName,
  getUserAddressLastName,
  getUserAddressAdditional,
  getUserAddressBookAddress,
  getUserAddressZipCode,
  getUserAddressCity,
  getUserAddressCountry,
  getUserAddressProvince,
  getUserAddressEmail,
  getUserAddressDayTelephone,
  getUserAddressEveningTelephone,
  getUserAddressPreferredShipping,
  getUserAddressPreferredBilling } from 'selectors/UserSelector';
import EditAddress from 'bundles/Account/components/Addresses/EditAddress';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  form: state.account.editAddress.form,
  ...state.account.editAddress.request,
  index: state.account.toggleEditAddress.index,
  formInitial: {
    firstName: getUserAddressFirstName(state, state.account.toggleEditAddress.index),
    lastName: getUserAddressLastName(state, state.account.toggleEditAddress.index),
    additional: getUserAddressAdditional(state, state.account.toggleEditAddress.index),
    address: getUserAddressBookAddress(state, state.account.toggleEditAddress.index),
    zipCode: getUserAddressZipCode(state, state.account.toggleEditAddress.index),
    city: getUserAddressCity(state, state.account.toggleEditAddress.index),
    country: getUserAddressCountry(state, state.account.toggleEditAddress.index),
    province: getUserAddressProvince(state, state.account.toggleEditAddress.index),
    email: getUserAddressEmail(state, state.account.toggleEditAddress.index),
    dayTelephone: getUserAddressDayTelephone(state, state.account.toggleEditAddress.index),
    eveningTelephone: getUserAddressEveningTelephone(state, state.account.toggleEditAddress.index),
    defShipAddr: getUserAddressPreferredShipping(state, state.account.toggleEditAddress.index),
    preferBillAddr: getUserAddressPreferredBilling(state, state.account.toggleEditAddress.index),
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
    onEditAddress: (userID, index, countryByIP, data) => dispatch(editAddress({userID, index, countryByIP, data})),
    componentWillUnmount: () => dispatch(actions.change(modelPath, propsFromState.formInitial)),
    componentDidMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
    toggleEditAddress: index => dispatch(toggleEditAddress(index)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(EditAddress));
