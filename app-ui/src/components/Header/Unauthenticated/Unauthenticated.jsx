// @flow
import React from 'react';
import { Button, FormControl, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withI18n, Trans } from 'lingui-react';
import config from 'config/index';

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
};

export const UnauthenticatedHeaderComponent = ({
  route, current, selectLanguage, i18n, language, isHidden, onToggleMenu,
 }: Props) => (
  <Header>
    <div className="menu-title">
      <p id="vo-link" onClick={() => onToggleMenu()}><Trans>Discover World of Vittoria Orzini</Trans></p>
    </div>
    {
      !isHidden &&
      <div className="main-menu">
        <Link id="vo-brand" onClick={() => onToggleMenu()} to={config.route.index}>Vittoria Orzini</Link>
        <Button className="closebtn" onClick={() => onToggleMenu()}>Close</Button>
        <div className="main-menu-content">
          <div className="fashion-container">
            <div className="fashion-content">
              <p id="fashion-content-title"><Trans>FASHION</Trans></p>
              <Link id="nav-fashion-newin" to={config.route.index}><Trans>New Arrivals</Trans></Link>
              <Link id="nav-ready-to-wear" to={config.route.index}><Trans>Ready To Wear</Trans></Link>
              <Link id="nav-shoes" to={config.route.index}><Trans>Shoes</Trans></Link>
              <Link id="nav-handbags" to={config.route.index}><Trans>Handbags</Trans></Link>
              <Link id="nav-accessories" to={config.route.index}><Trans>Accessories</Trans></Link>
              <Link id="nav-jewelry" to={config.route.index}><Trans>Fine Jewelry</Trans></Link>
            </div>
          </div>
          <div className="homecoll-container">
            <div className="home-coll-content">
              <p id="homecoll-content-title"><Trans>HOME COLLECTION</Trans></p>
              <Link id="nav-homecoll-newin" to={config.route.index}><Trans>New Arrivals</Trans></Link>
              <Link id="nav-bed-bath" to={config.route.index}><Trans>Bed & Bath</Trans></Link>
              <Link id="nav-dining" to={config.route.index}><Trans>Dining</Trans></Link>
              <Link id="nav-living" to={config.route.index}><Trans>Living</Trans></Link>
            </div>
          </div>
          <div className="vintage-container">
            <div className="vintage-content">
              <p id="vintage-content-title"><Trans>VINTAGE</Trans></p>
              <Link id="nav-vintage-newin" to={config.route.index}><Trans>New Arrivals</Trans></Link>
              <Link id="nav-v-dresses" to={config.route.index}><Trans>Vintage Dresses</Trans></Link>
              <Link id="nav-v-jackets" to={config.route.index}><Trans>Vintage Jackets</Trans></Link>
              <Link id="nav-v-shoes" to={config.route.index}><Trans>Vintage Shoes</Trans></Link>
              <Link id="nav-v-bags" to={config.route.index}><Trans>Vintage Bags</Trans></Link>
              <Link id="nav-v-accessories" to={config.route.index}><Trans>Vintage Accessories</Trans></Link>
              <Link id="nav-v-jewellery" to={config.route.index}><Trans>Vintage Jewellery</Trans></Link>
            </div>
          </div>
        </div>
      </div>
    }
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
