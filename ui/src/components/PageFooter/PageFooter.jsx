// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config/index';
import { withTranslation, Trans } from "react-i18next";
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import './PageFooter.scss';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  country: string,
  toggleShippingCountryList: () => any,
  toggleSubscribeToNewsletter: () => any,
};

const year = new Date().getFullYear();

export const PageFooterComponent = ({
  i18n, t, country, toggleShippingCountryList, toggleSubscribeToNewsletter,
}: Props) => (
  <Navbar
    className="d-none d-lg-flex justify-content-between align-items-baseline"
    id="footer"
    dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}>
    <div
      className="pl-3"
      id={i18n.translator.language === "ar" ? "site-title-ar" : "site-title"}>
      <p>{t('Vittoria Orzini Boutique', {year: year})}</p>
    </div>
    <ListGroup className="align-items-baseline" id="footer-menu" horizontal>
      <ListGroup.Item
        className={
          i18n.translator.language === "ar" ?
          "border-0 footer-item-ar" : "border-0 footer-item"
        }
        id="choose-country-link">
        <div className="footer-link" onClick={() => toggleShippingCountryList()}>
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
        </div>
      </ListGroup.Item>
      <ListGroup.Item className={
          i18n.translator.language === "ar" ?
          "border-0 footer-item-ar" : "border-0 footer-item"
        }>
        <Link className="footer-link" id="client-service-link" to={config.route.clientService}>
          {t('clientService')}
        </Link>
      </ListGroup.Item>
      <ListGroup.Item className={
          i18n.translator.language === "ar" ?
          "border-0 footer-item-ar" : "border-0 footer-item"
        }>
        <Link className="footer-link" id="store-locator-link" to={config.route.storeLocator}>
          <Trans>Store Locator</Trans>
        </Link>
      </ListGroup.Item>
      <ListGroup.Item className={
          i18n.translator.language === "ar" ?
          "border-0 footer-item-ar" : "border-0 footer-item"
        }>
        <div className="footer-link" onClick={() => toggleSubscribeToNewsletter()}>
          {t('subscribe')}
        </div>
      </ListGroup.Item>
    </ListGroup>
  </Navbar>
);

export default withTranslation()(PageFooterComponent);
