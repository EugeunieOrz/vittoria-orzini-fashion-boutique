import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { createStore } from 'redux';
import lifecycle from 'components/Lifecycle';
import ProductPage from 'bundles/Home/components/ProductPage';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state) => {
  console.log('STATE', state);
  return {

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

});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ProductPage));
