import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { toggleMsg } from 'modules/MsgModule';
import MsgToCustomer from 'components/MsgToCustomer';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  msgIsShown: state.toggleMsg.isShown,
  message: state.toggleMsg.msg,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  toggleMsg: () => dispatch(toggleMsg()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(MsgToCustomer));
