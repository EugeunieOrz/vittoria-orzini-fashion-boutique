import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { getUserID } from 'selectors/UserSelector';
import { removeCard } from 'bundles/Account/modules/CreditCards/RemoveCardQModule';
import { showRemoveCardModal } from 'bundles/Account/modules/CreditCards/RemoveCardQModule';
import RemoveCard from 'bundles/Account/components/CreditCards/RemoveCard';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  indexToRemoveCard: state.account.showRemoveCardModal.index,
  removeCardAlertIsShown: state.account.showRemoveCardModal.isShown,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch) => ({
  onShowRemoveCardModal: index => dispatch(showRemoveCardModal(index)),
  onRemoveCard: (userID, indexToRemoveCard) => dispatch(removeCard({userID, indexToRemoveCard})),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(RemoveCard));
