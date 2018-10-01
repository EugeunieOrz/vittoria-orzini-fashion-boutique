// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Col, Grid, Row } from 'react-bootstrap';
import { actions, Errors, Form, Control } from 'react-redux-form';
import { withI18n, Trans } from 'lingui-react';
import { isLatin, isRequired, required } from 'util/Validator';
import { modelPath } from 'bundles/Auth/modules/SignUpModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import Spinner from 'components/Spinner';
import config from 'config/index';
import type { FormProps } from 'util/Form';

type Props = {
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  onAddNewAddress: (userID: string, data: Object) => any,
  userID: string,
}

export const AddNewAddressComponent = ({
  form, isPending, i18n, onAddNewAddress, userID,
}: Props) => (
  <Grid className="add-new-address-container">
    <Row className="required-fields-msg">i18n.t`* Required fields`</Row>
    <Form model={modelPath} onSubmit={(userID, data) => onAddNewAddress(userID, data)}
          autoComplete="off" hideNativeErrors>
      <FormControl
        id="firstName"
        formProps={form.firstName}
        controlProps={{
          type: 'text',
          placeholder: i18n.t`First Name *`,
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
          placeholder: i18n.t`Last Name *`,
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
                  wrapper={(props) => <div className="lname-error">{props.children[0]}<br />{props.children[1]}</div>}
                  show="focus"
      />
      <FormControl
        id="additional"
        formProps={form.additional}
        controlProps={{
          type: 'text',
          placeholder: i18n.t`Additional information for delivery`,
          maxLength: 255,
        }}
      />
      <FormControl
        id="zipCode"
        formProps={form.zipCode}
        controlProps={{
          type: 'text',
          placeholder: i18n.t`Zip Code *`,
          maxLength: 255,
        }}
        validators={{
          isRequired
        }}
      />
      <FormControl
        id="city"
        formProps={form.city}
        controlProps={{
          type: 'text',
          placeholder: i18n.t`City *`,
          maxLength: 255,
        }}
        validators={{
          isRequired
        }}
      />
      <FormControl
        id="country"
        formProps={form.country}
        controlProps={{
          type: 'text',
          placeholder: i18n.t`Country *`,
          maxLength: 255,
        }}
        validators={{
          isRequired
        }}
      />
      <Row className="country-tip">
        <Trans>Selecting a different country, you could use this address only as billing address</Trans>
      </Row>
      <FormControl
        id="province"
        formProps={form.province}
        controlProps={{
          type: 'text',
          placeholder: i18n.t`State / Province *`,
          maxLength: 255,
        }}
        validators={{
          isRequired
        }}
      />
      <FormControl
        id="email"
        formProps={form.email}
        controlProps={{
          type: 'email',
          placeholder: i18n.t`Email Address *`,
          maxLength: 255,
        }}
        validators={{
          isRequired,
          isEmail,
        }}
      />
      <FormControl
        id="dayTelephone"
        formProps={form.dayTelephone}
        controlProps={{
          type: 'text',
          placeholder: i18n.t`Telephone (day) *`,
          maxLength: 255,
        }}
        validators={{
          isRequired
        }}
      />
      <FormControl
        id="eveningTelephone"
        formProps={form.eveningTelephone}
        controlProps={{
          type: 'text',
          placeholder: i18n.t`Telephone (evening) *`,
          maxLength: 255,
        }}
        validators={{
          isRequired
        }}
      />
      <br />
      <Control.checkbox
        model=".defShipAddr"
        component={Checkbox}
      >
        <Trans>Mark as default shipping address</Trans>
      </Control.checkbox>
      <br />
      <Control.checkbox
        model=".preferBillAddr"
        component={Checkbox}
      >
        <Trans>Save as preferred billing address in My Account</Trans>
      </Control.checkbox>
      <Row className="address-msg1">
        <Trans>The personal data you have entered will be used by Vittoria Orzini Fashion Boutique </Trans>
        <Trans>and Online Store to expedite the purchasing process.</Trans>
      </Row>
      <Row className="address-msg2">
        <Trans>Your information is safe with Vittoria Orzini Fashion Boutique and Online Store.</Trans>
        <Trans>Consult our Privacy Policy for further information.</Trans>
      </Row>
      <Button className="add-new-address-btn" type="submit" disabled={!form.$form.valid || isPending} block>
        {isPending ? <div><Spinner /> <Trans>CONFIRM</Trans></div> : <Trans>CONFIRM</Trans>}
      </Button>
  </Form>
</Grid>
);

export default withI18n()(AddNewAddressComponent);
