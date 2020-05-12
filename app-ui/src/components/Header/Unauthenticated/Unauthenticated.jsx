// @flow
import React from 'react';
import { Button, FormControl, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withI18n, Trans } from '@lingui/react';
import config from 'config/index';
import MenuContainer from 'containers/MenuContainer';

import Header from '../Header';
import './Unauthenticated.scss';

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

export const UnauthenticatedHeaderComponent = ({
  route, current, selectLanguage, i18n, language, isHidden, onToggleMenu, geolocation,
 }: Props) => (
  <Header>
    <div className="menu-title">
      <p id="vo-link" onClick={() => onToggleMenu()}><Trans>Discover World of Vittoria Orzini</Trans></p>
    </div>
    {
      !isHidden &&
      <MenuContainer />
    }
    <Nav className="not-authenticated-logo">
      <NavItem
        className="logo-home-link"
        onSelect={() => route(config.route.index)}
      >V.O.
    </NavItem>
    </Nav>
    <Nav className="not-authenticated" pullRight>
      <NavItem
        className="sign-in"
        onSelect={() => route(config.route.auth.signIn)}
      >
        {i18n.t`MY ACCOUNT`}
      </NavItem>
      <NavItem
        className="shopping-bag"
        onSelect={() => route(config.route.index)}
      >
        SHOPPING BAG
      </NavItem>
      <NavItem
        className="wishlist"
        onSelect={() => route(config.route.index)}
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

export default withI18n()(UnauthenticatedHeaderComponent);
