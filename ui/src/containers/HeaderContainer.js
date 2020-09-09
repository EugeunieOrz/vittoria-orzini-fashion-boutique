import { connect } from 'react-redux';
import { history } from 'modules/LocationModule';
import lifecycle from 'components/Lifecycle';
import { toggleFashionMenu } from 'modules/Menu/FashionMenuModule';
import { toggleFineJewelryMenu } from 'modules/Menu/FineJewelryMenuModule';
import { toggleHomeCollectionMenu } from 'modules/Menu/HomeCollectionMenuModule';
import { toggleMenu } from 'modules/Menu/MenuModule';
import { filterProducts } from 'modules/Search/FilterProductsModule';
import { closeSearchResults, handleSearchResult } from 'modules/Search/SearchResultsModule';
import { openSearchPage } from 'modules/Search/SearchPageModule';
import { getProducts } from 'selectors/ProductsSelector';
import { getUserID } from 'selectors/UserSelector';
import { changeLanguage } from 'modules/LanguageCountry/LanguageModule';
import { showLanguages } from 'modules/LanguageCountry/ShowLanguagesModule';
import { signOutUser } from 'modules/UserModule';
import { toggleMiniBag } from 'modules/Shopping/MiniBagModule';
import {
  openMyWishlist,
  openSignInW
} from 'modules/Wishlist/SignInWPageModule';
import i18n from 'util/i18n';
import Header from 'components/Header/Header';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */

const mapStateToProps = state => ({
  products: getProducts(state),
  filtered: state.filterResults.filteredProducts,
  language: i18n.language,
  searchResultsAreShown: state.showSearchResults.areShown,
  userID: getUserID(state),
  langListIsShown: state.showLanguages.langListIsShown,
  isHidden: state.toggleMenu.isHidden,
  fashionMenuOpened: state.toggleFashionMenu.fashionMenuOpened,
  fineJewelryMenuOpened: state.toggleFineJewelryMenu.fineJewelryMenuOpened,
  homeCollectionMenuOpened: state.toggleHomeCollectionMenu.homeCollectionMenuOpened,
  searchPageOpened: state.toggleSearchPage.searchPageOpened,
  menuIsShown: state.toggleMenu.menuIsShown,
  shippingCountryListIsShown: state.toggleShippingCountry.isShown,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  closeSearchResults: () => dispatch(closeSearchResults()),
  filterProducts: (ev, products) => dispatch(filterProducts(ev, products)),
  handleSearchResult: (products, userID) => dispatch(handleSearchResult(products, userID)),
  openSearchPage: () => dispatch(openSearchPage()),
  changeLanguage: lang => dispatch(changeLanguage(lang)),
  showLanguages: () => dispatch(showLanguages()),
  route: route => history.push(route),
  onSignOut: () => dispatch(signOutUser()),
  openMyWishlist: data => dispatch(openMyWishlist(data)),
  toggleFashionMenu: () => dispatch(toggleFashionMenu()),
  toggleFineJewelryMenu: () => dispatch(toggleFineJewelryMenu()),
  toggleHomeCollectionMenu: () => dispatch(toggleHomeCollectionMenu()),
  toggleMiniBag: () => dispatch(toggleMiniBag()),
  toggleMenu: () => dispatch(toggleMenu()),
  openSignInW: data => dispatch(openSignInW(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(Header));
