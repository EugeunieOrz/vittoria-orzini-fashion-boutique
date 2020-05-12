// @flow
import React from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { Form } from 'react-redux-form';
import { withI18n, Trans } from '@lingui/react';
import { isRequired } from 'util/Validator';
import { modelPath } from 'bundles/Auth/modules/ResetPasswordModule';
import FormControl from 'components/FormControl';
import Spinner from 'components/Spinner';
import type { FormProps } from 'util/Form';
import zxcvbn from 'zxcvbn';

import './ResetPassword.scss';

type Props = {
  score: string,
  isHidden: boolean,
  token: string,
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  onReset: (token: string, data: Object) => any,
  onToggleMask: () => any,
  onCheckPasswordStrength: () => any,
}

const strength = {
  0: "Too short",
  1: "Weak",
  2: "Good",
  3: "Strong",
  4: "Very strong"
}

export const ResetPasswordComponent = ({
  score, isHidden, token, form, isPending, i18n, onReset, onToggleMask, onCheckPasswordStrength,
}: Props) => (
  <Grid className="reset-password">
    <Row id="reset-password-header">{i18n.t`Reset password`}</Row>
    <Row id="strong-password-advice">
      <Trans>Strong passwords include numbers, letters and special characters.</Trans>
    </Row>
    <Form model={modelPath} onSubmit={data => onReset(token, data)} autoComplete="off">
      <Grid className="password-container">
        <Col xs={12} md={8}>
          <Row className="password-content">
            <FormControl
              id="password"
              formProps={form.password}
              controlProps={{
                type: isHidden ? 'password' : 'text',
                placeholder: i18n.t`Password`,
              }}
              validators={{
                scoreVeryStrong: (val) => zxcvbn(val).score > 1,
              }}
              onChange={(modelValue) => onCheckPasswordStrength(modelValue.target.value)}
            />
          </Row>
          <Row className="password-strength-meter">
            <span className="password-strength-txt" data-score={score}>
            {
              score === '' && form.password.touched ?
              'Please enter a password' :
              strength[score]
            }
            </span>
            <meter max="4" className="password-strength" data-score={score}></meter>
          </Row>
        </Col>
        <Col xs={6} md={4}>
          <Button id="toggle-btn" onClick={() => onToggleMask()}>{isHidden ? 'Show' : 'Hide'}</Button>
        </Col>
      </Grid>
      <Button className="reset-password-btn" type="submit" disabled={!form.$form.valid || isPending} block>
        {isPending ? <div><Spinner /> <Trans>Reset</Trans></div> : <Trans>Reset</Trans>}
      </Button>
    </Form>
  </Grid>
);

export default withI18n()(ResetPasswordComponent);
