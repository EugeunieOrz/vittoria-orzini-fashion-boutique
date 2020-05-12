// @flow
import React from 'react';
import { Button, Col, Glyphicon, Grid, Row } from 'react-bootstrap';
import { withI18n, Trans } from '@lingui/react';
import { Form, Control, Errors } from 'react-redux-form';
import FormControl from 'components/FormControl';
import Spinner from 'components/Spinner';
import type { FormProps } from 'util/Form';
import config from 'config/index';
import { modelPath } from 'bundles/Admin/modules/EditEmailModule';
import isEmail from 'validator/lib/isEmail';
import { isRequired } from 'util/Validator';

type Props = {
  form: {[string]: FormProps},
  i18n: Object,
  isHidden3: boolean,
  isPending: boolean,
  onEditEmail: (userID: string, data: Object) => any,
  onToggleMask3: () => any,
  userID: string,
  email: string,
};

export const EditEmailComponent = ({
  form, i18n, userID, isPending, onEditEmail, email, isHidden3, onToggleMask3,
}: Props) => (
  <Grid>
    <Row className="current-email">Your current email address: {email}</Row>
    <Form model={modelPath}
          onSubmit={data => onEditEmail(userID, data)}
          autoComplete="off"
          hideNativeErrors>
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
              type: isHidden3 ? 'password' : 'text',
              placeholder: i18n.t`PASSWORD`,
              maxLength: 128,
            }}
            validators={{
              isRequired,
            }}
          />
         <Button id="toggle-btn" onClick={() => onToggleMask3()}>
            <Glyphicon glyph={isHidden3 ? 'eye-close' : 'eye-open'} />
          </Button>
        <Button id="change-email" type="submit" disabled={!form.$form.valid || isPending} block>
          {isPending ? <div><Spinner /> <Trans>SAVE</Trans></div> : <Trans>SAVE</Trans>}
        </Button>
    </Form>
  </Grid>
);

export default withI18n()(EditEmailComponent);
