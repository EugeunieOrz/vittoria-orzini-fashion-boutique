import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import {
  openClientServicePage,
  openStoreLocatorPage,
  toggleMenu
} from 'modules/Menu/MenuModule';
import { chooseShippingCountry } from 'modules/LanguageCountry/ShippingToModule';
import { showLanguages } from 'modules/LanguageCountry/ShowLanguagesModule';
import { toggleShippingCountryList } from 'modules/LanguageCountry/ShippingToModule';
import { toggleSubscribeToNewsletter } from 'modules/Newsletter/ToggleSubscribeToNewsletterModule';
import { toggleFashionMenuSM } from 'modules/Menu/FashionMenuSMModule';
import { toggleJewelryMenuSM } from 'modules/Menu/JewelryMenuSMModule';
import { toggleHomeMenuSM } from 'modules/Menu/HomeMenuSMModule';
import { toggleInnerFMenu } from 'modules/Menu/InnerFMenuModule';
import { decorateOnToggle } from 'modules/Menu/DecorateOnToggleModule';
import { innerDecorateOnToggle } from 'modules/Menu/InnerDecorateOnToggleModule';
import { innerDecorateOnToggle2 } from 'modules/Menu/InnerDecorateOnToggle2Module';
import { changeLanguage } from 'modules/LanguageCountry/LanguageModule';
import { selectFashionCategory } from 'modules/ItemCategories/CategoryModule';
import { proceedToMyAccount } from 'modules/UserModule';
import {
  openMyWishlist,
  openSignInW
} from 'modules/Wishlist/SignInWPageModule';
import { getCountryByIP } from 'selectors/GeolocationSelector';
import { getUserID } from 'selectors/UserSelector';
import i18n from 'util/i18n';
import Menu from 'components/Menu';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  country: getCountryByIP(state),
  language: i18n.language,
  langListIsShown: state.showLanguages.langListIsShown,
  fashionMenuIsShown: state.toggleFashionMenuSM.isShown,
  jewelryMenuIsShown: state.toggleJewelryMenuSM.isShown,
  homeMenuIsShown: state.toggleHomeMenuSM.isShown,
  innerFMenuIsShown: state.toggleInnerFMenu.isShown,
  currentKey: state.changeCurrentKey.currentKey,
  currentInnerKey: state.changeInnerCurrentKey.currentKey,
  currentInnerKey2: state.changeInnerCurrentKey2.currentKey,
  menuIsShown: state.toggleMenu.menuIsShown,
  userID: getUserID(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  chooseShippingCountry: country => dispatch(chooseShippingCountry(country)),
  showLanguages: () => dispatch(showLanguages()),
  toggleMenu: () => dispatch(toggleMenu()),
  toggleShippingCountryList: () => dispatch(toggleShippingCountryList()),
  toggleSubscribeToNewsletter: () => dispatch(toggleSubscribeToNewsletter()),
  openClientServicePage: () => dispatch(openClientServicePage()),
  openStoreLocatorPage: () => dispatch(openStoreLocatorPage()),
  toggleFashionMenuSM: () => dispatch(toggleFashionMenuSM()),
  toggleJewelryMenuSM: () => dispatch(toggleJewelryMenuSM()),
  toggleHomeMenuSM: () => dispatch(toggleHomeMenuSM()),
  toggleInnerFMenu: () => dispatch(toggleInnerFMenu()),
  decorateOnToggle: id => dispatch(decorateOnToggle(id)),
  innerDecorateOnToggle: id => dispatch(innerDecorateOnToggle(id)),
  innerDecorateOnToggle2: id => dispatch(innerDecorateOnToggle2(id)),
  changeLanguage: lang => dispatch(changeLanguage(lang)),
  selectFashionCategory: categoryLink => dispatch(selectFashionCategory(categoryLink)),
  proceedToMyAccount: userID => dispatch(proceedToMyAccount(userID)),
  openMyWishlist: menuIsShown => dispatch(openMyWishlist(menuIsShown)),
  openSignInW: data => dispatch(openSignInW(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(Menu));
