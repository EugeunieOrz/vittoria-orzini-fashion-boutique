import { connect } from 'react-redux';
import { history } from 'modules/LocationModule';
import { getPathname } from 'selectors/LocationSelector';
import { getLanguage } from 'selectors/I18nSelector';
import { setLanguage } from 'modules/I18nModule';
import { toggleMenu } from 'modules/MenuModule';
import { getUserID } from 'selectors/UserSelector';
import { signOutUser } from 'modules/UserModule';
import HomeHeader from 'components/Header/HomeHeader';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */

const mapStateToProps = state => ({
  current: getPathname(state),
  language: getLanguage(state),
  isHidden: state.toggleMenu.menu.isHidden,
  userID: getUserID(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  route: route => history.push(route),
  selectLanguage: language => dispatch(setLanguage(language)),
  onSignOut: () => dispatch(signOutUser()),
  onToggleMenu: isHidden => dispatch(toggleMenu(isHidden)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
