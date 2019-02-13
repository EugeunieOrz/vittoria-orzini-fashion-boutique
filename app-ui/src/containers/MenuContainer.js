import { connect } from 'react-redux';
import { toggleMenu } from 'modules/MenuModule';
import Menu from 'components/Menu/Menu';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */

const mapStateToProps = state => ({

});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onToggleMenu: isHidden => dispatch(toggleMenu(isHidden)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
