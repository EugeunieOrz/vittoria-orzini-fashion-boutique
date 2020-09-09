import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import {
  fillReturnProduct,
  checkItemToReturn,
  resetModelPathAndRemoveItemFromStorage
} from 'modules/Orders/ReturnProductModule';
import { getUserID } from 'selectors/UserSelector';
import ReturnProduct from 'components/Orders/ReturnProduct';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  language: state.selectLanguage.lang,
  unsettled: localStorage.getItem("unsettled"),
  userID: getUserID(state),
  itemsToReturn: JSON.parse(localStorage.getItem('itemsToReturn')),
  order: JSON.parse(localStorage.getItem('orderToReturn')),
  form: state.fillReturnProduct.form,
  ...state.fillReturnProduct.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  componentDidMount: () => dispatch(resetModelPathAndRemoveItemFromStorage()),
  checkItemToReturn: ev => dispatch(checkItemToReturn(ev)),
  fillReturnProduct: data => dispatch(fillReturnProduct(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ReturnProduct));
