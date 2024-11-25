import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCart from "./ProductCart";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AddtoCart from "./AddtoCart";

const ProductSlider = ({ products }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="container relative">
      <Carousel
        responsive={responsive}
        infinite={true}
        rtl=""
        customLeftArrow={<i className="bx bxs-chevron-right  absolute text-[30px] md:text-[35px] top-[30%] md:top-[40%] text-white bg-[#F5CAAB] opacity-[0.9] rounded-full"></i>}
        customRightArrow={<i className="bx bxs-chevron-left right-0 absolute text-[30px] md:text-[35px] top-[30%] md:top-[40%] text-white bg-[#F5CAAB] opacity-[0.9] rounded-full"></i>}
      >
        {products.map((prod) => {
          return (
            <div className=" p-2 md:p-[20px]" key={prod._id}>
              <ProductCart product={prod} />
            </div>
          );
        })}
      </Carousel>
      <AddtoCart />
    </div>
  );
};

export default ProductSlider;
