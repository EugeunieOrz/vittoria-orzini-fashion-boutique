import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { getUserID } from 'selectors/UserSelector';
import { removeAddress } from 'bundles/Account/modules/Addresses/RemoveAddressQModule';
import { showRemoveAddressModal } from 'bundles/Account/modules/Addresses/RemoveAddressQModule';
import RemoveAddress from 'bundles/Account/components/Addresses/RemoveAddress';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  indexToRemoveAddress: state.account.showRemoveAddressModal.index,
  removeAddressAlertIsShown: state.account.showRemoveAddressModal.isShown,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch) => ({
  onShowRemoveAddressModal: index => dispatch(showRemoveAddressModal(index)),
  onRemoveAddress: (userID, indexToRemoveAddress) => dispatch(removeAddress({userID, indexToRemoveAddress})),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(RemoveAddress));
