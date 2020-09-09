import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { closeHomeCollectionMenu, toggleHomeCollectionMenu } from 'modules/Menu/HomeCollectionMenuModule';
import { selectFashionCategory } from 'modules/ItemCategories/CategoryModule';
import HomeCollectionMenu from 'components/Menus/HomeCollectionMenu';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  language: state.selectLanguage.lang,
  homeCollectionMenuOpened: state.toggleHomeCollectionMenu.homeCollectionMenuOpened,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  closeHomeCollectionMenu: () => dispatch(closeHomeCollectionMenu()),
  selectFashionCategory: categoryLink => dispatch(selectFashionCategory(categoryLink)),
  toggleHomeCollectionMenu: () => dispatch(toggleHomeCollectionMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(HomeCollectionMenu));
