import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { getShoppingBag } from 'selectors/ShoppingSelector';
import { modelPath, createAccount } from 'bundles/Home/modules/CreateAccountModule';
import { toggleMask } from 'bundles/Home/modules/MaskModule';
import { checkPasswordStrength } from 'bundles/Home/modules/PasswordModule';
import { getCustomerEmail } from 'selectors/EmailSelector';
import CreateAccount from 'bundles/Home/components/CreateAccount';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  form: state.home.createAccount.form,
  ...state.home.createAccount.request,
  score: state.home.checkPasswordStrength.score,
  shoppingBag: getShoppingBag(state),
  isHidden: state.home.toggleMask.isHidden,
  lang: state.selectLanguage.lang,
  formInitial: {
    title: '',
    firstName: '',
    lastName: '',
    email: getCustomerEmail(),
    password: ''
  }
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */

const mergeProps = (propsFromState, propsFromDispatch) => {
  console.log("propsFromState: ", propsFromState);

  const { dispatch } = propsFromDispatch;

  return {
    ...propsFromState,
    onCheckPasswordStrength: password => dispatch(checkPasswordStrength(password)),
    onToggleMask: isHidden => dispatch(toggleMask(isHidden)),
    createAccount: data => dispatch(createAccount(data)),
    componentWillUnmount: () => dispatch(actions.change(modelPath, propsFromState.formInitial)),
    componentDidMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(CreateAccount));
