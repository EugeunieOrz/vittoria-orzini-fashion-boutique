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
import './CardWallet.scss';
import closeSign from '../../../../../static/icons/close.svg';

type Props = {
  i18n: Object,
  t: Object,
  cardWallet: Array,
  onShowRemoveCardModal: (index: Number) => any,
  onToggleAddNewCard: () => any,
  onToggleEditCard: (index: string) => any,
}

export const CardWalletComponent = ({
  i18n, t, cardWallet, onShowRemoveCardModal, onToggleAddNewCard, onToggleEditCard,
}: Props) => (
  <Row className="mt-5 mb-4 d-flex flex-column align-items-center">
    <p
      id={
        i18n.translator.language === "ar" ?
        "card-header-ar" : "card-header"
      }
      className="text-center">
      {t('Card Wallet')}
    </p>
    <p
      id={
        i18n.translator.language === "ar" ?
        "card-msg-ar" : "card-msg"
      }
      className="pb-2 text-center">
      {t('storeCardDetailsMsg')}
    </p>
    {
      typeof cardWallet !== 'undefined' && cardWallet.length > 0 && cardWallet !== '' ?
      cardWallet.map((card, index) =>
      <Row className="w-75 card-row py-4" key={index}>
         <Col xs={2}>
           <Image
             id="card-image"
             src={require(`../../../../../static/cards/${card.cardType}.gif`)}
             alt=""
             width="65"
             height="49"
           />
         </Col>
         <Col xs={7}
           id={
             i18n.translator.language === "ar" ?
             "addnewcard-data-ar" :
             "addnewcard-data"
           }
           className={
             i18n.translator.language === "ar" ?
             "text-right" : ""
           }>
           {
             card.prefCrdCard.mark &&
             <p id="addnewcard-prefcard" className="mb-0">
               {t('Preferred Credit Card')}
             </p>
           }
           <p id="addnewcard-name">
             {card.address.firstName + ' ' + card.address.lastName}
           </p>
           <p id="addnewcard-num" className="mb-0">
             {'**** - **** - **** - ****'}
           </p>
           <p id="addnewcard-exp-date">
             {t('expDate', {expMonth: card.expMonth, expYear: card.expYear})}
           </p>
         </Col>
         <Col xs={3}>
           <Row
             className={
               i18n.translator.language === "ar" ?
               "d-flex justify-content-end pl-2" :
               "d-flex justify-content-end pr-2"
             }>
             <Image
               id="delete-card-btn"
               src={closeSign}
               alt=""
               height="24"
               width="24"
               onClick={() => onShowRemoveCardModal(index)}
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
                 "edit-card-btn-ar" : "edit-card-btn"
               }
               onClick={() => onToggleEditCard(index)}>
               {t('EDIT')}
             </Button>
           </Row>
         </Col>
       </Row>
     ) :
     <p
       id={
         i18n.translator.language === "ar" ?
         "card-not-saved-msg-ar" : "card-not-saved-msg"
       }
       className="my-3 pt-4 text-center">
       {t('cardsNotSavedYet')}
     </p>
    }
    <Button
      className="mt-3 align-self-center"
      id={
        i18n.translator.language === "it" ?
        "add-new-card-it-btn" :
        (
          i18n.translator.language === "ar" ?
          "add-new-card-ar-btn" : "add-new-card-btn"
        )
      }
      onClick={() => onToggleAddNewCard()}>
      {t('ADD A NEW CREDIT CARD')}
    </Button>
  </Row>
);

export default withTranslation()(CardWalletComponent);
