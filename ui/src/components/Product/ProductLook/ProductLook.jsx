// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Figure from 'react-bootstrap/Figure';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import './ProductLook.scss';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  i18n: Object,
  t: Object,
  closeProductLook: () => any,
  selectedIndex: number,
  selectSlide: (index: number) => any,
  zoomEffectIsOn: boolean,
  toggleZoomEffect: () => any,
  handleMouseMove: (event: Object) => any,
  backgroundPosition: string,
}

const product = () => {
  const prod = JSON.parse(localStorage.getItem('product-look'));
  return prod;
};

const loadImage = (product: Object, link: string) => {
  const img = require(`../../../static/${product.department.toLowerCase()}/${product.typeOfCollection.toLowerCase()}/${link}`);
  return img;
}

const loadBackgroundImage = (product: Object, link: string) => {
  const img = require(`../../../static/${product.department.toLowerCase()}/${product.typeOfCollection.toLowerCase()}/${link}`);
  return 'url(' + img + ')';
}

export const ProductLookComponent = ({
  i18n, t, closeProductLook, selectedIndex, selectSlide,
  zoomEffectIsOn, backgroundPosition, handleMouseMove, toggleZoomEffect,
}: Props) => (
  <Container id="product-look-container" fluid>
    {
      Object.keys(product()).length !== 0 &&
      <Row className="w-100">
        <Col lg={2} className="d-flex flex-column" id="product-images-1">
          <ListGroup id="product-images-1-inner">
            {
              product().links.map((link, index) =>
              <ListGroup.Item key={index}>
                <Image
                  className="d-block"
                  src={loadImage(product(), link)}
                  width={150}
                  height={200}
                  onClick={() => selectSlide(index)}
                  alt="Fashion" />
              </ListGroup.Item>
             )
            }
          </ListGroup>
        </Col>
        <Col className="align-self-center" lg={9}>
          <Row className="no-gutters">
            <Col lg={3}></Col>
            <Col lg={6}>
              <Carousel
                activeIndex={selectedIndex}
                onSelect={selectSlide}
                interval={null}
                fade={true}
                indicators={false}>
                {
                  product().links.map((link, index) =>
                  <Carousel.Item
                    className="d-flex justify-content-center"
                    id="carousel-product-img"
                    key={index}>
                    {
                      zoomEffectIsOn ?
                      <Figure
                        className="product-figure"
                        id="product-figure-minus"
                        onClick={() => toggleZoomEffect()}
                        onMouseMove={event => handleMouseMove(event)}
                        style={{
                          backgroundImage: loadBackgroundImage(product(), link),
                          backgroundPosition: backgroundPosition
                        }}>
                        <Figure.Image
                          src={loadImage(product(), link)}
                          width={300}
                          height={400}
                          alt="Fashion"
                          className="product-image" />
                      </Figure>
                      :
                      <Figure
                        className="product-figure"
                        id="product-figure-plus"
                        onClick={() => toggleZoomEffect()}>
                        <Figure.Image
                          src={loadImage(product(), link)}
                          width={300}
                          height={400}
                          alt="Fashion"
                          className="product-image" />
                      </Figure>
                    }
                  </Carousel.Item>
                 )
                }
              </Carousel>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </Col>
        <Col lg={1} className="d-flex justify-content-end pt-4 pr-2">
          <div id="close-productlook-btn" onClick={() => closeProductLook()}></div>
        </Col>
      </Row>
    }
  </Container>
);

export default withTranslation()(ProductLookComponent);
