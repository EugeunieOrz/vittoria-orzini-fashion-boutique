import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import {
  chooseShippingCountry,
  toggleShippingCountry
} from 'modules/LanguageCountry/ShippingToModule';
import { decorateRegionLinkOnToggle } from 'modules/LanguageCountry/RegionLinkModule';
import ShippingCountryList from 'components/ShippingCountryList';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  currentKey: state.decorateRegionLinkOnToggle.currentKey,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  chooseShippingCountry: country => dispatch(chooseShippingCountry(country)),
  toggleShippingCountry: () => dispatch(toggleShippingCountry()),
  decorateOnToggle: link => dispatch(decorateRegionLinkOnToggle(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ShippingCountryList));
