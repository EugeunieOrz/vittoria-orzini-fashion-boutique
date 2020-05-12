// @flow
import React from 'react';
import { Button, FormControl, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withI18n, Trans } from '@lingui/react';
import config from 'config/index';
import MenuContainer from 'containers/MenuContainer';

import Header from '../Header';
import './Authenticated.scss';

type Props = {
  route: (string) => any,
  current: string,
  i18n: Object,
  isHidden: boolean,
  language: string,
  selectLanguage: (language: string) => void,
  onToggleMenu: () => any,
  onSignOut: () => any,
};

export const AuthenticatedHeaderComponent = ({
  route, current, i18n, isHidden, language, selectLanguage, onToggleMenu, onSignOut,
}: Props) => (
    <Header>
      <div className="menu-title">
        <p id="vo-link" onClick={() => onToggleMenu()}><Trans>Discover World of Vittoria Orzini</Trans></p>
      </div>
      {
        !isHidden &&
        <MenuContainer />
      }
      <Nav className="authenticated-logo">
        <NavItem
          className="logo-home-link"
          onSelect={() => route(config.route.index)}
        >V.O.
      </NavItem>
      </Nav>
      <Nav className="authenticated" pullRight>
        <NavItem
           className="my-account"
           onSelect={() => route(config.route.admin.index)}
         >
           MY ACCOUNT
         </NavItem>
         <NavItem
           className="shopping-bag"
           onSelect={() => route(config.route.admin.index)}
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
       <NavItem
         className="auth-sign-out"
         onSelect={onSignOut}
       >
         {i18n.t`SIGN OUT`}
      </NavItem>
    </Nav>
 </Header>
);

export default withI18n()(AuthenticatedHeaderComponent);
