import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { getEmail } from 'selectors/EmailSelector';
import RecoverPasswordEmailSent from 'bundles/Auth/components/RecoverPasswordEmailSent';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  email: getEmail(state),
});


/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(RecoverPasswordEmailSent));
