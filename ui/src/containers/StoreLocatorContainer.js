import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { findStore } from 'modules/StoreLocatorModule';
import { selectCountry } from 'modules/CountryModule';
import { selectStore } from 'modules/StoreModule';
import StoreLocator from 'components/StoreLocator';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
 const mapStateToProps = state => ({
   country: state.selectCountry.country,
   store: state.selectStore.store,
 });

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch) => ({
  findStore: data => dispatch(findStore(data)),
  selectCountry: data => dispatch(selectCountry(data)),
  selectStore: data => dispatch(selectStore(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(StoreLocator));
