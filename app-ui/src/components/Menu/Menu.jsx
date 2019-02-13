// @flow
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withI18n, Trans } from 'lingui-react';
import config from 'config/index';

import './Menu.scss';

type Props = {
  i18n: Object,
  onToggleMenu: () => any,
}

export const MenuComponent = ({ i18n, onToggleMenu, }: Props) => (
  <div className="main-menu">
    <Link id="vo-brand" onClick={() => onToggleMenu()} to={config.route.home.index}>Vittoria Orzini</Link>
    <Button className="closebtn" onClick={() => onToggleMenu()}>Close</Button>
    <div className="main-menu-content">
      <div className="fashion-container">
        <div className="fashion-content">
          <p id="fashion-content-title"><Trans>FASHION</Trans></p>
          <Link id="nav-fashion-newin" to={config.route.home.index}><Trans>New Arrivals</Trans></Link>
          <Link id="nav-ready-to-wear" to={config.route.home.index}><Trans>Ready To Wear</Trans></Link>
          <Link id="nav-shoes" to={config.route.home.index}><Trans>Shoes</Trans></Link>
          <Link id="nav-handbags" to={config.route.home.index}><Trans>Handbags</Trans></Link>
          <Link id="nav-accessories" to={config.route.home.index}><Trans>Accessories</Trans></Link>
          <Link id="nav-jewelry" to={config.route.home.index}><Trans>Fine Jewelry</Trans></Link>
        </div>
      </div>
      <div className="homecoll-container">
        <div className="home-coll-content">
          <p id="homecoll-content-title"><Trans>HOME COLLECTION</Trans></p>
          <Link id="nav-homecoll-newin" to={config.route.home.index}><Trans>New Arrivals</Trans></Link>
          <Link id="nav-bed-bath" to={config.route.home.index}><Trans>Bed & Bath</Trans></Link>
          <Link id="nav-dining" to={config.route.home.index}><Trans>Dining</Trans></Link>
          <Link id="nav-living" to={config.route.home.index}><Trans>Living</Trans></Link>
        </div>
      </div>
      <div className="vintage-container">
        <div className="vintage-content">
          <p id="vintage-content-title"><Trans>VINTAGE</Trans></p>
          <Link id="nav-vintage-newin" to={config.route.home.index}><Trans>New Arrivals</Trans></Link>
          <Link id="nav-v-dresses" to={config.route.home.index}><Trans>Vintage Dresses</Trans></Link>
          <Link id="nav-v-jackets" to={config.route.home.index}><Trans>Vintage Jackets</Trans></Link>
          <Link id="nav-v-shoes" to={config.route.home.index}><Trans>Vintage Shoes</Trans></Link>
          <Link id="nav-v-bags" to={config.route.home.index}><Trans>Vintage Bags</Trans></Link>
          <Link id="nav-v-accessories" to={config.route.home.index}><Trans>Vintage Accessories</Trans></Link>
          <Link id="nav-v-jewellery" to={config.route.home.index}><Trans>Vintage Jewellery</Trans></Link>
        </div>
      </div>
    </div>
  </div>
);

export default withI18n()(MenuComponent);
