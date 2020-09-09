// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config/index';
import { withTranslation, Trans } from "react-i18next";
import CoreContainer from 'containers/CoreContainer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './ClientService.scss';

import arrowDown from '../../static/icons/arrow_down.svg';
import arrowUp from '../../static/icons/arrow_up.svg';
import phoneIcon from '../../static/icons/phone.svg';
import envelopeIcon from '../../static/icons/envelope.svg';
import clientServiceSection from '../../static/json/clientServiceSection.json';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  csqKey: string,
  decorateCSQHeader: (currentKey: string, id: string) => any,
  proceedToReturnForm: (userID: string) => any,
  userID: string,
};

export const ClientServiceComponent = ({
  i18n, t, csqKey, decorateCSQHeader, proceedToReturnForm, userID,
}: Props) => (
  <CoreContainer>
    <Row>
      <Col className="d-none d-lg-flex" lg={2}></Col>
      <Col xs={12} lg={8} className="mt-3 mb-5 px-4">
        <Row
          className="d-flex justify-content-center"
          id={i18n.translator.language === "ar" ? "client-service-header-ar" : "client-service-header"}>
          {t('clientService').toUpperCase()}
        </Row>
        <Row
          className={
            i18n.translator.language === "ar" ?
            "mt-5 px-4 d-flex flex-column text-right" :
            "mt-5 px-4 d-flex flex-column"
          }
          id={
            i18n.translator.language === "ar" ?
            "client-service-welcome-txt-ar" :
            "client-service-welcome-txt"
          }>
          <p>{t('clientServicewelcomeToVO')}</p>
          <p>{t('clientServicewelcomeToVO2')}</p>
          <p>{t('clientServicewelcomeToVO3')}</p>
          <p>{t('clientServicewelcomeToVO4')}</p>
          <p>
            {t('clientServicewelcomeToVO5')} <br /> Vittoria Orzini
          </p>
          <ListGroup
            className="justify-content-around"
            id={
              i18n.translator.language === "ar" ?
              "client-service-contacts-ar" :
              "client-service-contacts"}
            horizontal>
            <ListGroup.Item className="text-center">
              <a href="tel:+0123456789">
                <Image className="mb-3" src={phoneIcon} width="24" height="24" alt="Phone" />
                <div>{t('telephoneNumber')}</div>
                <div>{t('timetable')}</div>
              </a>
            </ListGroup.Item>
            <ListGroup.Item className="text-center">
              <a href="mailto:vittoriaorzini@gmail.com">
                <Image className="mb-3" src={envelopeIcon} width="24" height="24" alt="Envelope" />
                <div>{t('sendMsg1')}</div>
                <div>{t('sendMsg2')}</div>
              </a>
            </ListGroup.Item>
          </ListGroup>
          <Row
            id={i18n.translator.language === "ar" ? "client-service-faq-ar" : "client-service-faq"}
            className="mt-5 justify-content-center">
            <p className="text-uppercase">{t('faqTitle')}</p>
          </Row>
          <Tabs
            defaultActiveKey="Returns"
            id="client-service-tabs"
            className={
              i18n.translator.language === "ar" ?
              "mt-2 justify-content-around border-0 client-service-tabs-ar" :
              "mt-2 justify-content-around border-0 client-service-tabs"
            }>
            {
              clientServiceSection.map((section, index) =>
              <Tab
                key={index}
                eventKey={section.name}
                title={t(`${section.name}`)}>
                <div className={
                    i18n.translator.language === "ar" ?
                    "my-4 q-section-title-ar" :
                    "my-4 q-section-title"
                  }>
                  <Trans>{section.name}</Trans>
                </div>
                <Accordion id="client-service-accordion">
                  {
                    section.questions.map((q, idx) =>
                    <Card
                      className="mb-1 border-right-0 border-left-0 client-service-card"
                      key={idx}>
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey={q.name}
                        className="d-flex align-items-center justify-content-between pl-0 pr-0 border-bottom-0 cs-card-header"
                        onClick={() => decorateCSQHeader({
                          currentKey: csqKey,
                          id: q.name
                        })}>
                        <div className={
                            i18n.translator.language === "ar" ?
                            "q-link-ar" : "q-link"
                          }>
                          <Trans>{q.name}</Trans>
                        </div>
                        <Image
                          src={csqKey === q.name ? arrowUp : arrowDown}
                          width="32" height="32" alt="Arrow" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey={q.name}
                        data-parent="#client-service-accordion"
                        id={q.name}>
                        <Card.Body className={
                            i18n.translator.language === "ar" ?
                            "pr-0 pt-2 cs-card-content-ar" :
                            "pl-0 pt-2 cs-card-content"
                          }>
                          {
                            q.content === "whereIsMyOrder" &&
                            <div>
                              {t('whereIsMyOrder')}
                              <Link
                                className="mr-1"
                                to={config.route.followOrder}>
                                {t('orderInfo')}
                              </Link>
                              {t('page')} <br />
                              {t('whereIsMyOrder2')}
                              <Link
                                className="mr-1"
                                to={config.route.auth.signUp}>
                                {t('register')}
                              </Link>
                              {t('whereIsMyOrder3')}
                            </div>
                          }
                          {
                            q.content === "returnsPolicy" &&
                            <div>
                              {t('returnsPolicy')} <br /><br />
                              {t('returnsPolicy1')}
                              <span
                                id={
                                  i18n.translator.language === "ar" ?
                                  "returns-form-link-ar" :
                                  "returns-form-link"
                                }
                                onClick={() => proceedToReturnForm(userID)}>
                                {t('returnForm')}
                              </span>.<br />
                              {t('returnsPolicy2')} <br />
                              {t('returnsPolicy3')} <br />
                            {t('returnsPolicy4')} <br /><br />
                            </div>
                          }
                          {
                            q.content === "whereIsMyReturn" &&
                            <div>
                              {t('whereIsMyReturn')}
                              <Link to={config.route.followOrder}>{t('whereIsMyReturn2')}</Link>
                              {t('whereIsMyReturn3')}
                            </div>
                          }
                          {
                            q.content === "orderStatusQ" &&
                            <div>
                              {t('orderStatusQ')} <br />
                              {t('orderStatusQ2')} <br /><br />
                              {t('orderStatusQ3')} <br />
                              {t('orderStatusQ4')}
                              <Link to={config.route.followOrder}>{t('orderInfo')}</Link>
                              {t('orderStatusQ5')} <br />
                              {t('orderStatusQ6')}
                              <Link to={config.route.auth.signIn}>{t('My Account')}</Link>
                              {t('orderStatusQ7')}
                            </div>
                          }
                          {
                            q.content === "logIntoMyAccount" &&
                            <div>
                              {t('logIntoMyAccount')} <br /><br />
                              {t('logIntoMyAccount2')}
                            </div>
                          }
                          {
                            q.content === "someInfo" &&
                            <div>{t(`${q.content}`)}</div>
                          }
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  )}
                </Accordion>
              </Tab>
            )}
          </Tabs>
        </Row>
      </Col>
      <Col className="d-none d-lg-flex" lg={2}></Col>
    </Row>
  </CoreContainer>
);

export default withTranslation()(ClientServiceComponent);
