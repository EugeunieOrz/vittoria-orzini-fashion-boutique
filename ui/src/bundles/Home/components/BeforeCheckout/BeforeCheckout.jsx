// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import config from 'config/index';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CheckEmailContainer from 'bundles/Home/containers/CheckEmailContainer';

import './BeforeCheckout.scss';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  i18n: Object,
  t: Object,
  route: (string) => any,
  shoppingBag: Object,
}

export const BeforeCheckoutComponent = ({
  i18n, t, route, shoppingBag,
}: Props) => (
<Container className="mb-2 flex-grow-1" fluid>
  {
    Object.keys(shoppingBag).length !== 0 ?
    <div>
      <Row className="mt-2 mb-4 py-2 row d-flex flex-row justify-content-center" id="beforecheckout-title-row">
        <div id={
            i18n.translator.language === "ar" ?
            "beforecheckout-title-ar" : "beforecheckout-title"
          }>
          {t('CHECKOUT')}
        </div>
      </Row>
      <CheckEmailContainer />
    </div>
    :
    <Row
      className="mt-5 pt-5 d-flex flex-column justify-content-center"
      id={
        i18n.translator.language === "ar" ?
        "beforecheckout-empty-ar" :
        "beforecheckout-empty"
      }>
      <div className="align-self-center text-center">
        <p>
          {t('Your Shopping Bag is empty')}
        </p>
        <Button
          className="mt-1"
          id={
            i18n.translator.language === "ar" ?
            "beforecheckout-empty-btn-ar" :
            "beforecheckout-empty-btn"
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

export default withTranslation()(BeforeCheckoutComponent);
