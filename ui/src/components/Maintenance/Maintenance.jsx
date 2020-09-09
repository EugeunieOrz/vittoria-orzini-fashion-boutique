// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import type { Node } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import './Maintenance.scss';

import logoTransparent from '../../static/logo/vo_logo_transparent.png';

type Props = {
  healthy?: boolean,
  children?: Node,
  i18n: Object,
  t: Object,
}

const Maintenance = ({ healthy, children, i18n, t }: Props) => {
  if (healthy && children) {
    return children;
  }

  return (
    <Container
      id="maintenance-container"
      className="d-flex flex-column h-100 align-items-center justify-content-center" fluid>
      <Image src={logoTransparent} width="140.85" height="93.43" id="vo-brand-sm" alt="VO logo" />
      <div className="text-center mt-3">
        <p className="" id="maintenance-title">
          {t('Maintenance')}
        </p>
        <p
          className="mt-4"
          id={
            i18n.translator.language === "ar" ? "maintenance-txt-ar" : "maintenance-txt"
          }>
          {t('The Page is currently under maintenance.')}
        </p>
      </div>
    </Container>
  );
};

Maintenance.defaultProps = {
  healthy: false,
  children: undefined,
};

export default withTranslation()(Maintenance);
