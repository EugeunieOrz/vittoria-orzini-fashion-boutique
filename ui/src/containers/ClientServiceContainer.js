import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { decorateCSQHeader } from 'modules/CSQHeaderModule';
import { proceedToReturnForm } from 'modules/Orders/ReturnFormModule';
import { getUserID } from 'selectors/UserSelector';
import ClientService from 'components/ClientService';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
 const mapStateToProps = state => ({
   csqKey: state.changeCSQKey.key,
   userID: getUserID(state),
 });

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch) => ({
  decorateCSQHeader: (data) => dispatch(decorateCSQHeader(data)),
  proceedToReturnForm: userID => dispatch(proceedToReturnForm(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ClientService));
