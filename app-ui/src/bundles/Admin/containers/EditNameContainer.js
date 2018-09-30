import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPathEditName, editName } from 'bundles/Admin/modules/EditNameModule';
import { getUserFirstName } from 'selectors/UserSelector';
import { getUserLastName } from 'selectors/UserSelector';
import { getUserTitle } from 'selectors/UserSelector';
import { getUserID } from 'selectors/UserSelector';
import EditName from 'bundles/Admin/components/EditName';

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
     formEditName: state.admin.editName.form,
     ...state.admin.editName.request,
     formEdNmInitial: {
       title: getUserTitle(state),
       firstName: getUserFirstName(state),
       lastName: getUserLastName(state),
     },
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
    onEditName: (userID, data) => dispatch(editName({userID, data})),
    componentWillUnmount: () => dispatch(actions.change(modelPathEditName, propsFromState.formEdNmInitial)),
    componentWillMount: () => dispatch(actions.merge(modelPathEditName, propsFromState.formEdNmInitial)),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(EditName));
