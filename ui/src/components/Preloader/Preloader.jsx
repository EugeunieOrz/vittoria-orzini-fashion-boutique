// @flow
import React from 'react';
import type { Node } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import './Preloader.scss';

import logoTransparent from '../../static/logo/vo_logo_transparent.png';

type Props = {
  preloaded?: boolean,
  children?: Node,
}

/**
 * Preloader component which shows a loading indicator until the `preloaded` prop is set to true.
 */
const Preloader = ({ preloaded, children, }: Props) => {
  if (preloaded && children) {
    return children;
  }

  return (
    <Container
      className="d-flex h-100 align-items-center justify-content-center"
       id="preloader-wrapper" fluid>
      <Image src={logoTransparent} width="140.85" height="93.43" id="vo-logo-loading" alt="VO logo" />
    </Container>
  );
};

Preloader.defaultProps = {
  preloaded: false,
  children: undefined,
};

export default Preloader;
