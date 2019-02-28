import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { createStore } from 'redux';
import lifecycle from 'components/Lifecycle';
import { getProducts } from 'selectors/ProductsSelector';
import { switchToProductView } from 'bundles/Home/modules/ProductViewModule';
import NewIn from 'bundles/Home/components/NewIn';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state) => {
  console.log('STATE', state);
  return {
    products: getProducts(state),
  }
}
/* const mapStateToProps = state => ({
  products: getProducts(state),
}); */

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onSwitchToProductView: productID => dispatch(switchToProductView(productID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(NewIn));
