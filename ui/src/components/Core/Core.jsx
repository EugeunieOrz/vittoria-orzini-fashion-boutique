// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import type { Node } from 'react';
import { withTranslation, Trans } from "react-i18next";
import Container from 'react-bootstrap/Container';
import HeaderContainer from 'containers/HeaderContainer';
import PageFooterContainer from 'containers/PageFooterContainer';
import MenuContainer from 'containers/MenuContainer';
import MiniShoppingBagContainer from 'containers/Shopping/MiniShoppingBagContainer';
import SearchPageContainer from 'containers/SearchPageContainer';
import ShippingCountryListContainer from 'containers/LanguageCountry/ShippingCountryListContainer';
import SubscribeToNewsletterContainer from 'containers/Newsletter/SubscribeToNewsletterContainer';
import AddItemToBagAlertContainer from 'containers/Shopping/AddItemToBagAlertContainer';
import SignInToWishListContainer from 'containers/SignInToWishListContainer';
import AddItemToWishlistAlertContainer from 'bundles/Account/containers/AddItemToWishlistAlertContainer';
import MsgContainer from 'containers/MsgContainer';
import Image from 'react-bootstrap/Image';
import './Core.scss';

import arrowUp from '../../static/icons/arrow_up.svg';

type Props = {
  i18n: Object,
  t: Object,
  children: Node,
  menuIsShown: boolean,
  addItemToBagAlertIsShown: boolean,
  addItemToWishlistAlertIsShown: boolean,
  miniBagIsShown: boolean,
  searchPageOpened: boolean,
  shippingCountryListIsShown: boolean,
  signInWIsShown: boolean,
  newsletterIsShown: boolean,
  msgIsShown: boolean,
  userID: string,
};

const scrollTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export const CoreComponent = ({
  i18n, t, children, menuIsShown, addItemToBagAlertIsShown,
  addItemToWishlistAlertIsShown, msgIsShown,
  miniBagIsShown, newsletterIsShown, searchPageOpened,
  shippingCountryListIsShown, signInWIsShown,
  userID,
}: Props) => (
  <Container
    className="d-flex flex-column h-100"
    id="core-container"
    lang={i18n.translator.language}
    dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}
    fluid>
    <HeaderContainer />
    <div className="flex-column align-items-center px-1"
         id="back-to-top-btn"
         onClick={() => scrollTop()}>
      <Image className="mb-n2" src={arrowUp} alt="Arrow up" width="32" height="32" />
      <div id={i18n.translator.language === "ar" ? "back-to-top-ar" : "back-to-top"}>
        <Trans>TOP</Trans>
      </div>
    </div>
    {
      addItemToBagAlertIsShown &&
      <AddItemToBagAlertContainer />
    }
    {
      addItemToWishlistAlertIsShown &&
      <AddItemToWishlistAlertContainer />
    }
    {
      msgIsShown &&
      <MsgContainer />
    }
    {
      miniBagIsShown &&
      <MiniShoppingBagContainer />
    }
    {
      menuIsShown &&
      <MenuContainer />
    }
    {
      searchPageOpened &&
      <SearchPageContainer />
    }
    {
      shippingCountryListIsShown &&
      <ShippingCountryListContainer />
    }
    {
      signInWIsShown &&
      <SignInToWishListContainer />
    }
    {
      newsletterIsShown &&
      <SubscribeToNewsletterContainer />
    }
    {children}
    <PageFooterContainer />
  </Container>
);

export default withTranslation()(CoreComponent);
