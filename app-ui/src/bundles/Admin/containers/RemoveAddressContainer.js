import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { getUserID } from 'selectors/UserSelector';
import { removeAddress } from 'bundles/Admin/modules/RemoveAddressQModule';
import { showRemoveAddressModal } from 'bundles/Admin/modules/RemoveAddressQModule';
import RemoveAddress from 'bundles/Admin/components/RemoveAddress';

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
     indexToRemoveAddress: state.admin.showRemoveAddressModal.index,
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
const mapDispatchToProps = (dispatch) => ({
  onShowRemoveAddressModal: index => dispatch(showRemoveAddressModal(index)),
  onRemoveAddress: (userID, indexToRemoveAddress) => dispatch(removeAddress({userID, indexToRemoveAddress})),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(RemoveAddress));
