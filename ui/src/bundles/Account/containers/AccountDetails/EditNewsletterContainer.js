import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, updateNewsletter } from 'bundles/Account/modules/AccountDetails/NewsletterModule';
import {
  getUserID,
  getNewsletterFashion,
  getNewsletterFineJewelry,
  getNewsletterHomeCollection } from 'selectors/UserSelector';
import EditNewsletter from 'bundles/Account/components/AccountDetails/EditNewsletter';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  form: state.account.updateNewsletter.form,
  ...state.account.updateNewsletter.request,
  formInitial: {
    newsletterFashion: getNewsletterFashion(state),
    newsletterFineJewelry: getNewsletterFineJewelry(state),
    newsletterHomeCollection: getNewsletterHomeCollection(state),
  }
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */

const mergeProps = (propsFromState, propsFromDispatch) => {

  const { dispatch } = propsFromDispatch;

  return {
    ...propsFromState,
    onUpdateNewsletter: (userID, data) => dispatch(updateNewsletter({userID, data})),
    componentWillUnmount: () => dispatch(actions.change(modelPath, propsFromState.formInitial)),
    componentDidMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(EditNewsletter));
