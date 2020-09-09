import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { switchToProductViewFromSearch } from 'modules/ItemCategories/CategoryModule';
import { closeSearchPage } from 'modules/Search/SearchPageModule';
import { handleSearchResult } from 'modules/Search/SearchResultsModule';
import { filterProducts } from 'modules/Search/FilterProductsModule';
import { getProducts } from 'selectors/ProductsSelector';
import { getUserID } from 'selectors/UserSelector';
import SearchPage from 'components/SearchPage';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  filtered: state.filterResults.filteredProducts,
  products: getProducts(state),
  userID: getUserID(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  closeSearchPage: () => dispatch(closeSearchPage()),
  filterProducts: (ev, products) => dispatch(filterProducts(ev, products)),
  handleSearchResult: (products, userID) => dispatch(handleSearchResult(products, userID)),
  switchToProductViewFromSearch: product => dispatch(switchToProductViewFromSearch(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(SearchPage));
