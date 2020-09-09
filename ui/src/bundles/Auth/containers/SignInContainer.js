import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { history } from 'modules/LocationModule';
import lifecycle from 'components/Lifecycle';
import { modelPath, signIn } from 'bundles/Auth/modules/SignInModule';
import { getShoppingBag } from 'selectors/ShoppingSelector';
import SignIn from 'bundles/Auth/components/SignIn';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  shoppingBag: getShoppingBag(state),
  form: state.auth.signIn.form,
  ...state.auth.signIn.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onSignIn: data => dispatch(signIn(data)),
  componentWillUnmount: () => dispatch(actions.reset(modelPath)),
  route: route => history.push(route),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(SignIn));
