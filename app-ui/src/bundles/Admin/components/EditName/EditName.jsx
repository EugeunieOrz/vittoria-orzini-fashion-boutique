// @flow
import React from 'react';
import { Button } from 'react-bootstrap';
import { withI18n, Trans } from '@lingui/react';
import { Form, Control, Errors } from 'react-redux-form';
import FormControl from 'components/FormControl';
import Spinner from 'components/Spinner';
import type { FormProps } from 'util/Form';
import config from 'config/index';
import { modelPathEditName } from 'bundles/Admin/modules/EditNameModule';
import isAlpha from 'validator/lib/isAlpha';
import { isLatin, isRequired, titleRequired } from 'util/Validator';

type Props = {
  formEditName: {[string]: FormProps},
  i18n: Object,
  isPendingEditName: boolean,
  onEditName: (userID: string, data: Object) => any,
  userID: string,
};

export const EditNameComponent = ({
  formEditName, i18n, userID, isPendingEditName, onEditName,
}: Props) => (
  <Form model={modelPathEditName}
        onSubmit={data => onEditName(userID, data)}
        autoComplete="off"
        hideNativeErrors>
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
      formProps={formEditName.firstName}
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
      formProps={formEditName.lastName}
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
  <Button id="change-name" type="submit" disabled={!formEditName.$form.valid || isPendingEditName} block>
    {isPendingEditName ? <div><Spinner /> <Trans>SAVE</Trans></div> : <Trans>SAVE</Trans>}
  </Button>
  </Form>
);

export default withI18n()(EditNameComponent);
