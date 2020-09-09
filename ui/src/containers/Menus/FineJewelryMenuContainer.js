import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { closeFineJewelryMenu, toggleFineJewelryMenu } from 'modules/Menu/FineJewelryMenuModule';
import { selectFashionCategory } from 'modules/ItemCategories/CategoryModule';
import FineJewelryMenu from 'components/Menus/FineJewelryMenu';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  language: state.selectLanguage.lang,
  fineJewelryMenuOpened: state.toggleFineJewelryMenu.fineJewelryMenuOpened,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  closeFineJewelryMenu: () => dispatch(closeFineJewelryMenu()),
  selectFashionCategory: categoryLink => dispatch(selectFashionCategory(categoryLink)),
  toggleFineJewelryMenu: () => dispatch(toggleFineJewelryMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(FineJewelryMenu));
