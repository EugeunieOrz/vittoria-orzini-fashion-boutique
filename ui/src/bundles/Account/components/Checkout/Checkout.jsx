// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { withTranslation } from "react-i18next";
import config from 'config/index';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Checkout1Container from 'bundles/Account/containers/Checkout/Checkout1Container';
import Checkout2Container from 'bundles/Account/containers/Checkout/Checkout2Container';
import Checkout3Container from 'bundles/Account/containers/Checkout/Checkout3Container';
import Checkout4Container from 'bundles/Account/containers/Checkout/Checkout4Container';

import AddNewAddressContainer from 'bundles/Account/containers/Addresses/AddNewAddressContainer';
import EditAddressContainer from 'bundles/Account/containers/Addresses/EditAddressContainer';

import AddNewCardContainer from 'bundles/Account/containers/CreditCards/AddNewCardContainer';
import EditCardContainer from 'bundles/Account/containers/CreditCards/EditCardContainer';

import '../Checkout.scss';

type Props = {
  addedItems: Array,
  addNewAddressIsShown: boolean,
  addNewCardIsShown: boolean,
  editAddressIsShown: boolean,
  editCardIsShown: boolean,
  addresses: Array,
  cards: Array,
  i18n: Object,
  route: (string) => any,
  t: Object,
  user: Object
}

export const CheckoutComponent = ({
  addedItems, addresses, cards, i18n, route, t, user,
  addNewCardIsShown, editCardIsShown,
  addNewAddressIsShown, editAddressIsShown,
}: Props) => (
  <Container className="mb-2 flex-grow-1" fluid>
    {
      editAddressIsShown &&
      <EditAddressContainer />
    }
    {
      addNewAddressIsShown &&
      <AddNewAddressContainer />
    }
    {
      addNewCardIsShown &&
      <AddNewCardContainer />
    }
    {
      editCardIsShown &&
      <EditCardContainer />
    }
    {
      typeof addedItems !== 'undefined' && addedItems.length > 0 && addedItems !== '' ?
      <div>
        <div className="d-flex flex-row justify-content-center text-center">
          {
            user.firstName && user.lastName ?
            <div id={
                i18n.translator.language === "ar" ?
                "checkout-title-name-ar" :
                "checkout-title-name"
              }>
              {t('orderingAs', {userName: user.firstName + ' ' + user.lastName, userEmail: user.email})}
            </div>
            :
            <div id={
                i18n.translator.language === "ar" ?
                "checkout-title-email-ar" :
                "checkout-title-email"
              }>
              {t('orderingAs2', {userEmail: user.email})}
            </div>
          }
        </div>
        {
          typeof addresses !== 'undefined' && addresses.length > 0 && addresses !== '' ?
          (
            typeof cards !== 'undefined' && cards.length > 0 && cards !== '' ?
            <Checkout4Container />
            :
            <Checkout2Container />
          )
          :
          (
            typeof cards !== 'undefined' && cards.length > 0 && cards !== '' ?
            <Checkout3Container />
            :
            <Checkout1Container />
          )
        }
      </div>
      :
      <Row
        className="mt-5 pt-5 d-flex flex-column justify-content-center"
        id={
          i18n.translator.language === "ar" ?
          "checkout-empty-ar" : "checkout-empty"
        }>
        <div className="align-self-center text-center">
          <p>
            {t('Your Shopping Bag is empty')}
          </p>
          <Button
            className="mt-1"
            id={
              i18n.translator.language === "ar" ?
              "checkout-empty-btn-ar" : "checkout-empty-btn"
            }
            type="button"
            onClick={() => route(config.route.fashion.newIn)}>
            {t('BACK TO SHOPPING')}
          </Button>
        </div>
      </Row>
    }
  </Container>
);

export default withTranslation()(CheckoutComponent);
