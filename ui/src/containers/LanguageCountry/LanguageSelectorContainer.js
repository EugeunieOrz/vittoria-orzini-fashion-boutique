import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { changeLanguage } from 'modules/LanguageCountry/LanguageModule';
import LanguageSelector from 'components/LanguageSelector';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  langListIsShown: state.showLanguages.langListIsShown,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  changeLanguage: lang => dispatch(changeLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(LanguageSelector));
