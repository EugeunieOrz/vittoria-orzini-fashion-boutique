// @flow
import React from 'react';
import { Button, FormControl, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withI18n, Trans } from '@lingui/react';
import config from 'config/index';
import MenuContainer from 'containers/MenuContainer';

import Header from '../Header';
import './Unauthenticated2.scss';

type Props = {
  route: (string) => any,
  current: string,
  language: string,
  i18n: Object,
  isHidden: boolean,
  selectLanguage: (language: string) => void,
  onToggleMenu: () => any,
  geolocation: [],
};

export const Unauthenticated2HeaderComponent = ({
  route, current, selectLanguage, i18n, language, isHidden, onToggleMenu, geolocation,
 }: Props) => (
  <Header>
    {
      !isHidden &&
      <MenuContainer />
    }
    <Nav className="not-authenticated" pullRight>
      <NavItem
        className="menu-link"
        onSelect={() => onToggleMenu()}
      >
        {i18n.t`MENU`}
      </NavItem>
      <NavItem
        className="sign-in"
        onSelect={() => route(config.route.auth.signIn)}
      >
        {i18n.t`MY ACCOUNT`}
      </NavItem>
      <NavItem
        className="shopping-bag"
        onSelect={() => route(config.route.home.index)}
      >
        SHOPPING BAG
      </NavItem>
      <NavItem
        className="wishlist"
        onSelect={() => route(config.route.home.index)}
      >
        WISH LIST
      </NavItem>
      <NavDropdown id="nav-dropdown" title={language.toUpperCase()} onSelect={(lang) => selectLanguage(lang)}>
        <MenuItem eventKey="en">EN</MenuItem>
        <MenuItem eventKey="it">IT</MenuItem>
      </NavDropdown>
    </Nav>
  </Header>
);

export default withI18n()(Unauthenticated2HeaderComponent);
