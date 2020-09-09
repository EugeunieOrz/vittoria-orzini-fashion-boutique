import $ from 'jquery';
import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { switchToProductView } from 'modules/ItemCategories/CategoryModule';
import { getEvening } from 'selectors/ProductsSelector';
import { getUserID } from 'selectors/UserSelector';
import Evening from 'components/ProductsPage/Fashion/Evening';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  products: getEvening(state),
  userID: getUserID(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  switchToProductView: product => dispatch(switchToProductView(product)),
  componentDidMount: () => $('#fashion-menu').addClass('fashion-menu-active'),
  componentWillUnmount: () => $('#fashion-menu').removeClass('fashion-menu-active'),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(Evening));
