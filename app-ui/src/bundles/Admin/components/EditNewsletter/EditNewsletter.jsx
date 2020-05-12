// @flow
import React from 'react';
import { Button, Checkbox, Row } from 'react-bootstrap';
import { withI18n, Trans } from '@lingui/react';
import { Form, Control, Errors } from 'react-redux-form';
import type { FormProps } from 'util/Form';
import Spinner from 'components/Spinner';
import config from 'config/index';
import { modelPath } from 'bundles/Admin/modules/NewsletterModule';

type Props = {
  form: {[string]: FormProps},
  i18n: Object,
  isPending: boolean,
  onUpdateNewsletter: (userID: string, data: Object) => any,
  userID: string
};

export const EditNewsletterComponent = ({
  form, i18n, isPending, onUpdateNewsletter, userID,
}: Props) => (
  <Form model={modelPath} onSubmit={data => onUpdateNewsletter(userID, data)} autoComplete="off" hideNativeErrors>
    <Control.checkbox
      model=".updates"
      id="updates"
      component={Checkbox}
    >
      <Trans>I would like to receive updates from Vittoria Orzini Fashion Boutique.</Trans>
    </Control.checkbox>
    <Row className="newsletter-txt">{i18n.t`Stay updated on our collections:`}</Row>
    <div className="newsl-container">
      <Control.checkbox
        model=".newsletterFashion"
        id="newslFashion"
        component={Checkbox}
      >
        <Trans>FASHION</Trans>
      </Control.checkbox>
      <Control.checkbox
        model=".newsletterVintage"
        id="newslVintage"
        component={Checkbox}
      >
        <Trans>VINTAGE</Trans>
      </Control.checkbox>
      <Control.checkbox
        model=".newsletterHomeCollection"
        id="newslHome"
        component={Checkbox}
      >
        <Trans>HOME COLLECTION</Trans>
      </Control.checkbox>
    </div>
    <Button className="newsletter-btn" type="submit" disabled={isPending}>
      {isPending ? <div><Spinner /> <Trans>Save</Trans></div> : <Trans>Save</Trans>}
    </Button>
  </Form>
);

export default withI18n()(EditNewsletterComponent);
