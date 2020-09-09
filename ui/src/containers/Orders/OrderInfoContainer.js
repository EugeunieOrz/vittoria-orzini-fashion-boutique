import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, followOrder } from 'modules/Orders/OrderInfoFormModule';
import OrderInfo from 'components/Orders/OrderInfo';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  form: state.followOrder.form,
  ...state.followOrder.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  componentDidMount: () => dispatch(actions.reset(modelPath)),
  followOrder: data => dispatch(followOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(OrderInfo));
