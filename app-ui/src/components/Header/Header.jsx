// @flow
import React from 'react';
import { FormControl, Navbar } from 'react-bootstrap';
import { withI18n, Trans } from 'lingui-react';

import type { Node } from 'react';

import Logo from './assets/logo.png';
import './Header.scss';

type Props = {
  children: Node,
  i18n: Object,
};

export const HeaderComponent = ({ children, i18n, }: Props) => (
  <Navbar fluid fixedTop inverse id="header">
    <FormControl
          ref={c => {
            this.input = c;
          }}
          id="search-bar"
          type="text"
          placeholder={i18n.t`SEARCH`}
        />
    {children}
  </Navbar>
);

export default withI18n()(HeaderComponent);
