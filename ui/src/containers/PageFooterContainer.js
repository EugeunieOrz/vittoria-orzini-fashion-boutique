import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { getCountryByIP } from 'selectors/GeolocationSelector';
import { toggleShippingCountryList } from 'modules/LanguageCountry/ShippingToModule';
import { toggleSubscribeToNewsletter } from 'modules/Newsletter/ToggleSubscribeToNewsletterModule';
import PageFooter from 'components/PageFooter';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */

const mapStateToProps = state => ({
  country: getCountryByIP(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  toggleShippingCountryList: () => dispatch(toggleShippingCountryList()),
  toggleSubscribeToNewsletter: () => dispatch(toggleSubscribeToNewsletter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(PageFooter));
