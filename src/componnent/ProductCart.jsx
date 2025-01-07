import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCartsatate } from "../atoms/ShowCart";
import { productShowCartsatate } from "../atoms/ProductShowCart";
import Notification from "./Notification";
import { showNotifSclice } from "../atoms/ShowNotifi";
import {
  addProduct,
  deleteItemWishlist,
  deleteItemWshlist,
} from "../rtlk/slices/wshlist-slice";
import { AnimatePresence, motion } from "framer-motion";
import loadingAnimate from "../images/loading-none-bg.gif";
import Skeleton from "./Skeleton";

function ProductCart({ product, id }) {
  const [showCart, setShowCart] = useRecoilState(showCartsatate);
  const [productShowCart, setProductShowCart] = useRecoilState(
    productShowCartsatate
  );
  const [showNoti, setShowNoti] = useState(false);
  const [addWshlist, setAddWshlist] = useState(false);
  const [loading, setLoading] = useState();
  const wshilst = useSelector((state) => state.wshlist);
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [product]);

  // Function to handle click events for adding/removing from wishlist
  const handlWshliteClick = (productInWishlist) => {
    if (productInWishlist) {
      dispatch(deleteItemWishlist(product)); // Remove product from wishlist if it exists
    } else {
      dispatch(addProduct(product)); // Add product to wishlist if it does not exist
      setShowNoti(true); // Show notification for successful addition
    }
  };

  // Function to render the wishlist icon based on whether the product is in the wishlis
  const handlWshlite = () => {
    const productInWishlist = wshilst.find((prod) => prod._id === product._id);

    // Determine the icon class based on the product's presence in the wishlist
    const iconClass = productInWishlist
      ? "bx bx-heart text-[23px] bg-[#F5CAAB] rounded-full text-white p-1"
      : "bx bx-heart text-[23px] bg-white rounded-full p-1";

    return (
      <i
        className={iconClass}
        id="wshilst"
        onClick={() => handlWshliteClick(!!productInWishlist)}
      ></i>
    );
  };

  // Function to show the add-to-cart modal or component
  const showAddToCart = (product) => {
    setShowCart(true);
    setProductShowCart(product); // Set the product to be shown in the cart
  };

  // If showNoti is true, set a timeout to hide the notification after 2 seconds
  if (showNoti === true) {
    function myFunction() {
      setTimeout(function () {
        setShowNoti(false);
      }, 2000);
    }

    myFunction(); // Call the function to start the timeout
  }

  // Define the exit animation for a component
  const item = {
    exit: {
      opacity: 0,
      y: "100vh",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  return (
    <>
      
      <div className="flex flex-col gap-2 box-prod">
        {/* <div className="animate-pulse rounded-md bg-slate-300  h-[260px] "></div> */}

        <div className="relative overflow-hidden ">
          <Link to={`/product/${product._id}`} className="relative">
            {loading && (
              <div className="w-full h-full bg-slate-50 absolute">
                <div className="flex gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <img src={loadingAnimate} />
                </div>
              </div>
            )}
            <img
              alt={product.name}
              src={product.image[0]}
              className="text-sm rounded-[10px]"
            />
          </Link>

          {loading === false && (
            <div className="absolute top-[10px] right-[10px] cursor-pointer  ">
              {handlWshlite()}
            </div>
          )}
          {}
          <div className="hidden absolute bottom-0 w-full md:block  btn-add-cart">
            <div className="grid grid-cols-2 text-center  text-[20px]  border-2 cursor-pointer ">
              <button
                onClick={() => showAddToCart(product)}
                className=" bg-[#EBE8E8]  px-[10px] "
              >
                <i className="bx bx-cart"></i>
              </button>
              <Link
                to={`/product/${product._id}`}
                className="bg-white px-[10px]"
              >
                <i className="bx bx-show"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <Link
            to={`/product/${product._id}`}
            className="text-[14.8px] leading-[1.3] "
          >
            {product.name}
          </Link>
          <div className="flex gap-2 items-center">
            {/* <span className="text-[#696969] text-[20px]">${product.price}</span> */}
            <span className="text-[#696969] text-[20px] flex items-center gap-[1px]">
              <i className="bx bx-shekel text-black"></i>{" "}
              {(product.price * 3.75).toFixed(2)}
            </span>
            <span className="text-[red] text-[14px] line-through">
              {product.PriceDiscount && `$${product.PriceDiscount}`}
            </span>
          </div>
        </div>
        {/* <Notification textNoti={'Successfully added wishlist!'} Icon={<i className="bx bx-check-circle text-[#ff000090] text-[30px]"></i>} /> */}
        <AnimatePresence>
          {showNoti === true && (
            <motion.div
              className="fixed bottom-[20px] left-[12px] md:left-[5rem]   z-[3000]"
              variants={item}
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit="exit"
            >
              <Notification
                textNoti={"Successfully added wishlist!"}
                Icon={
                  <i className="bx bx-heart-circle text-[#198754] text-[30px]"></i>
                }
                title={product.name}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default ProductCart;
