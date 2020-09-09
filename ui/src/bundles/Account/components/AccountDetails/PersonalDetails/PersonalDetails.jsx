// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './PersonalDetails.scss';

type Props = {
  i18n: Object,
  t: Object,
  userName: string,
  userEmail: string,
  bdate: string,
  onToggleName: () => any,
  onToggleEmail: () => any,
  onTogglePasswordForm: () => any,
  onToggleBDate: () => any,
}

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

export const PersonalDetailsComponent = ({
  i18n, t, userName, userEmail, bdate,
  onToggleName, onToggleEmail, onTogglePasswordForm, onToggleBDate
}: Props) => (
  <Row
    id={
      i18n.translator.language === "ar" ?
      "personal-details-ar" : "personal-details"
    }
    className="my-5 mx-0 mx-lg-4">
    <Col xs={12}>
      <Row>
        <Col xs={6}
          className={
            i18n.translator.language === "ar" ?
            "d-flex align-items-center text-right" : "d-flex align-items-center"
          }>
          <div id={
              i18n.translator.language === "ar" ?
              "myaccount-name-ar" : "myaccount-name"
            }>
            {t('name', {name: userName})}
          </div>
        </Col>
        <Col md={2} lg={3} className="d-none d-md-flex"></Col>
        <Col xs={6} md={4} lg={3} className="d-flex justify-content-center">
          <Button onClick={() => onToggleName()}>
            {t('CHANGE YOUR NAME')}
          </Button>
        </Col>
      </Row>
    </Col>
    <Col xs={12}>
      <Row>
        <Col xs={6}
          className={
            i18n.translator.language === "ar" ?
            "d-flex align-items-center text-right" : "d-flex align-items-center"
          }>
          <div id={
              i18n.translator.language === "ar" ?
              "myaccount-email-ar" : "myaccount-email"
            }>
            {t('emailAddress', {email: userEmail})}
          </div>
        </Col>
        <Col md={2} lg={3} className="d-none d-md-flex"></Col>
        <Col xs={6} md={4} lg={3} className="d-flex justify-content-center">
          <Button onClick={() => onToggleEmail()}>
            {t('CHANGE YOUR EMAIL')}
          </Button>
        </Col>
      </Row>
    </Col>
    <Col xs={12}>
      <Row>
        <Col xs={6}
          className={
            i18n.translator.language === "ar" ?
            "d-flex align-items-center text-right" :
            "d-flex align-items-center"
          }>
          <div id={
              i18n.translator.language === "ar" ?
              "myaccount-passwd-ar" : "myaccount-passwd"
            }>
            {t('Password')}
          </div>
        </Col>
        <Col md={2} lg={3} className="d-none d-md-flex"></Col>
        <Col xs={6} md={4} lg={3} className="d-flex justify-content-center">
          <Button onClick={() => onTogglePasswordForm()}>
            {t('CHANGE YOUR PASSWORD')}
          </Button>
        </Col>
      </Row>
    </Col>
    <Col xs={12}>
      <Row>
        <Col xs={6}
          className={
            i18n.translator.language === "ar" ?
            "d-flex align-items-center text-right" :
            "d-flex align-items-center"
          }>
          <div id={
              i18n.translator.language === "ar" ?
              "myaccount-birthdate-ar" : "myaccount-birthdate"
            }>
            {t('dateOfBirth', {bdate: bdate})}
          </div>
        </Col>
        <Col md={2} lg={3} className="d-none d-md-flex"></Col>
        <Col xs={6} md={4} lg={3} className="d-flex justify-content-center">
          <Button onClick={() => onToggleBDate()}>
            {t('CHANGE YOUR DATE OF BIRTH')}
          </Button>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default withTranslation()(PersonalDetailsComponent);
