// @flow
import React from 'react';
import { Button, Grid, Row } from 'react-bootstrap';
import { Control, Field, Form } from 'react-redux-form';
import { withI18n, Trans } from 'lingui-react';
import Spinner from 'components/Spinner';
import config from 'config/index';
import type { FormProps } from 'util/Form';

import './PasswordSurvey.scss';

type Props = {
  userID: Object,
  i18n: Object,
  onSubmit: (data: Object) => any,
  onToggleBtn: (v: string) => any,
  passwordSurvey: string,
}

export const PasswordSurveyComponent = ({
  i18n, onSubmit, userID, onToggleBtn, passwordSurvey,
}: Props) => (
  <Grid className="password-survey-container">
    <Row className="password-survey-header">{i18n.t`Why did you change your password?`}</Row>
      <Control model="passwordSurvey"
               type="radio"
               value="forgot password"
               checked={passwordSurvey === "forgot password"}
               onChange={(v) => onToggleBtn(v.target.value)}
      /><label>Forgot password</label>
    <Control model="passwordSurvey"
             type="radio"
             value="account may have been accessed by someone else"
             checked={passwordSurvey === "account may have been accessed by someone else"}
             onChange={(v) => onToggleBtn(v.target.value)}
      /><label>Account may have been accessed by someone else</label>
    <Control model="passwordSurvey"
             type="radio"
             value="another reason"
             checked={passwordSurvey === "another reason"}
             onChange={(v) => onToggleBtn(v.target.value)}
      /><label>Another reason</label>
    <Button id="submit-btn" onClick={() => onSubmit({
        userID : userID.replace("BSONObjectID(\"", "").replace("\")", ""), psInfo : passwordSurvey
      })}>
      <Trans>SUBMIT</Trans>
    </Button>
  </Grid>
);

export default withI18n()(PasswordSurveyComponent);
