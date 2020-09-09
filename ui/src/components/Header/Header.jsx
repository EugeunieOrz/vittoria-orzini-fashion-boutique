// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import config from 'config/index';
import { withTranslation, Trans } from "react-i18next";
import type { Node } from 'react';
import FashionMenuContainer from 'containers/Menus/FashionMenuContainer';
import FineJewelryMenuContainer from 'containers/Menus/FineJewelryMenuContainer';
import HomeCollectionMenuContainer from 'containers/Menus/HomeCollectionMenuContainer';
import LanguageSelectorContainer from 'containers/LanguageCountry/LanguageSelectorContainer';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

import './Header.scss';

import arrowUp from '../../static/icons/arrow_up.svg';
import arrowDown from '../../static/icons/arrow_down.svg';
import searchIcon from '../../static/icons/search.svg';
import menuIcon from '../../static/icons/menu.svg';
import bagIcon from '../../static/icons/bag.svg';

import logo from '../../static/logo/vo_logo.jpg';
import logoTransparent from '../../static/logo/vo_logo_transparent.png';

type Props = {
  children: Node,
  closeSearchResults: () => any,
  filtered: Array,
  filterProducts: () => any,
  i18n: Object,
  t: Object,
  isHidden: boolean,
  language: string,
  showLanguages: () => any,
  handleSearchResult: () => any,
  products: Array,
  searchResultsAreShown: boolean,
  route: (string) => any,
  userID: string,
  onSignOut: () => any,
  langListIsShown: boolean,
  openFashionMenu: () => any,
  highlightSearchIcon: () => any,
  returnSearchIcon: () => any,
  toggleFashionMenu: () => any,
  fashionMenuOpened: boolean,
  toggleFineJewelryMenu: () => any,
  fineJewelryMenuOpened: boolean,
  toggleHomeCollectionMenu: () => any,
  homeCollectionMenuOpened: boolean,
  openSearchPage: () => any,
  searchPageOpened: boolean,
  toggleMiniBag: () => any,
  toggleMenu: () => any,
  menuIsShown: boolean,
  shippingCountryListIsShown: boolean,
  openMyWishlist: (menuIsShown: boolean) => any,
  openSignInW: (menuIsShown: boolean) => any,
  menuIsShown: boolean,
};

const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

export const HeaderComponent = ({
  children, i18n, t, language, isHidden, userID,
  products, handleSearchResult, searchResultsAreShown, onSignOut, route, langListIsShown,
  filtered, filterProducts, closeSearchResults, showLanguages,
  openFashionMenu, highlightSearchIcon, returnSearchIcon, searchPageOpened,
  fashionMenuOpened, toggleFashionMenu, fineJewelryMenuOpened, toggleFineJewelryMenu,
  homeCollectionMenuOpened, toggleHomeCollectionMenu, openSearchPage,
  toggleMiniBag, toggleMenu, menuIsShown, shippingCountryListIsShown,
  openMyWishlist, openSignInW,
}: Props) => (
  <Container fluid>
    <Navbar className="my-1 px-0">
      <Nav
        className="d-flex d-lg-none justify-content-between w-100 align-items-center"
        dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}>
        <Navbar.Brand className="" href="/">
          <Image src={logoTransparent} width="140.85" height="93.43" id="vo-brand-sm" alt="VO logo" />
        </Navbar.Brand>
        <Nav>
          <Nav.Link onClick={() => toggleMenu()}>
            <Image id="menu-icon" src={menuIcon} width="26" height="26" alt="Menu" />
          </Nav.Link>
          <Nav.Link onClick={() => openSearchPage()}>
            <Image id="search-icon" src={searchIcon} width="24" height="24" alt="Magnifying glass" />
          </Nav.Link>
          <Nav.Link onClick={() => toggleMiniBag()}>
            <Image id="bag-icon" src={bagIcon} width="22" height="22" alt="Bag" />
          </Nav.Link>
        </Nav>
      </Nav>
      <Nav className="d-none d-lg-flex justify-content-between w-100 align-items-center"
        dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}>
        <Nav className="align-items-center">
          <Navbar.Brand className="" href="/">
            <Image src={logoTransparent} width="140.85" height="93.43" id="vo-brand" alt="VO logo" />
          </Navbar.Brand>
          <Nav
            className={
              i18n.translator.language === "ar" ?
              "mr-5" :
              "ml-5"
            }
            id={
              i18n.translator.language === "ar" ?
              "nav-categories-ar" :
              "nav-categories"
            }>
            <Nav.Link
              id="fashion-menu"
              onMouseEnter={() => toggleFashionMenu()}>
              <div className={fashionMenuOpened ? "fashion-menu-link-active" : "fashion-menu-link"}
                   id="fashion-menu-link">
                <Trans>FASHION</Trans>
              </div>
              <FashionMenuContainer />
            </Nav.Link>
            <Nav.Link
              className="pl-3"
              id="jewelry-menu"
              onMouseEnter={() => toggleFineJewelryMenu()}>
              <div
                className={fineJewelryMenuOpened ? "jewelry-menu-link-active" : "jewelry-menu-link"}
                id="jewelry-menu-link">
                <Trans>FINE JEWELRY</Trans>
              </div>
              <FineJewelryMenuContainer />
            </Nav.Link>
            <Nav.Link
              className="pl-3"
              id="home-menu"
              onMouseEnter={() => toggleHomeCollectionMenu()}>
              <div
                className={homeCollectionMenuOpened ? "home-menu-link-active" : "home-menu-link"}
                id="home-menu-link">
                <Trans>HOME COLLECTION</Trans>
              </div>
              <HomeCollectionMenuContainer />
            </Nav.Link>
          </Nav>
        </Nav>
        <Nav
          className={
            i18n.translator.language === "ar" ?
            "align-items-center" : "align-items-baseline"
          }
          id={
            i18n.translator.language === "ar" ?
            "nav-other-links-ar" :
            "nav-other-links"
          }>
          <Nav.Link onClick={
              userID !== undefined ?
              () => route(config.route.account.index) :
              () => route(config.route.auth.index)
            }>
            {t('Account').toUpperCase()}
          </Nav.Link>
          <Nav.Link onClick={() => toggleMiniBag()}>
            <Trans>SHOPPING BAG</Trans>
          </Nav.Link>
          <Nav.Link onClick={
              userID !== undefined ?
              () => openMyWishlist(menuIsShown) :
              () => openSignInW(menuIsShown)
            }>
            <Trans>WISH LIST</Trans>
          </Nav.Link>
          <Nav.Link
            className={
              i18n.translator.language === "ar" ?
              "ml-3" : ""
            }
            onClick={() => openSearchPage()}>
            <Trans>Search</Trans>
          </Nav.Link>
          <Nav.Item
            id={
              i18n.translator.language === "ar" ?
              "lang-dropdown-ar" :
              "lang-dropdown"
            }
            className="ml-2" 
            onClick={() => showLanguages()}>
            <span>
              {
                i18n.translator.language === "ar" ?
                "العربية"
                :
                language.toUpperCase()
              }
              <img
                className="d-inline-block"
                id="home-arrow-img"
                src={langListIsShown ? arrowUp : arrowDown}
                alt=""
                width="24"
                height="24"
              />
            </span>
            <LanguageSelectorContainer />
          </Nav.Item>
          {
            userID !== undefined &&
            <Nav.Link onClick={onSignOut}>{t('SIGN OUT')}</Nav.Link>
          }
        </Nav>
      </Nav>
    </Navbar>
  </Container>
);

export default withTranslation()(HeaderComponent);
