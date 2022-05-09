import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './styles.scss';

export interface CarouselListProps extends React.HTMLAttributes<HTMLDivElement> {

}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export const CarouselList = ({ children }: CarouselListProps) => (
  <Carousel
    responsive={responsive}
    swipeable
    draggable
    keyBoardControl
    showDots
    infinite
    autoPlay={false}
    containerClass="carousel-item-wrapper"
    itemClass="carousel-item"
    className="carousel-list"
  >
    {children}
  </Carousel>
);
