import { connect } from 'react-redux';
import Preloader from 'components/Preloader';
import { isInitialized } from 'selectors/InitSelector';
import lifecycle from 'components/Lifecycle';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  preloaded: isInitialized(state),
});

export default connect(mapStateToProps)(lifecycle(Preloader));
