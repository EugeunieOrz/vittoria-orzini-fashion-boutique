// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import { Form, Control } from 'react-redux-form';
import type { FormProps } from 'util/Form';
import { modelPath } from 'bundles/Account/modules/AccountDetails/UpdateModule';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import './EditBDate.scss';

import days from '../../../../../static/json/days';
import daysIT from '../../../../../static/json/days_it';
import daysEven from '../../../../../static/json/days_even';
import daysEvenIT from '../../../../../static/json/days_even_it';
import daysFeb from '../../../../../static/json/days_February';
import daysFebIT from '../../../../../static/json/days_February_it';
import daysFebLeap from '../../../../../static/json/days_Feb_leap_year';
import daysFebLeapIT from '../../../../../static/json/days_Feb_leap_year_it';
import months from '../../../../../static/json/months_en';
import monthsIT from '../../../../../static/json/months_it';
import years from '../../../../../static/json/years';
import yearsIT from '../../../../../static/json/years_it';
import closeSign from '../../../../../static/icons/close.svg';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  isPending: boolean,
  day: string,
  form: {[string]: FormProps},
  i18n: Object,
  t: Object,
  month: string,
  onSelectDay: () => any,
  onSelectMonth: () => any,
  onSelectYear: () => any,
  onUpdate: (userID: string, data: Object) => any,
  toggleBDate: () => any,
  userID: string,
  year: string,
};

export const EditBDateComponent = ({
  day, form, i18n, month, onSelectDay, onSelectMonth, onSelectYear, onUpdate, userID, year, isPending, t,
  toggleBDate,
}: Props) => (
  <Container
    id={
      i18n.translator.language === "ar" ?
      "editbdate-container-ar" : "editbdate-container"
    }
    className="d-flex flex-column" fluid>
    <Row
      className="flex-grow-1 px-1 px-md-3 px-lg-0"
      id={
        i18n.translator.language === "ar" ?
        "editbdate-inner-ar" : "editbdate-inner"
      }>
      <Col className="d-none d-sm-flex" xs={12} sm={2} md={4}></Col>
      <Col xs={12} sm={8} md={4} className="align-items-center">
        <Row className="d-flex flex-row mt-1 mb-5" id="editbdate-header">
          <div
            className="flex-grow-1 mt-2 pb-1 text-center"
            id={
              i18n.translator.language === "ar" ?
              "editbdate-title-ar" : "editbdate-title"
            }>
            {t('CHANGE YOUR DATE OF BIRTH')}
          </div>
          <Image
            className="mb-2"
            id="editbdate-close-btn"
            src={closeSign}
            alt=""
            width="24"
            height="24"
            onClick={() => toggleBDate()} />
        </Row>
        {
          i18n.translator.language === 'it' ?
          <Form
            className="d-flex flex-column mb-5"
            model={modelPath}
            onSubmit={data => onUpdate(userID, data)}>
            <div className="d-flex flex-row justify-content-around">
              <Control.select
                model=".bday"
                id=".bday"
                onChange={(d) => onSelectDay(d.target.value)}
              >
                {
                  (month === 'Febbraio' &&
                  (year === '2020' || year === '2016' || year === '2012' ||
                  year === '2008' || year === '2004' || year === '2000' ||
                  year === '1996' || year === '1992' || year === '1988' ||
                  year === '1984' || year === '1980' || year === '1976' ||
                  year === '1972' || year === '1968' || year === '1964' ||
                  year === '1960' || year === '1956' || year === '1952' ||
                  year === '1948' || year === '1944' || year === '1940' ||
                  year === '1936' || year === '1932' || year === '1928' ||
                  year === '1924' || year === '1920' || year === '1916' ||
                  year === '1912' || year === '1908' || year === '1904')) ?
                  daysFebLeapIT.map((day, index) => <option key={index} value={day.DAY}>{day.DAY}</option>) :
                  (
                    ((year !== '2020') && month === 'Febbraio') ?
                    daysFebIT.map((day, index) => <option key={index} value={day.DAY}>{day.DAY}</option>) :
                    (
                      (month === 'Aprile' || month === 'Giugno' || month === 'Settembre' || month === 'Novembre') ?
                      daysEvenIT.map((day, index) => <option key={index} value={day.DAY}>{day.DAY}</option>) :
                      daysIT.map((day, index) => <option key={index} value={day.DAY}>{day.DAY}</option>)
                    )
                  )
                }
              </Control.select>
              <Control.select
                model=".bmonth"
                id=".bmonth"
                onChange={(m) => onSelectMonth(m.target.value)}
              >
                {monthsIT.map((month, index) =>
                  <option key={index} value={month.month}>{month.month}</option>)}
              </Control.select>
              <Control.select
                model=".byear"
                id=".byear"
                onChange={(y) => onSelectYear(y.target.value)}
              >
                {yearsIT.map((year, index) => <option key={index} value={year.YEAR}>{year.YEAR}</option>)}
              </Control.select>
            </div>
            <Button
              className="align-self-center mt-5"
              id={
                isPending ?
                "editbdate-pending-it-btn" :
                "editbdate-btn"
              }
              type="submit"
              disabled={
                (
                  (day === '' || day === 'GIORNO') ||
                  (month === '' || month === 'MESE') ||
                  (year === '' || year === 'ANNO')
                )
                || isPending}>
              {isPending ? <Trans>LOADING</Trans> : <Trans>SAVE</Trans>}
            </Button>
          </Form>
          :
          <Form
            className="d-flex flex-column mb-5"
            model={modelPath}
            onSubmit={data => onUpdate(userID, data)}>
            <div className="d-flex flex-row justify-content-around">
              <Control.select
                model=".bday"
                id=".bday"
                onChange={(d) => onSelectDay(d.target.value)}
              >
                {
                  (month === 'February' &&
                  (year === '2020' || year === '2016' || year === '2012' ||
                  year === '2008' || year === '2004' || year === '2000' ||
                  year === '1996' || year === '1992' || year === '1988' ||
                  year === '1984' || year === '1980' || year === '1976' ||
                  year === '1972' || year === '1968' || year === '1964' ||
                  year === '1960' || year === '1956' || year === '1952' ||
                  year === '1948' || year === '1944' || year === '1940' ||
                  year === '1936' || year === '1932' || year === '1928' ||
                  year === '1924' || year === '1920' || year === '1916' ||
                  year === '1912' || year === '1908' || year === '1904')) ?
                  daysFebLeap.map((day, index) => <option key={index} value={day.DAY}>{day.DAY}</option>) :
                  (
                    ((year !== '2020') && month === 'February') ?
                    daysFeb.map((day, index) => <option key={index} value={day.DAY}>{day.DAY}</option>) :
                    (
                      (month === 'April' || month === 'June' || month === 'September' || month === 'November') ?
                      daysEven.map((day, index) => <option key={index} value={day.DAY}>{day.DAY}</option>) :
                      days.map((day, index) => <option key={index} value={day.DAY}>{day.DAY}</option>)
                    )
                  )
                }
              </Control.select>
              <Control.select
                model=".bmonth"
                id=".bmonth"
                onChange={(m) => onSelectMonth(m.target.value)}
              >
                {months.map((month, index) =>
                  <option key={index} value={month.MONTH}>{month.MONTH}</option>)}
              </Control.select>
              <Control.select
                model=".byear"
                id=".byear"
                onChange={(y) => onSelectYear(y.target.value)}
              >
                {years.map((year, index) => <option key={index} value={year.YEAR}>{year.YEAR}</option>)}
              </Control.select>
            </div>
            <Button
              className="align-self-center mt-5"
              id={
                isPending ?
                (
                  i18n.translator.language === "ar" ?
                  "editbdate-pending-ar-btn" :
                  "editbdate-pending-btn"
                ) :
                (
                  i18n.translator.language === "ar" ?
                  "editbdate-ar-btn" :
                  "editbdate-btn"
                )
              }
              type="submit"
              disabled={
                (
                  (day === '' || day === 'DAY') ||
                  (month === '' || month === 'MONTH') ||
                  (year === '' || year === 'YEAR')
                )
                || isPending
              }>
              {isPending ? <Trans>LOADING</Trans> : <Trans>SAVE</Trans>}
            </Button>
          </Form>
        }
      </Col>
      <Col className="d-none d-sm-flex" xs={12} sm={2} md={4}></Col>
    </Row>
  </Container>
);

export default withTranslation()(EditBDateComponent);
