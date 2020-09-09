import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, subscribeToNewsletter } from 'modules/Newsletter/NewsletterModule';
import { toggleSubscribeToNewsletter } from 'modules/Newsletter/ToggleSubscribeToNewsletterModule';
import SubscribeToNewsletter from 'components/Newsletter/SubscribeToNewsletter';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state    The application state.
 * @param {Object} ownProps The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  form: state.subscribeToNewsletter.form,
  ...state.subscribeToNewsletter.request,
  newsletterOn: sessionStorage.getItem('newsletterOn'),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @param {Object} ownProps   The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  componentDidMount: () => dispatch(actions.reset(modelPath)),
  subscribeToNewsletter: data => dispatch(subscribeToNewsletter(data)),
  toggleSubscribeToNewsletter: () => dispatch(toggleSubscribeToNewsletter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(SubscribeToNewsletter));
