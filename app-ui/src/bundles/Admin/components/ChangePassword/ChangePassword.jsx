// @flow
import React from 'react';
import { Button, Glyphicon, Grid, Row } from 'react-bootstrap';
import { Form } from 'react-redux-form';
import { withI18n, Trans } from 'lingui-react';
import { isRequired } from 'util/Validator';
import { modelPath } from 'bundles/Admin/modules/ChangePasswordModule';
import FormControl from 'components/FormControl';
import Spinner from 'components/Spinner';
import type { FormProps } from 'util/Form';
import zxcvbn from 'zxcvbn';

type Props = {
  userID: string,
  score: string,
  isHidden: boolean,
  isHidden2: boolean,
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  onUpdate: (userID: string, data: Object) => any,
  onToggleMask: () => any,
  onToggleMask2: () => any,
  onCheckPasswordStrength: () => any,
}

const strength = {
  0: "Too short",
  1: "Weak",
  2: "Good",
  3: "Strong",
  4: "Very strong"
}

export const ChangePasswordComponent = ({
  score, isHidden, isHidden2, userID, form, isPending, i18n, onUpdate, onToggleMask,
  onToggleMask2, onCheckPasswordStrength,
}: Props) => (
  <Form model={modelPath} onSubmit={data => onUpdate(userID, data)} autoComplete="off">
    <Grid className="password-container">
      <Row className="password-content">
        <Row className="oldpassword-content">
          <FormControl
            id="oldPassword"
            formProps={form.oldPassword}
            controlProps={{
              type: isHidden ? 'password' : 'text',
              placeholder: i18n.t`Password`,
            }}
            validators={{
              isRequired
            }}
          />
          <Button id="toggle-btn1" onClick={() => onToggleMask()}>
            <Glyphicon glyph={isHidden ? 'eye-close' : 'eye-open'} />
          </Button>
        </Row>
        <Row className="newpassword-content">
          <FormControl
            id="password"
            formProps={form.password}
            controlProps={{
              type: isHidden2 ? 'password' : 'text',
              placeholder: i18n.t`New Password`,
            }}
            validators={{
              scoreVeryStrong: (val) => zxcvbn(val).score > 1,
            }}
            onChange={(modelValue) => onCheckPasswordStrength(modelValue.target.value)}
          />
         <Button id="toggle-btn2" onClick={() => onToggleMask2()}>
            <Glyphicon glyph={isHidden2 ? 'eye-close' : 'eye-open'} />
          </Button>
        </Row>
      </Row>
      <Row className="password-strength-meter">
        <span className="password-strength-txt" data-score={score}>
          {!form.$form.pristine &&
            (
              score === '' && form.password.touched ?
              'Please enter a password' :
              strength[score]
            )
          }
        </span>
        {!form.$form.pristine &&
          <meter max="4" className="password-strength" data-score={score}></meter>
        }
      </Row>
    </Grid>
    <Button className="change-password-btn" type="submit" disabled={!form.$form.valid || isPending} block>
      {isPending ? <div><Spinner /> <Trans>Update</Trans></div> : <Trans>Update</Trans>}
    </Button>
  </Form>
);

export default withI18n()(ChangePasswordComponent);
