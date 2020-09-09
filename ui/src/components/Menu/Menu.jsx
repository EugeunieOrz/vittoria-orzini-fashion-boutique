// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import LanguageSelectorContainer from 'containers/LanguageCountry/LanguageSelectorContainer';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './Menu.scss';

import arrowDown from '../../static/icons/arrow_down.svg';
import arrowUp from '../../static/icons/arrow_up.svg';
import closeMenuIcon from '../../static/icons/close_menu.svg';
import logoTransparent from '../../static/logo/vo_logo_transparent.png';
import minusIcon from '../../static/icons/minus_for_menu.svg';
import plusIcon from '../../static/icons/plus.svg';

import accountIcon from '../../static/icons/account.svg';
import helpIcon from '../../static/icons/help.svg';
import wishlistIcon from '../../static/icons/wishlist.svg';
import storeLocatorIcon from '../../static/icons/storeLocator.svg';

import fCategories from '../../static/json/categories.json';
import fjCategories from '../../static/json/fjcategories.json';
import hcCategories from '../../static/json/hccategories.json';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  toggleMenu: () => any,
  language: string,
  country: string,
  langListIsShown: boolean,
  showLanguages: () => any,
  toggleShippingCountryList: () => any,
  toggleSubscribeToNewsletter: () => any,
  openClientServicePage: () => any,
  openStoreLocatorPage: () => any,
  fashionMenuIsShown: boolean,
  jewelryMenuIsShown: boolean,
  homeMenuIsShown: boolean,
  toggleFashionMenuSM: () => any,
  toggleJewelryMenuSM: () => any,
  toggleHomeMenuSM: () => any,
  toggleInnerFMenu: () => any,
  innerFMenuIsShown: boolean,
  currentKey: string,
  decorateOnToggle: (currentKey: string, id: string) => any,
  currentInnerKey: string,
  innerDecorateOnToggle: (currentKey: string, id: string) => any,
  currentInnerKey2: string,
  innerDecorateOnToggle2: (currentKey: string, id: string) => any,
  changeLanguage: (lang: string) => any,
  selectFashionCategory: (categoryLink: string) => any,
  proceedToMyAccount: (userID: string) => any,
  openMyWishlist: (menuIsShown: boolean) => any,
  openSignInW: (menuIsShown: boolean) => any,
  menuIsShown: boolean,
  userID: string,
}

export const MenuComponent = ({
  i18n, t, toggleMenu, language, country, langListIsShown, showLanguages,
  toggleShippingCountryList, fashionMenuIsShown, jewelryMenuIsShown, homeMenuIsShown,
  toggleFashionMenuSM, toggleJewelryMenuSM, toggleHomeMenuSM,
  toggleInnerFMenu, innerFMenuIsShown, toggleSubscribeToNewsletter,
  decorateOnToggle, currentKey, innerDecorateOnToggle, currentInnerKey,
  innerDecorateOnToggle2, currentInnerKey2, changeLanguage,
  openClientServicePage, openStoreLocatorPage, selectFashionCategory,
  proceedToMyAccount, userID,
  menuIsShown, openMyWishlist, openSignInW,
}: Props) => (
  <Container
    className="d-block d-lg-none"
    id="menu-container"
    dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}
    fluid="sm">
    <Row id="inner-menu-sm" className="ml-1 pl-2 pr-1">
      <Col xs={12}>
        <Navbar className="my-1 px-0 d-flex w-100 justify-content-between align-items-center">
          <Navbar.Brand className="" href="/">
            <Image src={logoTransparent} width="140.85" height="93.43" id="vo-brand-sm" alt="VO logo" />
          </Navbar.Brand>
          <div
            className="d-flex flex-column align-items-center pr-3"
            id={ i18n.translator.language === "ar" ? "closemenu-btn-ar" : "closemenu-btn" }
            onClick={() => toggleMenu()}>
            <Image
              className=""
              id={ i18n.translator.language === "ar" ? "closemenu-btn-ar" : "closemenu-btn" }
              src={closeMenuIcon}
              width="36"
              height="36" />
            <div className="pr-1">
              <Trans>Close</Trans>
            </div>
          </div>
        </Navbar>
        <Accordion id="menu-accordion">
          <Card className="mb-1 border-0 menu-card">
            <Accordion.Toggle
              className="d-flex justify-content-between pl-0 pb-0 menu-card-header"
              as={Card.Header}
              eventKey="01"
              onClick={() => decorateOnToggle({
                currentKey: currentKey,
                id: "fashion-menu-link-sm"
              })}>
              <div className={
                  i18n.translator.language === "ar" ?
                  "category-link-ar" : "category-link"
                }>
                <Trans>Fashion</Trans>
              </div>
              <Image
                src={currentKey === "fashion-menu-link-sm" ? arrowUp : arrowDown}
                width="24" height="24" alt="Arrow" />
            </Accordion.Toggle>
            <Accordion.Collapse
              eventKey="01"
              data-parent="#menu-accordion"
              className="menu-inner-link-sm"
              id="fashion-menu-link-sm">
              <Card.Body className="py-0">
                <Accordion id="menu-inner-accordion">
                  {
                    fCategories.map((cat, idx) =>
                      <Card key={idx} className="border-0 menu-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey={cat.Category.name}
                          className="d-flex align-items-center pl-0 pb-0"
                          onClick={() => innerDecorateOnToggle({
                            currentKey: currentInnerKey,
                            id: cat.Category.link
                          })}>
                          <Image
                            src={currentInnerKey === cat.Category.link ? minusIcon : plusIcon}
                            width="16" height="16" alt="Plus/Minus" />
                          <div className={
                              i18n.translator.language === "ar" ?
                              "category-link-ar mr-2" : "category-link ml-2"
                            }>
                            <Trans>{cat.Category.name}</Trans>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse
                          eventKey={cat.Category.name}
                          data-parent="#menu-inner-accordion"
                          id={cat.Category.link}>
                          <Card.Body>
                            <Accordion id="#menu-accordion-3">
                              {
                                cat.Category.categories.map((innerCat, idx2) =>
                                  <Card key={idx2} className="border-0 menu-card">
                                    {
                                      typeof innerCat.category === 'object' ?
                                      <div>
                                        <Accordion.Toggle
                                          as={Card.Header}
                                          eventKey={innerCat.category.name}
                                          className="d-flex pl-0 pb-0 align-items-center"
                                          onClick={() => innerDecorateOnToggle2({
                                            currentKey: currentInnerKey2,
                                            id: innerCat.category.link
                                          })}>
                                          <Image
                                            src={
                                              currentInnerKey2 === innerCat.category.link ?
                                              minusIcon :
                                              plusIcon
                                            }
                                            width="16" height="16" alt="Plus/Minus" />
                                          <div className={
                                              i18n.translator.language === "ar" ?
                                              "category-link-ar mr-2" : "category-link ml-2"
                                            }>
                                            <Trans>{innerCat.category.name}</Trans>
                                          </div>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse
                                          eventKey={innerCat.category.name}
                                          data-parent="#menu-inner-3"
                                          id={innerCat.category.link}>
                                          <Card.Body>
                                            {
                                              innerCat.category.innerCategory.map((inner2, idx3) =>
                                              <Nav.Item
                                                key={idx3}
                                                className={
                                                  i18n.translator.language === "ar" ?
                                                  "text-right category-inner-link-ar" :
                                                  "category-inner-link"
                                                }>
                                                <Nav.Link onClick={() => selectFashionCategory(inner2.link)}>
                                                  <Trans>{inner2.name}</Trans>
                                                </Nav.Link>
                                              </Nav.Item>
                                            )}
                                          </Card.Body>
                                        </Accordion.Collapse>
                                      </div>
                                      :
                                      <Nav.Item className={
                                          i18n.translator.language === "ar" ?
                                          "text-right category-inner-link-ar" :
                                          "category-inner-link"
                                        }>
                                        <Nav.Link onClick={() => selectFashionCategory(innerCat.link)}>
                                          <Trans>{innerCat.category}</Trans>
                                        </Nav.Link>
                                      </Nav.Item>
                                    }
                                  </Card>
                                )
                              }
                            </Accordion>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    )
                  }
                </Accordion>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="mb-1 border-0 menu-card">
            <Accordion.Toggle
              className="d-flex justify-content-between pl-0 pb-0 menu-card-header"
              as={Card.Header}
              eventKey="02"
              onClick={() => decorateOnToggle({
                currentKey: currentKey,
                id: "fj-menu-link-sm"
              })}>
              <div className={
                  i18n.translator.language === "ar" ?
                  "category-link-ar" : "category-link"
                }>
                {t('fineJewelry')}
              </div>
              <Image
                src={currentKey === "fj-menu-link-sm" ? arrowUp : arrowDown}
                width="24" height="24" alt="Arrow" />
            </Accordion.Toggle>
            <Accordion.Collapse
              eventKey="02"
              data-parent="#menu-accordion"
              className="menu-inner-link-sm"
              id="fj-menu-link-sm">
              <Card.Body>
                {
                  fjCategories.map((cat, idx) =>
                  <Nav.Item
                    className={
                      i18n.translator.language === "ar" ?
                      "text-right category-link-ar" :
                      "category-link"
                    }
                    key={idx}>
                    <Nav.Link onClick={() => selectFashionCategory(cat.link)}>
                      <Trans>{cat.name}</Trans>
                    </Nav.Link>
                  </Nav.Item>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="mb-1 border-0 menu-card">
            <Accordion.Toggle
              className="d-flex justify-content-between pl-0 pb-0 menu-card-header"
              as={Card.Header}
              eventKey="03"
              onClick={() => decorateOnToggle({
                currentKey: currentKey,
                id: "hc-menu-link-sm"
              })}>
              <div className={
                  i18n.translator.language === "ar" ?
                  "category-link-ar" : "category-link"
                }>{t('homeColl')}</div>
              <Image
                src={currentKey === "hc-menu-link-sm" ? arrowUp : arrowDown}
                width="24" height="24" alt="Arrow" />
            </Accordion.Toggle>
            <Accordion.Collapse
              eventKey="03"
              data-parent="#menu-accordion"
              className="menu-inner-link-sm"
              id="hc-menu-link-sm">
              <Card.Body>
                {
                  hcCategories.map((cat, idx) =>
                  <Nav.Item
                    className={
                      i18n.translator.language === "ar" ?
                      "text-right category-link-ar" :
                      "category-link"
                    }
                    key={idx}>
                    <Nav.Link onClick={() => selectFashionCategory(cat.link)}>
                      <Trans>{cat.name}</Trans>
                    </Nav.Link>
                  </Nav.Item>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <div className={
            i18n.translator.language === "ar" ?
            "my-4 nav-divider-ar" : "my-4 nav-divider"
          }>
        </div>
        <Nav.Item className="mb-3 d-flex align-items-center menu-link-sm"
          onClick={() => proceedToMyAccount(userID)}>
          <Image src={accountIcon} width="16" height="16" alt="Account" />
          <div className={
              i18n.translator.language === "ar" ? "mr-2 menu-link-sm-ar" : "ml-2"
            }>{t('Account')}</div>
        </Nav.Item>
        <Nav.Item
          className="mb-3 d-flex align-items-center menu-link-sm"
          onClick={
            userID !== undefined ?
            () => openMyWishlist(menuIsShown) :
            () => openSignInW(menuIsShown)
          }>
          <Image src={wishlistIcon} width="16" height="16" alt="Account" />
          <div className={
              i18n.translator.language === "ar" ? "mr-2 menu-link-sm-ar" : "ml-2"
            }>
            <Trans>Wish List</Trans>
          </div>
        </Nav.Item>
        <Nav.Item className="mb-3 d-flex align-items-center menu-link-sm" onClick={() => openClientServicePage()}>
          <Image src={helpIcon} width="16" height="16" alt="Account" />
          <div className={
              i18n.translator.language === "ar" ? "mr-2 menu-link-sm-ar" : "ml-2"
            }>{t('clientService')}</div>
        </Nav.Item>
        <Nav.Item className="mb-3 d-flex align-items-center menu-link-sm" onClick={() => openStoreLocatorPage()}>
          <Image src={storeLocatorIcon} width="16" height="16" alt="Account" />
          <div className={
              i18n.translator.language === "ar" ? "mr-2 menu-link-sm-ar" : "ml-2"
            }>
            <Trans>Store Locator</Trans>
          </div>
        </Nav.Item>
        <div className={
            i18n.translator.language === "ar" ?
            "my-4 nav-divider-ar" : "my-4 nav-divider"
          }></div>
        <Nav.Item
          className={
            i18n.translator.language === "ar" ?
            "text-right mb-3 menu-link-sm-ar" : "mb-3 menu-link-sm"
          }
          onClick={() => toggleSubscribeToNewsletter()}>
          {t('subscribe')}
        </Nav.Item>
        <Nav.Item
          className={
            i18n.translator.language === "ar" ?
            "mb-3 text-right" : "mb-3"
          }
          id={ i18n.translator.language === "ar" ? "country-link-ar" : "country-link" }
          onClick={() => toggleShippingCountryList()}>
          {t('shippingTo')}
          {
            country ?
            <div className="d-inline">
              <Trans>{country}</Trans>
            </div> :
            <div className="d-inline">
              <Trans>N/A</Trans>
            </div>
          }
        </Nav.Item>
        <Nav.Item
          className={
            i18n.translator.language === "ar" ?
            "text-right" : ""
          }
          id={ i18n.translator.language === "ar" ? "language-link-ar" : "language-link" }
          onClick={() => showLanguages()}>
          <span className="mb-2">
            {t('language')}
            <div className="d-inline">
              {
                i18n.translator.language === "ar" ?
                "العربية" :
                language.toUpperCase()
              }
            </div>
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
      </Col>
    </Row>
  </Container>
);

export default withTranslation()(MenuComponent);
