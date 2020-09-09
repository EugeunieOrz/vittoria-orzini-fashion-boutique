import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPathEditName, editName } from 'bundles/Account/modules/AccountDetails/EditNameModule';
import { toggleName } from 'bundles/Account/modules/AccountDetails/NameModule';
import { getUserFirstName } from 'selectors/UserSelector';
import { getUserLastName } from 'selectors/UserSelector';
import { getUserTitle } from 'selectors/UserSelector';
import { getUserID } from 'selectors/UserSelector';
import EditName from 'bundles/Account/components/AccountDetails/EditName';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  formEditName: state.account.editName.form,
  ...state.account.editName.request,
  formEdNmInitial: {
    title: getUserTitle(state),
    firstName: getUserFirstName(state),
    lastName: getUserLastName(state),
  },
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
    onEditName: (userID, data) => dispatch(editName({userID, data})),
    componentWillUnmount: () => dispatch(actions.change(modelPathEditName, propsFromState.formEdNmInitial)),
    componentDidMount: () => dispatch(actions.merge(modelPathEditName, propsFromState.formEdNmInitial)),
    toggleName: () => dispatch(toggleName()),
  };
};

export default connect(mapStateToProps, null, mergeProps)(lifecycle(EditName));
