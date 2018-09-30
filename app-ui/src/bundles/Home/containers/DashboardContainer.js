import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { createStore } from 'redux';
import lifecycle from 'components/Lifecycle';
import { toggleMenu } from 'modules/MenuModule';
import Dashboard from 'bundles/Home/components/Dashboard';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
/* const mapStateToProps = (state) => {
   console.log('STATE', state);
   return {
     isHidden: state.home.toggleMenu.menu.isHidden,
   }
 } */
const mapStateToProps = state => ({

});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(Dashboard));
