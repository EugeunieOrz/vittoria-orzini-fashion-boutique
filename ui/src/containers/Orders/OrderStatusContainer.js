import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import OrderStatus from 'components/Orders/OrderStatus';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  lang: state.selectLanguage.lang,
  orderNumber: localStorage.getItem("orderNumber"),
  status: localStorage.getItem("orderStatus"),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  componentDidMount: () => localStorage.removeItem('orderToReturn'),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(OrderStatus));
