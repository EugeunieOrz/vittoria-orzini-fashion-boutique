import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { closeProductLook } from 'modules/Product/ProductLookModule';
import { handleMouseMove } from 'modules/Product/ProductViewModule';
import { selectSlide } from 'modules/Product/ProductSlideModule';
import { toggleZoomEffect } from 'modules/Product/ZoomEffectModule';
import ProductLook from 'components/Product/ProductLook';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @param {Object} ownProps The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state) => ({
  backgroundPosition: state.handleImageStyle.backgroundPosition,
  selectedIndex: state.selectSlide.index,
  zoomEffectIsOn: state.toggleZoomEffect.zoomEffectIsOn,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  closeProductLook: product => dispatch(closeProductLook(product)),
  handleMouseMove: event => dispatch(handleMouseMove(event)),
  selectSlide: data => dispatch(selectSlide(data)),
  toggleZoomEffect: () => dispatch(toggleZoomEffect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ProductLook));
