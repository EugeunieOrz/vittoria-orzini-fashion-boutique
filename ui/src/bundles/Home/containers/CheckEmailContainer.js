import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import {
  modelPath,
  checkEmail
} from 'bundles/Home/modules/CheckEmailModule';
import CheckEmail from 'bundles/Home/components/CheckEmail';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  form: state.home.checkEmail.form,
  ...state.home.checkEmail.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  checkEmail: data => dispatch(checkEmail(data)),
  componentWillUnmount: () => dispatch(actions.reset(modelPath)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(CheckEmail));
