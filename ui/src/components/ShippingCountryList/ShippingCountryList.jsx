// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './ShippingCountryList.scss';

import arrowDown from '../../static/icons/arrow_down.svg';
import arrowUp from '../../static/icons/arrow_up.svg';
import closeMenuIcon from '../../static/icons/close_menu.svg';
import countriesEurope from '../../static/json/countriesEurope.json';
import countriesAfrica from '../../static/json/countriesAfrica.json';
import countriesME from '../../static/json/countriesME.json';
import countriesOceania from '../../static/json/countriesOceania.json';
import countriesAmerica from '../../static/json/countriesAmerica.json';
import countriesAsia from '../../static/json/countriesAsia.json';


/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  chooseShippingCountry: (country: string) => any,
  toggleShippingCountry: () => any,
  decorateOnToggle: (currentKey: string, newKey: string) => any,
  currentKey: string,
}

export const ShippingCountryListComponent = ({
  i18n, t, chooseShippingCountry, toggleShippingCountry,
  decorateOnToggle, currentKey,
}: Props) => (
  <Container id="shipping-countries-container" fluid>
    <Row className="no-gutters">
      <Col xs={6} lg={11}></Col>
      <Col xs={6} lg={1} className="d-flex justify-content-end pt-3 pr-3">
        <Image
          className=""
          id="close-menu-btn"
          src={closeMenuIcon}
          width="36"
          height="36"
          onClick={() => toggleShippingCountry()}
          />
      </Col>
    </Row>
    <Row
      className="no-gutters"
      id="shipping-countries-txt-row"
      dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}>
      <Col className="d-none d-md-block" md={2} lg={3} xl={4}></Col>
      <Col xs={12} md={8} lg={6} xl={4}>
        <Row
          className="mx-4 mt-5"
          id={i18n.translator.language === "ar" ? "shipping-countries-title-ar" : "shipping-countries-title"}>
          {t('selectRegion')}
        </Row>
        <Row className="no-gutters mx-4 mt-5" id="shipping-countries-menu">
          <Accordion id="countries-accordion">
            <Card className="mb-2 border-0 region-card">
              <Accordion.Toggle
                as={Card.Header}
                className="d-flex justify-content-between px-0 pb-0 region-card-header"
                eventKey="01"
                onClick={() => decorateOnToggle({
                  currentKey: currentKey,
                  newKey: "europe-region"
                })}>
                <div className={i18n.translator.language === "ar" ? "region-link-ar" : "region-link"}>
                  <Trans>Europe</Trans>
                </div>
                <Image
                  src={currentKey === "europe-region" ? arrowUp : arrowDown}
                  width="24" height="24" alt="Arrow" />
              </Accordion.Toggle>
              <Accordion.Collapse
                eventKey="01"
                data-parent="#countries-accordion"
                className="text-right region-link-sm"
                id="europe-region">
                <Card.Body className="py-0 px-0 mt-3">
                  {
                    countriesEurope.map((country, idx) =>
                      <Nav.Item
                        key={idx}
                        className={i18n.translator.language === "ar" ? "country-link-sm-ar" : "country-link-sm"}
                        onClick={() => chooseShippingCountry(country.name)}>
                        <Trans>{country.name}</Trans>
                      </Nav.Item>
                    )
                  }
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="mb-2 border-0 region-card">
              <Accordion.Toggle
                as={Card.Header}
                className="d-flex justify-content-between px-0 pb-0 region-card-header"
                eventKey="02"
                onClick={() => decorateOnToggle({
                  currentKey: currentKey,
                  newKey: "asia-region"
                })}>
                <div className={i18n.translator.language === "ar" ? "region-link-ar" : "region-link"}>
                  <Trans>Asia</Trans>
                </div>
                <Image
                  src={currentKey === "asia-region" ? arrowUp : arrowDown}
                  width="24" height="24" alt="Arrow" />
              </Accordion.Toggle>
              <Accordion.Collapse
                eventKey="02"
                data-parent="#countries-accordion"
                className="text-right region-link-sm"
                id="asia-region">
                <Card.Body className="py-0 px-0 mt-3">
                  {
                    countriesAsia.map((country, idx) =>
                      <Nav.Item
                        key={idx}
                        className={i18n.translator.language === "ar" ? "country-link-sm-ar" : "country-link-sm"}
                        onClick={() => chooseShippingCountry(country.name)}>
                        <Trans>{country.name}</Trans>
                      </Nav.Item>
                    )
                  }
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="mb-2 border-0 region-card">
              <Accordion.Toggle
                as={Card.Header}
                className="d-flex justify-content-between px-0 pb-0 region-card-header"
                eventKey="03"
                onClick={() => decorateOnToggle({
                  currentKey: currentKey,
                  newKey: "me-region"
                })}>
                <div className={i18n.translator.language === "ar" ? "region-link-ar" : "region-link"}>
                  <Trans>Middle East</Trans>
                </div>
                <Image
                  src={currentKey === "me-region" ? arrowUp : arrowDown}
                  width="24" height="24" alt="Arrow" />
              </Accordion.Toggle>
              <Accordion.Collapse
                eventKey="03"
                data-parent="#countries-accordion"
                className="text-right region-link-sm"
                id="me-region">
                <Card.Body className="py-0 px-0 mt-3">
                  {
                    countriesME.map((country, idx) =>
                      <Nav.Item
                        key={idx}
                        className={i18n.translator.language === "ar" ? "country-link-sm-ar" : "country-link-sm"}
                        onClick={() => chooseShippingCountry(country.name)}>
                        <Trans>{country.name}</Trans>
                      </Nav.Item>
                    )
                  }
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="mb-2 border-0 region-card">
              <Accordion.Toggle
                as={Card.Header}
                className="d-flex justify-content-between px-0 pb-0 region-card-header"
                eventKey="04"
                onClick={() => decorateOnToggle({
                  currentKey: currentKey,
                  newKey: "africa-region"
                })}>
                <div className={i18n.translator.language === "ar" ? "region-link-ar" : "region-link"}>
                  <Trans>Africa</Trans>
                </div>
                <Image
                  src={currentKey === "africa-region" ? arrowUp : arrowDown}
                  width="24" height="24" alt="Arrow" />
              </Accordion.Toggle>
              <Accordion.Collapse
                eventKey="04"
                data-parent="#countries-accordion"
                className="text-right region-link-sm"
                id="africa-region">
                <Card.Body className="py-0 px-0 mt-3">
                  {
                    countriesAfrica.map((country, idx) =>
                      <Nav.Item
                        key={idx}
                        className={i18n.translator.language === "ar" ? "country-link-sm-ar" : "country-link-sm"}
                        onClick={() => chooseShippingCountry(country.name)}>
                        <Trans>{country.name}</Trans>
                      </Nav.Item>
                    )
                  }
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="mb-2 border-0 region-card">
              <Accordion.Toggle
                as={Card.Header}
                className="d-flex justify-content-between px-0 pb-0 region-card-header"
                eventKey="05"
                onClick={() => decorateOnToggle({
                  currentKey: currentKey,
                  newKey: "america-region"
                })}>
                <div className={i18n.translator.language === "ar" ? "region-link-ar" : "region-link"}>
                  <Trans>America</Trans>
                </div>
                <Image
                  src={currentKey === "america-region" ? arrowUp : arrowDown}
                  width="24" height="24" alt="Arrow" />
              </Accordion.Toggle>
              <Accordion.Collapse
                eventKey="05"
                data-parent="#countries-accordion"
                className="text-right region-link-sm"
                id="america-region">
                <Card.Body className="py-0 px-0 mt-3">
                  {
                    countriesAmerica.map((country, idx) =>
                      <Nav.Item
                        key={idx}
                        className={i18n.translator.language === "ar" ? "country-link-sm-ar" : "country-link-sm"}
                        onClick={() => chooseShippingCountry(country.name)}>
                        <Trans>{country.name}</Trans>
                      </Nav.Item>
                    )
                  }
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="mb-2 border-0 region-card">
              <Accordion.Toggle
                as={Card.Header}
                className="d-flex justify-content-between px-0 pb-0 region-card-header"
                eventKey="06"
                onClick={() => decorateOnToggle({
                  currentKey: currentKey,
                  newKey: "oceania-region"
                })}>
                <div className={i18n.translator.language === "ar" ? "region-link-ar" : "region-link"}>
                  <Trans>Oceania</Trans>
                </div>
                <Image
                  src={currentKey === "oceania-region" ? arrowUp : arrowDown}
                  width="24" height="24" alt="Arrow" />
              </Accordion.Toggle>
              <Accordion.Collapse
                eventKey="06"
                data-parent="#countries-accordion"
                className="text-right region-link-sm"
                id="oceania-region">
                <Card.Body className="py-0 px-0 mt-3">
                  {
                    countriesOceania.map((country, idx) =>
                      <Nav.Item
                        key={idx}
                        className={i18n.translator.language === "ar" ? "country-link-sm-ar" : "country-link-sm"}
                        onClick={() => chooseShippingCountry(country.name)}>
                        <Trans>{country.name}</Trans>
                      </Nav.Item>
                    )
                  }
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Row>
      </Col>
      <Col className="d-none d-md-block" md={2} lg={3} xl={4}></Col>
    </Row>
  </Container>
);

export default withTranslation()(ShippingCountryListComponent);
