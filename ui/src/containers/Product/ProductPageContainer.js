import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { addProductToWishlist } from 'bundles/Account/modules/Wishlist/AddItemToWishlistAlertModule';
import { selectFashionCategory } from 'modules/ItemCategories/CategoryModule';
import {
  addProductToShoppingBag,
  addProductToGuestShoppingBag
} from 'modules/Product/ProductViewModule';
import { selectSize, clearSize } from 'modules/Product/SizeModule';
import { selectSlide } from 'modules/Product/ProductSlideModule';
import {
  toggleShoppingBtnTitle,
  getBackShoppingBtnTitle
} from 'modules/Product/ShoppingButtonModule';
import { viewProductLook } from 'modules/Product/ProductLookModule';
import { openMsg } from 'modules/MsgModule';
import { openSignInW } from 'modules/Wishlist/SignInWPageModule';
import { proceedToReturnForm } from 'modules/Orders/ReturnFormModule';
import { getShoppingBag } from 'selectors/ShoppingSelector';
import { getProducts } from 'selectors/ProductsSelector';
import { getUserID, getUserWishlist } from 'selectors/UserSelector';
import ProductPage from 'components/Product/ProductPage';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @param {Object} ownProps The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state, ownProps) => ({
  signInWIsShown: state.toggleSignInW.signInWIsShown,
  userID: getUserID(state),
  productID: ownProps.match.params.productID,
  product: getProducts(state).find(p => p.id === ownProps.match.params.productID),
  productLookIsShown: state.toggleProductLook.isShown,
  size: state.selectSize.size,
  selectedIndex: state.selectSlide.index,
  shoppingBag: getShoppingBag(state),
  shoppingTitle: state.toggleShoppingBtnTitle.title,
  menuIsShown: state.toggleMenu.menuIsShown,
  wishlist: getUserWishlist(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  addProductToShoppingBag: product => dispatch(addProductToShoppingBag(product)),
  addProductToGuestShoppingBag: product => dispatch(addProductToGuestShoppingBag(product)),
  addProductToWishlist: product => dispatch(addProductToWishlist(product)),
  componentDidMount: () => dispatch(clearSize()),
  selectFashionCategory: category => dispatch(selectFashionCategory(category)),
  selectSize: size => dispatch(selectSize(size)),
  selectSlide: data => dispatch(selectSlide(data)),
  toggleShoppingBtnTitle: () => dispatch(toggleShoppingBtnTitle()),
  getBackShoppingBtnTitle: () => dispatch(getBackShoppingBtnTitle()),
  viewProductLook: product => dispatch(viewProductLook(product)),
  openSignInW: data => dispatch(openSignInW(data)),
  openMsg: () => dispatch(openMsg()),
  proceedToReturnForm: userID => dispatch(proceedToReturnForm(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ProductPage));
