// @flow
import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import config from 'config/index';
import Container from 'react-bootstrap/Container';
import './NotFound.scss';

export const NotFoundRoute = () => <Redirect to={{ state: { notFoundError: true } }} />;

export const CaptureNotFoundRoute = withRouter(({ children, location }) =>
  (location && location.state && location.state.notFoundError ? <NotFound /> : children));

export const NotFound = () => (
  <Container
    className="d-flex flex-column h-100 align-items-center justify-content-center"
    id="not-found-container" fluid>
    <p id="code-not-found">404</p>
    <p
      id="pageNotFound"
      className="mt-1">
      The Page you are looking for could not be found.
    </p>
    <Link
      id="back-to-home"
      to={config.route.index}
      className="mt-3">
      Back to Home
    </Link>
  </Container>
);

export default NotFound;
