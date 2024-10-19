import React, {useState } from "react";
import { useRecoilState } from "recoil";
import { showCartsatate } from "../atoms/ShowCart";
import { productShowCartsatate } from "../atoms/ProductShowCart";
import { useDispatch } from "react-redux";
import { addProducts } from "../rtlk/slices/cart-slices";
import { AnimatePresence, motion } from "framer-motion";
import Notification from "./Notification";
import { Link } from "react-router-dom";

function AddtoCart({ product }) {
  const [showCart, setshowcart] = useRecoilState(showCartsatate);
  const [showNoti, setShowNoti] = useState();
  const [productShowCart, setProductShowCart] = useRecoilState(
    productShowCartsatate
  );
  const [size, setSize] = useState();
  const [quantite, setQuantite] = useState(1);



  const dispatch = useDispatch();



  // check description in side this product
  const showShortdescriptin = (productShowCart) => {
    if (productShowCart.ShortDescription) {
      return (
        <div className="py-[15px] overflow-hidden">
          <p className="font-normal text-[15px] text-[#868686]">
            {productShowCart.ShortDescription}
          </p>
        </div>
      );
    }
  };

  const clickSize = (e) => {
    const sizeActive = document.querySelector(".acrivesize");
    if (sizeActive === null) {
      console.log(false);
    } else {
      sizeActive.classList.remove("acrivesize");
    }
    e.target.classList.add("acrivesize");
    setSize(e.target.textContent.toUpperCase());
  };

  const showSizeSelected = (productShowCart) => {
    if (productShowCart.size.length > 0) {
      return (
        <div className="pb-5">
          <h3 className="pb-[10px]">Sizes : {size}</h3>
          <ul className="flex items-center flex-wrap gap-4">
            {productShowCart.size.map((item, index) => {
              
              return (
                <li
                  className="text-[15px] border  px-[20px] cursor-pointer uppercase"
                  key={index}
                  onClick={(e) => clickSize(e)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
          <h4 className="text-[red] mt-4 error-size border-2 p-2 text-center border-rose-600 hidden">
            Please Select Your Size
          </h4>
        </div>
      );
    } else {
      return <div className="pt-5"></div>;
    }
  };

  const changAmount = (e) => {
    const buttonValue = e.target.textContent;
    if (buttonValue === "+") {
      setQuantite(quantite + 1);
    } else if (buttonValue === "-" && quantite > 1) {
      setQuantite(quantite - 1);
    }
  };

  const handleAddtoCart = () => {
    const errorMessage = document.querySelector(".error-size");
    if (productShowCart.size.length > 0) {
      if (size) {
        const newArr = {
          ...productShowCart,
          amount: quantite,
          sizeTarget: size,
        };
        dispatch(addProducts(newArr));
        errorMessage.classList.add("hidden");
        setshowcart(false);
        setShowNoti(true);
      } else errorMessage.classList.remove("hidden");
    } else {
      const newArr = { ...productShowCart, amount: quantite };
      dispatch(addProducts(newArr));
      setshowcart(false);
      setShowNoti(true);
    }
  };

  if (showNoti === true) {
    function myFunction() {
      setTimeout(function () {
        setShowNoti(false);
      }, 2000);
    }

    myFunction();
  }

  const item = {
    exit: {
      opacity: 0,
      y: "100vh",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
        // delay: 1.2,
      },
    },
  };

  return (
    <div className="z-10 overflow-hidden">
      <AnimatePresence>
        {showCart && (
          <motion.div
            variants={item}
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit="exit"
            className="fixed inset-0 flex items-center justify-center top-[0px] "
          >
            <div className="w-[90%] h-[540px] bg-white border border-gray-300 shadow-lg p-7 relative rounded-[15px] ">
              <div className="absolute top-[-20px] right-[-20px]">
                <i
                  className="bx bx-x text-[30px] text-white  bg-black rounded-[50%] p-1 cursor-pointer"
                  onClick={() => setshowcart(false)}
                ></i>
              </div>
              <div className="flex  gap-7">
                <div className="flex flex-col ">
                  <div>
                    <img
                      className="w-[340px] rounded-[15px]"
                      alt={productShowCart.name}
                      src={
                        productShowCart.image[0]
                      }
                    />
                  </div>
                  <div className="pt-3">
                    <ul className="flex items-center gap-3 justify-center">
                      {productShowCart.image.map(
                        (image, index) => {
                          return (
                            <img
                              alt={productShowCart.name}
                              className="w-[40px] cursor-pointer"
                              key={index}
                              src={
                                image
                              }
                            />
                          );
                        }
                      )}
                    </ul>
                  </div>
                </div>
                <div className="w-[500px] pt-[20px]">
                  <div className="flex items-center gap-3">
                    <h1 className="text-[40px] font-bold">
                      $ {productShowCart.price}
                    </h1>
                    <span className="text-[red] line-through text-[20px] font-semibold ">
                      {productShowCart.PriceDiscount &&
                        `$${productShowCart.PriceDiscount}`}
                    </span>
                  </div>
                  <div className="pt-3">
                    <h1 className="text-[18px] font-semibold">
                      {productShowCart.name}
                    </h1>
                  </div>
                  {showShortdescriptin(productShowCart)}
                  <div>{showSizeSelected(productShowCart)}</div>
                  <div className="h-[100px] overflow-hidden">
                    <h3 className="pb-1 font-[600]">Description:</h3>
                   <p>{productShowCart.description}</p>
                  </div>
                </div>
                <div className="  border-solid border rounded-[10px] px-5 py-5 flex flex-col gap-5 w-[300px]">
                  <div className=" ">
                    <h3 className="text-[20px] font-semibold pb-1">Delivery</h3>
                    <div className="flex gap-[2px] flex-col text-[15px] pt-1">
                      <h5>
                        Shipping: <span className=" font-semibold"> Free </span>
                      </h5>
                      <h5>
                        Delivery:{" "}
                        <span className=" font-semibold"> Aug 19 - 26 </span>
                      </h5>
                    </div>
                  </div>
                  <hr />
                  <div className="">
                    <h3 className="text-[20px] font-semibold pb-1">Service</h3>
                    <span className="text-[15px]">Buyer protection</span>
                  </div>
                  <hr />
                  <div>
                    <h3 className="text-[20px] font-semibold pb-1">Quantity</h3>
                    <div>
                      <div className="grid grid-cols-1 gap-4 pt-2 ">
                        <div className="flex items-center gap-[20px] ">
                          <button
                            className=" px-[15px] bg-slate-100 "
                            onClick={(e) => changAmount(e)}
                          >
                            -
                          </button>
                          <span className=" text-[20px] QuAnount">
                            {quantite}
                          </span>
                          <button
                            className=" px-[15px] bg-slate-100"
                            onClick={(e) => changAmount(e)}
                          >
                            +
                          </button>
                        </div>
                        <div
                          className="bg-black py-[10px] text-center  cursor-pointer rounded-[30px]"
                          onClick={() => handleAddtoCart()}
                        >
                          <button className=" text-[white] text-[16px] font-semibold">
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className=" mt-5">
                      <Link
                        to={`/product/${productShowCart._id}`}
                        onClick={() => setshowcart(false)}
                        className=" text-[black] text-[16px] font-semibold border-solid border-2 rounded-[30px] cursor-pointer py-[12px] px-[20px] text-center "
                      >
                        Views Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showNoti && (
          <motion.div
            className="fixed bottom-[20px] left-[5rem]   w-[300px]  z-[1000]"
            variants={item}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit="exit"
          >
            <Notification
              textNoti={"Successfully added your Cart"}
              Icon={
                <i className="bx bxs-cart-download text-[#198754] text-[30px]"></i>
              }
              title={productShowCart.name}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddtoCart;
