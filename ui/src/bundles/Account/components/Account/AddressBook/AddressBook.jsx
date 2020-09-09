// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { withTranslation } from "react-i18next";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import './AddressBook.scss';
import countries from '../../../../../static/json/countries';
import closeSign from '../../../../../static/icons/close.svg';

type Props = {
  i18n: Object,
  t: Object,
  addresses: Array,
  onShowRemoveAddressModal: (index: Number) => any,
  onToggleAddNewAddress: () => any,
  onToggleEditAddress: (index: string) => any,
}

export const AddressBookComponent = ({
  i18n, t, addresses, onShowRemoveAddressModal, onToggleAddNewAddress, onToggleEditAddress,
}: Props) => (
  <Row className="mt-5 mb-4 mx-0 mx-lg-5 d-flex flex-column align-items-center">
    <p
      id={
        i18n.translator.language === "ar" ?
        "address-header-ar" : "address-header"
      }
      className="text-center">
      {t('Address Book')}
    </p>
    <p
      id={
        i18n.translator.language === "ar" ?
        "address-msg-ar" : "address-msg"
      }
      className="pb-2 text-center">
      {t('addressTitle')}
    </p>
    {
      typeof addresses !== 'undefined' && addresses.length > 0 && addresses !== '' ?
      addresses.map((address, index) =>
      <Row className="w-75 address-row py-4" key={index}>
         <Col xs={9} className={
             i18n.translator.language === "ar" ?
             "text-right" : ""
           }>
           <Row
             id={
               i18n.translator.language === "ar" ?
               "address-info-ar" : "address-info"
             }
             className="d-flex flex-column">
             {
               address.mark1.checked && address.mark2.checked &&
               <p className="mb-0">
                 {t('Preferred Address')}
               </p>
             }
             {
               address.mark1.checked &&
               !address.mark2.checked &&
               <p className="mb-0">
                 {t('Preferred Shipping Address')}
               </p>
             }
             {
               !address.mark1.checked &&
               address.mark2.checked &&
               <p className="mb-0">
                 {t('Preferred Billing Address')}
               </p>
             }
             <p id="addr-book-name">{address.firstName + ' ' + address.lastName}</p>
             <p id="addr-book-address" className="mb-0">
               {address.address + ' ' + address.zipCode +
               ', ' + address.city + ', ' + address.state +
               ', ' + countries[address.country]}
             </p>
             <p id="addr-book-tel-day" className="mb-0">
               {address.dayTel.telephone}
             </p>
             <p id="addr-book-tel-ev" className="mb-0">
               {address.eveningTel.telephone}
             </p>
             <p id="addr-book-email">
               {address.email.split('@')[0] + '[at]' + address.email.split('@')[1]}
             </p>
           </Row>
         </Col>
         <Col xs={3}>
           <Row
             className={
               i18n.translator.language === "ar" ?
               "d-flex justify-content-end pl-2" :
               "d-flex justify-content-end pr-2"
             }>
             <Image
               id="delete-address-btn"
               src={closeSign}
               alt=""
               height="24"
               width="24"
               onClick={() => onShowRemoveAddressModal(index)}
               />
           </Row>
           <Row
             className={
               i18n.translator.language === "ar" ?
               "d-flex h-100 justify-content-end pl-2" :
               "d-flex h-100 justify-content-end pr-2"
             }>
             <Button
               className="align-self-center"
               id={
                 i18n.translator.language === "ar" ?
                 "edit-address-btn-ar" : "edit-address-btn"
               }
               onClick={() => onToggleEditAddress(index)}>
               {t('EDIT')}
             </Button>
           </Row>
         </Col>
       </Row>
     ) :
     <p
       id={
         i18n.translator.language === "ar" ?
         "address-not-saved-msg-ar" : "address-not-saved-msg"
       }
       className="my-3 pt-4 text-center">
       {t('notSavedAddresses')}
     </p>
    }
    <Button
      className="mt-3 align-self-center"
      id={
        i18n.translator.language === "it" ?
        "add-new-address-it-btn" :
        (
          i18n.translator.language === "ar" ?
          "add-new-address-ar-btn" :
          "add-new-address-btn"
        )
      }
      onClick={() => onToggleAddNewAddress()}>
      {t('ADD A NEW ADDRESS')}
    </Button>
  </Row>
);

export default withTranslation()(AddressBookComponent);
