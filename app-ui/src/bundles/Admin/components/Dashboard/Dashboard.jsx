// @flow
import React from 'react';
import { Button, Checkbox, Col, Grid, Modal, Row, Nav, NavItem } from 'react-bootstrap';
import { withI18n, Trans } from 'lingui-react';
import { Form, Control, Errors } from 'react-redux-form';
import FormControl from 'components/FormControl';
import Spinner from 'components/Spinner';
import type { FormProps } from 'util/Form';
import config from 'config/index';
import EditEmailContainer from 'bundles/Admin/containers/EditEmailContainer';
import EditNameContainer from 'bundles/Admin/containers/EditNameContainer';
import EditBDateContainer from 'bundles/Admin/containers/EditBDateContainer';
import ChangePasswordContainer from 'bundles/Admin/containers/ChangePasswordContainer';
import EditNewsletterContainer from 'bundles/Admin/containers/EditNewsletterContainer';
import AddNewAddressContainer from 'bundles/Admin/containers/AddNewAddressContainer';

import './Dashboard.scss';

type Props = {
  addNewAddressIsShown: boolean,
  bdate: string,
  i18n: Object,
  isShown: boolean,
  isShownUpdated: boolean,
  editEmailIsShown: boolean,
  editNameIsShown: boolean,
  passwordFormIsShown: boolean,
  onSignOut: () => any,
  onToggleAddNewAddress: () => any,
  onToggleBDate: () => any,
  onToggleUpdate: () => any,
  onToggleEmail: () => any,
  onToggleName: () => any,
  onToggleNewAddressSaved: () => any,
  onTogglePasswordForm: () => any,
  savedNewAddressIsShown: boolean,
  section: string,
  selectID: () => any,
  userEmail: string,
  userFirstName: string,
  userName: string,
};

export const DashboardComponent = ({
  addNewAddressIsShown, bdate, i18n, isShown, isShownUpdated, editNameIsShown, editEmailIsShown, onSignOut,
  onToggleAddNewAddress, onToggleBDate, onToggleEmail, onToggleName, onToggleNewAddressSaved,
  onTogglePasswordForm, onToggleUpdate, passwordFormIsShown, savedNewAddressIsShown, section,
  selectID, userEmail, userFirstName, userName,
}: Props) => (
  <Grid className="admin-dashboard">
    <Row className="admin-welcome">
      {i18n.t`Welcome`}, {userFirstName}
    </Row>
    <Nav className="profile-navbar" onSelect={selectID}>
      <NavItem
        id={( section === '' || section === 0 || section === 1 ||
              section === "" || section === undefined) ? 'profile-section-active' : 'profile-section'}
        eventKey={1}>{i18n.t`Profile`}</NavItem>
      <NavItem id={ section === 2 ? 'creditwallet-section-active' : 'creditwallet-section'}
        eventKey={2}>{i18n.t`Credit Wallet`}</NavItem>
      <NavItem id={ section === 3 ? 'wishlist-section-active' : 'wishlist-section'}
        eventKey={3}>{i18n.t`Wishlist`}</NavItem>
      <NavItem id={ section === 4 ? 'orders-section-active' : 'orders-section'}
        eventKey={4}>{i18n.t`Order History`}</NavItem>
      <NavItem id={ section === 5 ? 'address-section-active' : 'address-section'}
        eventKey={5}>{i18n.t`Address Book`}</NavItem>
      <NavItem id="logout-btn" onSelect={onSignOut}>{i18n.t`LOG OUT`}</NavItem>
    </Nav>
    { (section === 1 || section === '0' || section === '' ||
       section === "" || section === undefined) &&
      <Grid className="personal-details">
        <Row>
          <Col md={6} mdPull={6}>
            <p className="name">{i18n.t`Name`}: {userName}</p>
            <p className="emailaddr">{i18n.t`Email Address`}: {userEmail}</p>
            <p className="passwd">{i18n.t`Password`}: XXXX</p>
            <p className="birthdate">
              {i18n.t`Date of Birth`}: {bdate}
            </p>
          </Col>
          <Col md={6} mdPush={6}>
            <Button className="change-name" onClick={() => onToggleName()}>
              {i18n.t`CHANGE YOUR NAME`}
            </Button>
            <Button className="change-email" onClick={() => onToggleEmail()}>
              {i18n.t`CHANGE YOUR EMAIL`}
            </Button>
            <Button className="change-passwd" onClick={() => onTogglePasswordForm()}>
              {i18n.t`CHANGE YOUR PASSWORD`}
            </Button>
            <Button className="change-bdate" onClick={() => onToggleBDate()}>
              {i18n.t`CHANGE YOUR DATE OF BIRTH`}
            </Button>
          </Col>
        </Row>
        <Row className="newsletter-section">
          <Row className="newsletter-title">{i18n.t`Newsletter Subscription`}</Row>
          <EditNewsletterContainer />
        </Row>
        <Modal className="bdate-modal" show={isShown} onHide={() => onToggleBDate()}>
          <Modal.Header closeButton>
            <Modal.Title>{i18n.t`CHANGE YOUR DATE OF BIRTH`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditBDateContainer />
          </Modal.Body>
        </Modal>
        <Modal className="details-updated" show={isShownUpdated} onHide={() => onToggleUpdate()}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>{i18n.t`Your details have been successfully updated`}</Modal.Body>
        </Modal>
        <Modal className="edit-name-modal" show={editNameIsShown} onHide={() => onToggleName()}>
          <Modal.Header closeButton>
            <Modal.Title>{i18n.t`CHANGE YOUR NAME`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditNameContainer />
          </Modal.Body>
        </Modal>
        <Modal className="edit-email-modal" show={editEmailIsShown} onHide={() => onToggleEmail()}>
          <Modal.Header closeButton>
            <Modal.Title>{i18n.t`CHANGE YOUR EMAIL`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditEmailContainer />
          </Modal.Body>
        </Modal>
        <Modal className="change-password-modal" show={passwordFormIsShown} onHide={() => onTogglePasswordForm()}>
          <Modal.Header closeButton>
            <Modal.Title>{i18n.t`CHANGE YOUR PASSWORD`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ChangePasswordContainer />
          </Modal.Body>
        </Modal>
      </Grid>
    }
    { section === 2 && <p id="p2">You have not yet saved any credit cards</p> }
    { section === 3 && <p id="p3">You have not yet added any of your favourite items</p> }
    { section === 4 && <p id="p4">You have not previously ordered as a registered user</p> }
    { section === 5 &&
      <Grid className="address-book">
        <Row className="addr-title">
          {i18n.t`Address Book`}
        </Row>
        <Row className="addr-title2">
          {i18n.t`Save all your delivery details to complete the order process quickly`}
        </Row>
        <Button className="add-new-addr-btn" onClick={() => onToggleAddNewAddress()}>
          {i18n.t`ADD A NEW ADDRESS`}
        </Button>
        <Modal className="add-new-address-modal" show={addNewAddressIsShown} onHide={() => onToggleAddNewAddress()}>
          <Modal.Header closeButton>
            <Modal.Title>{i18n.t`Add a new address`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddNewAddressContainer />
          </Modal.Body>
        </Modal>
        <Modal className="new-address-saved" show={savedNewAddressIsShown} onHide={() => onToggleNewAddressSaved()}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>{i18n.t`Your address has been successfully saved`}</Modal.Body>
        </Modal>
      </Grid>
    }
  </Grid>
);

export default withI18n()(DashboardComponent);
