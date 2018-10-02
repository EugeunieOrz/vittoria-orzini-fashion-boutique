import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, updateNewsletter } from 'bundles/Admin/modules/NewsletterModule';
import { getUserID, getNewsletterUpdates, getNewsletterFashion, getNewsletterVintage, getNewsletterHomeCollection } from 'selectors/UserSelector';
import EditNewsletter from 'bundles/Admin/components/EditNewsletter';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state) => {
   console.log('STATE', state);
   return {
     userID: getUserID(state),
     form: state.admin.updateNewsletter.form,
     ...state.admin.updateNewsletter.request,
     formInitial: {
       updates: getNewsletterUpdates(state),
       newsletterFashion: getNewsletterFashion(state),
       newsletterVintage: getNewsletterVintage(state),
       newsletterHomeCollection: getNewsletterHomeCollection(state),
     }

   }
 }
/* const mapStateToProps = state => ({
  userName: getUserName(state),
}); */

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
    onUpdateNewsletter: (userID, data) => dispatch(updateNewsletter({userID, data})),
    componentWillUnmount: () => dispatch(actions.change(modelPath, propsFromState.formInitial)),
    componentWillMount: () => dispatch(actions.merge(modelPath, propsFromState.formInitial)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(EditNewsletter));
