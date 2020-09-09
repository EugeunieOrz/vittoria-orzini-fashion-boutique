// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { withTranslation } from "react-i18next";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PersonalDetailsContainer from 'bundles/Account/containers/AccountDetails/PersonalDetailsContainer';
import EditEmailContainer from 'bundles/Account/containers/AccountDetails/EditEmailContainer';
import EditNameContainer from 'bundles/Account/containers/AccountDetails/EditNameContainer';
import EditBDateContainer from 'bundles/Account/containers/AccountDetails/EditBDateContainer';
import ChangePasswordContainer from 'bundles/Account/containers/AccountDetails/ChangePasswordContainer';
import EditNewsletterContainer from 'bundles/Account/containers/AccountDetails/EditNewsletterContainer';
import RemoveAccountContainer from 'bundles/Account/containers/AccountDetails/RemoveAccountContainer';

import AddNewAddressContainer from 'bundles/Account/containers/Addresses/AddNewAddressContainer';
import EditAddressContainer from 'bundles/Account/containers/Addresses/EditAddressContainer';
import RemoveAddressContainer from 'bundles/Account/containers/Addresses/RemoveAddressContainer';

import AddNewCardContainer from 'bundles/Account/containers/CreditCards/AddNewCardContainer';
import EditCardContainer from 'bundles/Account/containers/CreditCards/EditCardContainer';
import RemoveCardContainer from 'bundles/Account/containers/CreditCards/RemoveCardContainer';

import CardWalletContainer from 'bundles/Account/containers/Account/CardWalletContainer';
import WishListContainer from 'bundles/Account/containers/Account/WishListContainer';
import OrderHistoryContainer from 'bundles/Account/containers/Account/OrderHistoryContainer';
import AddressBookContainer from 'bundles/Account/containers/Account/AddressBookContainer';

import './AccountDashboard.scss';

type Props = {
  addNewAddressIsShown: boolean,
  addNewCardIsShown: boolean,
  toggleClosingAccount: () => any,
  closingAccountAlertIsShown: () => any,
  i18n: Object,
  t: Object,
  isShown: boolean,
  editAddressIsShown: boolean,
  editCardIsShown: boolean,
  editEmailIsShown: boolean,
  editNameIsShown: boolean,
  passwordFormIsShown: boolean,
  isShownRemoveAddress: boolean,
  isShownRemoveCard: boolean,
  userFirstName: string,
  profileActiveKey: string,
};

export const DashboardComponent = ({
  i18n, t,
  addNewAddressIsShown, editAddressIsShown,
  isShownRemoveAddress,
  addNewCardIsShown, editCardIsShown,
  isShownRemoveCard,
  editNameIsShown, editEmailIsShown, passwordFormIsShown,
  isShown, userFirstName,
  closingAccountAlertIsShown, toggleClosingAccount,
  profileActiveKey,
}: Props) => (
  <Container
    id="my-account-row"
    className="flex-grow-1">
    {
      closingAccountAlertIsShown &&
      <RemoveAccountContainer />
    }
    {
      isShown &&
      <EditBDateContainer />
    }
    {
      editNameIsShown &&
      <EditNameContainer />
    }
    {
      editEmailIsShown &&
      <EditEmailContainer />
    }
    {
      passwordFormIsShown &&
      <ChangePasswordContainer />
    }
    <Row className="my-2 justify-content-center">
      <p
        id={
          i18n.translator.language === "ar" ?
          "myaccount-welcome-msg-ar" :
          "myaccount-welcome-msg"
        }>
        {
          userFirstName ?
          t('welcomeName', {userName: userFirstName})
          :
          t('welcomeCustomer')
        }
      </p>
    </Row>
    <Container fluid="xs">
      <Tabs
        defaultActiveKey={profileActiveKey}
        id="my-account-tabs"
        className={
          i18n.translator.language === "ar" ?
          "mt-2 justify-content-around border-0 my-account-tabs-ar" :
          "mt-2 justify-content-around border-0 my-account-tabs"
        }
      >
        <Tab eventKey="profile" title={t('Profile')}>
          <PersonalDetailsContainer />
          <div
            id={
              i18n.translator.language === "ar" ?
              "newsletter-title-ar" :
              "newsletter-title"
            }
            className="text-center">
            {t('Newsletter Subscription')}
          </div>
          <Row
            id="newsletter-preferences" className="mt-3 justify-content-center">
            <EditNewsletterContainer />
          </Row>
          <Row id="remove-account" className="mt-5 mb-4 justify-content-center">
            <Button
              id={
                i18n.translator.language === "ar" ?
                "remove-account-btn-ar" : "remove-account-btn"
              }
              onClick={() => toggleClosingAccount()}>
              {t('closeAcc')}
            </Button>
          </Row>
        </Tab>
        <Tab eventKey="cardWallet" title={t('Card Wallet')}>
          <CardWalletContainer />
          {
            addNewCardIsShown &&
            <AddNewCardContainer />
          }
          {
            editCardIsShown &&
            <EditCardContainer />
          }
          {
            isShownRemoveCard &&
            <RemoveCardContainer />
          }
        </Tab>
        <Tab eventKey="wishlist" title={t('Wishlist')}>
          <WishListContainer />
        </Tab>
        <Tab eventKey="orderHistory" title={t('Order History')}>
          <OrderHistoryContainer />
        </Tab>
        <Tab eventKey="addressBook" title={t('Address Book')}>
          <AddressBookContainer />
          {
            editAddressIsShown &&
            <EditAddressContainer />
          }
          {
            addNewAddressIsShown &&
            <AddNewAddressContainer />
          }
          {
            isShownRemoveAddress &&
            <RemoveAddressContainer />
          }
        </Tab>
      </Tabs>
    </Container>
  </Container>
);

export default withTranslation()(DashboardComponent);
