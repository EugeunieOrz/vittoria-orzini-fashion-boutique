import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { history } from 'modules/LocationModule';
import { getShoppingBag } from 'selectors/ShoppingSelector';
import BeforeCheckout from 'bundles/Home/components/BeforeCheckout';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  shoppingBag: getShoppingBag(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */

const mapDispatchToProps = dispatch => ({
  route: route => history.push(route),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(BeforeCheckout));
