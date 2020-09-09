// @flow
import React from 'react';
import { Form, Control } from 'react-redux-form';
import { modelPath } from 'modules/StoreLocatorModule';
import CoreContainer from 'containers/CoreContainer';
import { withTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import './StoreLocator.scss';

import listOfStores from '../../static/json/storesByCountry.json';
import listOfAddresses from '../../static/json/storeAddresses.json';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  country: string,
  findStore: (data: Object) => any,
  selectCountry: (data: string) => any,
  selectStore: (data: string) => any,
  store: string,
};

export const StoreLocatorComponent = ({
  i18n, t, country, findStore, selectCountry,
  store, selectStore,
}: Props) => (
  <CoreContainer>
    <Container className="px-0 flex-grow-1" fluid>
      <Row>
        <Col className="d-none d-lg-flex" lg={2}></Col>
        <Col xs={12} lg={8} className="my-3 pl-4">
          <Form model={modelPath}
                onSubmit={findStore} autoComplete="off" hideNativeErrors>
            <ListGroup id="find-store-forms" horizontal>
              <ListGroup.Item className="pl-0">
                <Control.select
                  model=".country"
                  className="py-1 pl-1 pr-4 findstore-select"
                  id={i18n.translator.language === "ar" ? "select-country-ar" : "select-country"}
                  onChange={(data) => selectCountry(data.target.value)}>
                  <option value="">{t('chooseCountry')}</option>
                  <option value="Italy">{t('Italy')}</option>
                  <option value="France">{t('France')}</option>
                  <option value="Lebanon">{t('Lebanon')}</option>
                </Control.select>
              </ListGroup.Item>
              <ListGroup.Item className="pl-1">
                {
                  country === '' &&
                  <Control.select
                    model=".store"
                    className="py-1 pl-1 pr-4 findstore-select"
                    id={i18n.translator.language === "ar" ? "select-store-ar" : "select-store"}>
                    <option value="">{t('chooseStore')}</option>
                  </Control.select>
                }
                {
                  listOfStores.map((data, index) =>
                  <div key={index}>
                    {
                      data.country === country &&
                      <Control.select
                        model=".store"
                        className="py-1 pl-1 pr-4 findstore-select"
                        id={i18n.translator.language === "ar" ? "select-store-ar" : "select-store"}
                        onChange={(data) => selectStore(data.target.value)}>
                        <option value="">{t('chooseStore')}</option>
                        {data.addresses.map((address, idx) =>
                        <option key={idx} value={address.address}>{address.address}</option>
                        )}
                      </Control.select>
                    }
                  </div>
                  )
                }
              </ListGroup.Item>
            </ListGroup>
          </Form>
        </Col>
        <Col className="d-none d-lg-flex" lg={2}></Col>
      </Row>
      {
        store !== '' ?
        <Row className="px-0 flex-grow-1">
          <Col xs={12} md={6} className="pl-4">
            <div id="map-image"></div>
          </Col>
          <Col xs={12} md={6} className="pl-4 pr-2">
            {
              listOfAddresses.map((address, index) =>
              address.address === store &&
              <div className="d-flex flex-column" key={index}>
                <div className="text-uppercase" id="address-title">
                  {address.title}
                </div>
                <div className="mt-2" id="store-categories">
                  {address.categories}
                </div>
                <ul className="mt-2 text-uppercase" id="store-address">
                  <li>{address.street}</li>
                  <li>{address.city}</li>
                  <li>{address.zipcode}</li>
                  <li className="mt-1" id="store-telephone">
                    T: {address.telephone}
                  </li>
                </ul>
                <ul className="mt-2" id="store-hours">
                  Opening hours: <br />
                  {
                    address.hours.map((data, idx) =>
                    <li key={idx}>{data.content}</li>
                    )
                  }
                </ul>
                <div id="store-email">{address.email}</div>
              </div>
              )
            }
          </Col>
        </Row>
        :
        <Row className="px-0 flex-grow-1">
          <div className="" id="store-image"></div>
        </Row>
      }
    </Container>
  </CoreContainer>
);

export default withTranslation()(StoreLocatorComponent);
