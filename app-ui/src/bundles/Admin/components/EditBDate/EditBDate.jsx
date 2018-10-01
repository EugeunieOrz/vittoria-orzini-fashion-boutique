// @flow
import React from 'react';
import { Button } from 'react-bootstrap';
import { withI18n, Trans } from 'lingui-react';
import { Form, Control, Errors } from 'react-redux-form';
import FormControl from 'components/FormControl';
import Spinner from 'components/Spinner';
import type { FormProps } from 'util/Form';
import config from 'config/index';
import { modelPath } from 'bundles/Admin/modules/UpdateModule';

import days from 'static/days';
import daysEven from 'static/days_even';
import daysFeb from 'static/days_February';
import daysFebLeap from 'static/days_Feb_leap_year';
import months from 'static/months_en';
import years from 'static/years';

type Props = {
  isPending: boolean,
  day: string,
  form: {[string]: FormProps},
  i18n: Object,
  month: string,
  onSelectDay: () => any,
  onSelectMonth: () => any,
  onSelectYear: () => any,
  onUpdate: (userID: string, data: Object) => any,
  userID: string,
  year: string,
};

export const EditBDateComponent = ({
  day, form, i18n, month, onSelectDay, onSelectMonth, onSelectYear, onUpdate, userID, year, isPending,
}: Props) => (
  <Form model={modelPath} onSubmit={data => onUpdate(userID, data)}>
    <Control.select model=".bday"
                    id=".bday"
                    onChange={(d) => onSelectDay(d.target.value)}
    >
      {
        (month === 'February' && (year === '2020' || year === '2016' || year === '2012' ||
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
    <Control.select model=".bmonth"
                    id=".bmonth"
                    onChange={(m) => onSelectMonth(m.target.value)}
    >
      {months.map((month, index) => <option key={index} value={month.MONTH}>{month.MONTH}</option>)}
    </Control.select>
    <Control.select model=".byear"
                    id=".byear"
                    onChange={(y) => onSelectYear(y.target.value)}
    >
      {years.map((year, index) => <option key={index} value={year.YEAR}>{year.YEAR}</option>)}
    </Control.select>
    <Button id="change-bdate" type="submit" disabled={!form.$form.valid || isPending} block>
      {isPending ? <div><Spinner /> <Trans>SAVE</Trans></div> : <Trans>SAVE</Trans>}
    </Button>
  </Form>
);

export default withI18n()(EditBDateComponent);
