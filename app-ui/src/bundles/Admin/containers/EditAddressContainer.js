import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, editAddress } from 'bundles/Admin/modules/EditAddressFormModule';
import { getUserCountryByIP } from 'selectors/GeolocationSelector';
import { getUserID } from 'selectors/UserSelector';
import { getUserAddressFirstName } from 'selectors/UserSelector';
import { getUserAddressLastName } from 'selectors/UserSelector';
import { getUserAddressAdditional } from 'selectors/UserSelector';
import { getUserAddressBookAddress } from 'selectors/UserSelector';
import { getUserAddressZipCode } from 'selectors/UserSelector';
import { getUserAddressCity } from 'selectors/UserSelector';
import { getUserAddressCountry } from 'selectors/UserSelector';
import { getUserAddresszProvince } from 'selectors/UserSelector';
import { getUserAddressEmail } from 'selectors/UserSelector';
import { getUserAddressDayTelephone } from 'selectors/UserSelector';
import { getUserAddressEveningTelephone } from 'selectors/UserSelector';
import { getUserAddressPreferredShipping } from 'selectors/UserSelector';
import { getUserAddressPreferredBilling } from 'selectors/UserSelector';
import EditAddress from 'bundles/Admin/components/EditAddress';

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
     countryByIP: getUserCountryByIP(state),
     form: state.admin.editAddress.form,
     ...state.admin.editAddress.request,
     index: state.admin.toggleEditAddress.index,
     formInitial: {
       firstName: getUserAddressFirstName(state, state.admin.toggleEditAddress.index),
       lastName: getUserAddressLastName(state, state.admin.toggleEditAddress.index),
       additional: getUserAddressAdditional(state, state.admin.toggleEditAddress.index),
       address: getUserAddressBookAddress(state, state.admin.toggleEditAddress.index),
       zipCode: getUserAddressZipCode(state, state.admin.toggleEditAddress.index),
       city: getUserAddressCity(state, state.admin.toggleEditAddress.index),
       country: getUserAddressCountry(state, state.admin.toggleEditAddress.index),
       province: getUserAddresszProvince(state, state.admin.toggleEditAddress.index),
       email: getUserAddressEmail(state, state.admin.toggleEditAddress.index),
       dayTelephone: getUserAddressDayTelephone(state, state.admin.toggleEditAddress.index),
       eveningTelephone: getUserAddressEveningTelephone(state, state.admin.toggleEditAddress.index),
       defShipAddr: getUserAddressPreferredShipping(state, state.admin.toggleEditAddress.index),
       preferBillAddr: getUserAddressPreferredBilling(state, state.admin.toggleEditAddress.index),
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
    onEditAddress: (userID, index, countryByIP, data) => dispatch(editAddress({userID, index, countryByIP, data})),
    componentWillUnmount: () => dispatch(actions.change(modelPath, propsFromState.formInitial)),
    componentWillMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(EditAddress));
