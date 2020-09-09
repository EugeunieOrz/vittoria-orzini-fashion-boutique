import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, fillReturnForm } from 'modules/Orders/ReturnFormModule';
import { getUserID } from 'selectors/UserSelector';
import ReturnForm from 'components/Orders/ReturnForm';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  form: state.fillReturnForm.form,
  ...state.fillReturnForm.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  componentDidMount: () => dispatch(actions.reset(modelPath)),
  fillReturnForm: data => dispatch(fillReturnForm(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ReturnForm));
