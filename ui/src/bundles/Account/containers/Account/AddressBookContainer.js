/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import {
  showRemoveAddressModal
} from 'bundles/Account/modules/Addresses/RemoveAddressQModule';
import {
  toggleAddNewAddress
} from 'bundles/Account/modules/Addresses/AddNewAddressModule';
import { toggleEditAddress } from 'bundles/Account/modules/Addresses/EditAddressModule';
import { getUserAddresses } from 'selectors/UserSelector';
import AddressBook from 'bundles/Account/components/Account/AddressBook';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  addresses: getUserAddresses(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onToggleAddNewAddress: () => dispatch(toggleAddNewAddress()),
  onToggleEditAddress: index => dispatch(toggleEditAddress(index)),
  onShowRemoveAddressModal: index => dispatch(showRemoveAddressModal(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(AddressBook));
