// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CompleteSignInContainer from 'bundles/Home/containers/CompleteSignInContainer';
import CreateAccountContainer from 'bundles/Home/containers/CreateAccountContainer';
import CheckEmailContainer from 'bundles/Home/containers/CheckEmailContainer';
import config from 'config/index';
import './SignInOrSignUp.scss';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  i18n: Object,
  t: Object,
  completeSignInIsOn: boolean,
  shouldCreateAccount: boolean,
  route: (string) => any,
  shoppingBag: Object,
}

export const SignInOrSignUpComponent = ({
  i18n, t, route, shoppingBag,
  completeSignInIsOn, shouldCreateAccount,
}: Props) => (
<Container className="mb-2 flex-grow-1" fluid>
  {
    Object.keys(shoppingBag).length !== 0 ?
    <div>
      <Row className="mt-2 mb-4 py-2 row d-flex flex-row justify-content-center" id="signinOrSignup-title-row">
        <div id={
            i18n.translator.language === "ar" ?
            "signinOrSignup-title-ar" : "signinOrSignup-title"
          }>
          {t('CHECKOUT')}
        </div>
      </Row>
      {
        completeSignInIsOn === "true" &&
        (!shouldCreateAccount || shouldCreateAccount === "false") &&
        <CompleteSignInContainer />
      }
      {
        shouldCreateAccount === "true" &&
        (!completeSignInIsOn || completeSignInIsOn === "false") &&
        <CreateAccountContainer />
      }
      {
        ((completeSignInIsOn === "false" && shouldCreateAccount === "false") ||
        (!completeSignInIsOn && !shouldCreateAccount)) &&
        <CheckEmailContainer />
      }
    </div>
    :
    <Row
      className="mt-5 pt-5 d-flex flex-column justify-content-center"
      id={
        i18n.translator.language === "ar" ?
        "signinOrSignup-empty-ar" :
        "signinOrSignup-empty"
      }>
      <div className="align-self-center text-center">
        <p>
          {t('Your Shopping Bag is empty')}
        </p>
        <Button
          className="mt-1"
          id={
            i18n.translator.language === "ar" ?
            "signinOrSignup-empty-btn-ar" :
            "signinOrSignup-empty-btn"
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

export default withTranslation()(SignInOrSignUpComponent);
