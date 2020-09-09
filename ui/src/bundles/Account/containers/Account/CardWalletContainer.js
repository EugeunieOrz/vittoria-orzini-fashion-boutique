/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import {
  showRemoveCardModal
} from 'bundles/Account/modules/CreditCards/RemoveCardQModule';
import {
  toggleAddNewCard
} from 'bundles/Account/modules/CreditCards/AddNewCardModule';
import {
  toggleEditCard
} from 'bundles/Account/modules/CreditCards/EditCardModule';
import { getCardWallet } from 'selectors/UserSelector';
import CardWallet from 'bundles/Account/components/Account/CardWallet';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  cardWallet: getCardWallet(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onToggleAddNewCard: () => dispatch(toggleAddNewCard()),
  onToggleEditCard: index => dispatch(toggleEditCard(index)),
  onShowRemoveCardModal: index => dispatch(showRemoveCardModal(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(CardWallet));
