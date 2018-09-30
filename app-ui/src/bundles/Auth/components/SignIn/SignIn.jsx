// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Col, Grid, Panel, Row } from 'react-bootstrap';
import { Form, Control } from 'react-redux-form';
import { withI18n, Trans } from 'lingui-react';
import { isRequired } from 'util/Validator';
import { modelPath } from 'bundles/Auth/modules/SignInModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import Spinner from 'components/Spinner';
import config from 'config/index';
import type { FormProps } from 'util/Form';

import './SignIn.scss';

type Props = {
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  onSignIn: () => any,
}

export const SignInComponent = ({
  form, isPending, i18n, onSignIn,
}: Props) => (
  <Grid className="signin-register-container">
    <Row>
      <Col md={6} mdPush={6}>
        <Row className="signin-header">{i18n.t`LOGIN`}</Row>
        <Row>
          <div className="signin-container">
            <Form model={modelPath} onSubmit={onSignIn} autoComplete="off">
              <FormControl
                id="email"
                formProps={form.email}
                controlProps={{
                  type: 'email',
                  placeholder: i18n.t`EMAIL`,
                  maxLength: 255,
                }}
                validators={{
                  isRequired,
                  isEmail,
                }}
              />
              <FormControl
                id="password"
                formProps={form.password}
                controlProps={{
                  type: 'password',
                  placeholder: i18n.t`PASSWORD`,
                }}
                validators={{
                  isRequired,
                }}
              />
              <Control.checkbox
                model=".rememberMe"
                component={Checkbox}
              >
                <Trans>Stay signed in</Trans>
              </Control.checkbox>
              <Button id="sign-in-btn" type="submit" disabled={!form.$form.valid || isPending} block>
                {isPending ? <div><Spinner /> <Trans>LOGIN</Trans></div> : <Trans>LOGIN</Trans>}
              </Button>
            </Form>
            <p className="password-recovery-link">
              <Link to={config.route.auth.passwordRecovery}><Trans>Forgot your password?</Trans></Link>
            </p>
          </div>
        </Row>
      </Col>
      <Col md={6} mdPush={6}>
        <Row className="register-header">{i18n.t`REGISTER`}</Row>
        <Row>
          <p id="register-title">DISCOVER ALL OF THE EXCLUSIVE SERVICES RESERVED FOR OUR REGISTERED CUSTOMERS:</p>
          <p id="register-txt1">USE WISHLIST TO SAVE YOUR FAVOURITE PRODUCTS</p>
          <p id="register-txt2">COMPLETE CHECKOUT MORE QUICKLY</p>
          <p id="register-txt3">REVIEW ORDER INFORMATION AND TRACKING</p>
          <p id="register-txt4">SAVE YOUR DETAILS AND PREFERENCES</p>
          <Link id="createaccount-link" to={config.route.auth.signUp}><Trans>CREATE AN ACCOUNT</Trans></Link>
        </Row>
      </Col>
    </Row>
  </Grid>
);

export default withI18n()(SignInComponent);
