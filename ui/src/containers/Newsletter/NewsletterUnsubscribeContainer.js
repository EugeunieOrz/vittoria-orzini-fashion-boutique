import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, unsubscribe, validateNewsletterID } from 'modules/Newsletter/NewsletterUnsubscribeModule';
import NewsletterUnsubscribe from 'components/Newsletter/NewsletterUnsubscribe';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state    The application state.
 * @param {Object} ownProps The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state, ownProps) => ({
  newsletterUpdatedIsShown: state.toggleUpdatedNewsletter.isShown,
  newsletterID: ownProps.match.params.id,
  unsubscribed: localStorage.getItem("unsubscribed"),
  form: state.unsubscribe.form,
  ...state.unsubscribe.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @param {Object} ownProps   The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  unsubscribe: data => dispatch(unsubscribe(data)),
  componentWillUnmount: () => dispatch(actions.reset(modelPath)),
  componentDidMount: () => dispatch(validateNewsletterID(ownProps.match.params.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(NewsletterUnsubscribe));
