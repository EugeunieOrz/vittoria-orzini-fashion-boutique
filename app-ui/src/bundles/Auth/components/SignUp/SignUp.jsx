// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Col, FormGroup, Glyphicon, Grid, InputGroup, Row } from 'react-bootstrap';
import { actions, Errors, Form, Control } from 'react-redux-form';
import { withI18n, Trans } from '@lingui/react';
import { isLatin, isRequired, required, titleRequired, validPassword } from 'util/Validator';
import { modelPath } from 'bundles/Auth/modules/SignUpModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import Spinner from 'components/Spinner';
import config from 'config/index';
import type { FormProps } from 'util/Form';
import zxcvbn from 'zxcvbn';

import './SignUp.scss';

type Props = {
  score: string,
  isHidden: boolean,
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  onSignUp: () => any,
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

export const SignUpComponent = ({
  score, isHidden, form, isPending, i18n, onSignUp, onToggleMask, onCheckPasswordStrength,
}: Props) => (
  <Grid className="sign-up">
    <Row className="signup-header">
      <p id="signup-header-txt">{i18n.t`I'M A NEW CUSTOMER`}</p>
    </Row>
    <div className="signup-container">
      <Form model={modelPath} onSubmit={onSignUp} autoComplete="off" hideNativeErrors>
        <Control.select model=".title" id=".title" validators={{ titleRequired, }}>
          <option value={i18n.t`Title`}>{i18n.t`TITLE`}</option>
          <option value={i18n.t`Mr`}>{i18n.t`Mr`}</option>
          <option value={i18n.t`Mrs.`}>{i18n.t`Mrs.`}</option>
          <option value={i18n.t`Ms.`}>{i18n.t`Ms.`}</option>
        </Control.select>
        <Errors model=".title"
                    messages={{ titleRequired: i18n.t`Please enter your title`, }}
                    wrapper={(props) => <div className="title-error">{props.children}</div>}
                    show="focus"
        />
        <FormControl
          id="firstName"
          formProps={form.firstName}
          controlProps={{
            type: 'text',
            placeholder: i18n.t`FIRST NAME`,
            maxLength: 255,
          }}
          validators={{
            isRequired,
            isAlpha,
          }}
        />
        <Errors model=".firstName"
                messages={{
                    isAlpha:  i18n.t`Please check the Address. You can use only latin characters.`
                }}
                wrapper={(props) => <div className="fname-error">{props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
        />
        <FormControl
          id="lastName"
          formProps={form.lastName}
          controlProps={{
            type: 'text',
            placeholder: i18n.t`LAST NAME`,
            maxLength: 255,
          }}
          validators={{
            isRequired,
            isLatin,
          }}
        />
        <Errors model=".lastName"
                messages={{
                    isLatin:  i18n.t`Please check the Last Name. You can use only latin characters.`
                }}
                    wrapper={(props) => <div className="fname-error">{props.children[0]}<br />{props.children[1]}</div>}
                    show="focus"
      />
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
      <Grid className="password-container">
        <Col xs={12} md={8}>
          <Row className="password-content">
            <FormControl
              id="password"
              formProps={form.password}
              controlProps={{
                type: isHidden ? 'password' : 'text',
                placeholder: i18n.t`PASSWORD`,
                maxLength: 128,
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
          <Button id="toggle-btn" onClick={() => onToggleMask()}>
            <Glyphicon glyph={isHidden ? 'eye-close' : 'eye-open'} />
          </Button>
        </Col>
      </Grid>
      <br />
      <Control.checkbox
        model=".updates"
        component={Checkbox}
      >
        <Trans>I would like to receive updates from Vittoria Orzini Fashion Boutique.</Trans>
      </Control.checkbox>
      <br />
      <label id="newsl">{i18n.t`NEWSLETTER PREFERENCES`}</label>
      <Control.checkbox
        model=".newsletterFashion"
        component={Checkbox}
      >
        <Trans>FASHION</Trans>
      </Control.checkbox>
      <Control.checkbox
        model=".newsletterVintage"
        component={Checkbox}
      >
        <Trans>VINTAGE</Trans>
      </Control.checkbox>
      <Control.checkbox
        model=".newsletterHomeCollection"
        component={Checkbox}
      >
        <Trans>HOME COLLECTION</Trans>
      </Control.checkbox>
      <br />
      <Button id="signup-btn" type="submit" disabled={!form.$form.valid || isPending} block>
        {isPending ? <div><Spinner /> <Trans>CREATE ACCOUNT</Trans></div> : <Trans>CREATE ACCOUNT</Trans>}
      </Button>
    </Form>
    </div>
  </Grid>
);

export default withI18n()(SignUpComponent);
