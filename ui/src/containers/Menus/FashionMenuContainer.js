import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { closeFashionMenu, toggleFashionMenu } from 'modules/Menu/FashionMenuModule';
import { selectFashionCategory } from 'modules/ItemCategories/CategoriesModule';
import FashionMenu from 'components/Menus/FashionMenu';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  language: state.selectLanguage.lang,
  fashionMenuOpened: state.toggleFashionMenu.fashionMenuOpened,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  closeFashionMenu: () => dispatch(closeFashionMenu()),
  selectFashionCategory: categoryLink => dispatch(selectFashionCategory(categoryLink)),
  toggleFashionMenu: () => dispatch(toggleFashionMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(FashionMenu));
