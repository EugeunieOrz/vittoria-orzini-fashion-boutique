import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { getUserID } from 'selectors/UserSelector';
import Core from 'components/Core';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */

 function handleScroll() {
   const buttonBackToTop = document.getElementById("back-to-top-btn");
   if(buttonBackToTop !== null) {
     if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
       buttonBackToTop.style.display = "flex";
     } else {
       buttonBackToTop.style.display = "none";
     }
   }
 }

const mapStateToProps = (state) => {
  if(state.account) {
    return {
      addItemToWishlistAlertIsShown: state.account.toggleAddItemToWishlistAlert.isShown,
      userID: getUserID(state),
      miniBagIsShown: state.miniBag.isShown,
      signInWIsShown: state.toggleSignInW.signInWIsShown,
      searchPageOpened: state.toggleSearchPage.searchPageOpened,
      menuIsShown: state.toggleMenu.menuIsShown,
      shippingCountryListIsShown: state.toggleShippingCountry.isShown,
      newsletterIsShown: state.toggleSubscribeToNewsletter.isShown,
      addItemToBagAlertIsShown: state.addItemToBag.isShown,
      msgIsShown: state.toggleMsg.isShown,
    }
  } else {
    return {
      userID: getUserID(state),
      miniBagIsShown: state.miniBag.isShown,
      signInWIsShown: state.toggleSignInW.signInWIsShown,
      searchPageOpened: state.toggleSearchPage.searchPageOpened,
      menuIsShown: state.toggleMenu.menuIsShown,
      shippingCountryListIsShown: state.toggleShippingCountry.isShown,
      newsletterIsShown: state.toggleSubscribeToNewsletter.isShown,
      addItemToBagAlertIsShown: state.addItemToBag.isShown,
      msgIsShown: state.toggleMsg.isShown,
    }
  }
}

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  componentDidMount: () => document.body.addEventListener('scroll', function(){ handleScroll() }),
  componentWillUnmount: () => document.body.removeEventListener('scroll', function(){ handleScroll() }),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(Core));
