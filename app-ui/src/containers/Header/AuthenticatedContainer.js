import { connect } from 'react-redux';
import { history } from 'modules/LocationModule';
import { getLanguage } from 'selectors/I18nSelector';
import { setLanguage } from 'modules/I18nModule';
import { getPathname } from 'selectors/LocationSelector';
import { toggleMenu } from 'modules/MenuModule';
import Authenticated from 'components/Header/Authenticated';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  current: getPathname(state),
  isHidden: state.toggleMenu.menu.isHidden,
  language: getLanguage(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  route: route => history.push(route),
  onToggleMenu: isHidden => dispatch(toggleMenu(isHidden)),
  selectLanguage: language => dispatch(setLanguage(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
