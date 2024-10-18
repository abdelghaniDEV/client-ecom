import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../rtlk/slices/cart-slices";
import ProductCart from "./ProductCart";
import { AnimatePresence, motion } from "framer-motion";

import userImage from "../images/instructor-03-02-2-100x100.webp";
import { addProduct } from "../rtlk/slices/wshlist-slice";
import DeliveryInfo from "./DeliveryInfo";
import Qustion from "./Qustion";
import Notification from "./Notification";
function ProductDetail() {
  // redux status / global status
  const products = useSelector((state) => state.products);
  const wishlist = useSelector((state) => state.wshlist);

  // locla statue
  const [quantite, setQuantite] = useState(1);
  const [size, setSize] = useState();
  const [selectImg, setSelectImg] = useState();
  const [color, setcolor] = useState("");
  const [showDelivery, setShowDelivery] = useState(false);
  const [showAskQustion, setShowAskQustion] = useState(false);
  const [showNoti, setShowNoti] = useState(false);



  // import dispatch
  const dispatch = useDispatch();

  // select prams in this page
  const prams = useParams();



  useEffect(() => {
    setQuantite(1)
    setSize()
  },[prams.id])

  // handle add to this product in cart arry
  const handleAddtoCart = (item) => {
    const errorMessage = document.querySelector(".error-size");
    if (item.size.length > 0) {
      if (size) {
        const newArr = { ...item, amount: quantite, sizeTarget: size };
        dispatch(addProducts(newArr));
        errorMessage.classList.add("hidden");
        setShowNoti(true);
      } else errorMessage.classList.remove("hidden");
    } else {
      const newArr = { ...item, amount: quantite };
      dispatch(addProducts(newArr));
      setShowNoti(true);
    }
  };

  // check description in side this product
  const showShortdescriptin = (item) => {
    if (item.ShortDescription) {
      return (
        <div className="py-[8px] md:max-h-[100px] overflow-hidden text-ellipsis">
          <p className="font-[400] text-[15px] md:text-[16px] text-[#868686] leading-[20px] md:leading-[20px] tracking-[0.03em]">
            {item.ShortDescription}
          </p>
        </div>
      );
    }
  };

  // function selected size
  const clickSize = (e) => {
    const sizeActive = document.querySelector(".acrivesize");
    if (sizeActive === null) {
      console.log(false);
    } else {
      sizeActive.classList.remove("acrivesize");
    }
    e.target.classList.add("acrivesize");
    setSize(e.target.textContent);
  };

  // icrement and decrement price
  const changAmount = (e, item) => {
    const buttonValue = e.target.textContent;
    if (buttonValue === "+" && quantite >= 1) {
      setQuantite(quantite + 1);
    } else if(buttonValue === "-" && quantite > 1) {
      setQuantite(quantite - 1);
    }
  };

  // handel show and hidden sections information delevery and question
  const infoProudacts = (e) => {
    const target = e.target;
    const action = target.dataset.action;

    // Early return if no action is defined
    if (!action) return;

    const elements = {
      delivery: document.querySelector("#delivery"),
      question: document.querySelector("#question"),
    };

    switch (action) {
      case "showDelivery":
        elements.delivery.classList.remove("hidden");
        break;
      case "showQuestion":
        elements.question.classList.remove("hidden");
        break;
      case "closeAll":
        elements.delivery.classList.add("hidden");
        elements.question.classList.add("hidden");
        break;
      default:
        console.warn("No action matched:", action);
    }
  };

  // function check size selected in side
  const showSizeSelected = (item) => {
    console.log("Checking", item.size.lenght);
    if (item.size.length > 0) {
      return (
        <div className="py-[12px] md:py-[15px]">
          <h3 className="pb-[10px]">Size : {size}</h3>
          <ul className="flex items-center flex-wrap gap-4">
            {item.size.map((item, index) => {
              return (
                <li
                  className="text-[15px] border uppercase  px-[20px] cursor-pointer"
                  key={index}
                  onClick={(e) => clickSize(e)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
          <h4 className="text-[red] mt-4 error-size border-b-2 p-2  border-rose-600 hidden">
            Please Select Your Size
          </h4>
        </div>
      );
    } else {
      return <div className="pt-5"></div>;
    }
  };
  // display select image
  const showImg = (e, item) => {
    const displayImg = document.querySelector(".display-img");
    setSelectImg(e.target.src);
    setcolor("black");
    displayImg.src = selectImg;
  };

  // list products same categoreus

  const listSameProducts = (item) => {
    const listprod = products.filter(
      (prod) =>
        prod.category[0] ===
        item.category[0]
    );
    return (
      <div className="grid grid-cols-2 gap-4 mx-auto md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
        {listprod.map((product) => {
          return <ProductCart product={product} key={product.id} />;
        })}
      </div>
    );
  };

  // fetch another products in page details
  const listViewsProducts = (item) => {
    const listprod = products.filter(
      (prod) =>
        prod.category[0] !==
        item.category[0]
    );
    return (
      <div className="grid grid-cols-2 gap-4 mx-auto md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
        {listprod.map((product) => {
          return <ProductCart product={product} key={product.id} />;
        })}
      </div>
    );
  };

  // handel show and hidden list products in details page
  const showListProducts = (e, item) => {
    const sections = {
      "Related products": "#related-products",
      "Recently viewed": "#recently-viewed",
    };

    // get all keys of section
    const sectionKeys = Object.keys(sections);
    const active = document.querySelector(".active-show-product");

    // Remove the "active" class from the current active element
    active.classList.remove("active-show-product");

    // hide all section
    sectionKeys.forEach((key) => {
      document.querySelector(sections[key]).classList.add("hidden");
    });

    e.target.classList.add("active-show-product");

    const clickedText = e.target.innerText;

    if (sections[clickedText]) {
      document.querySelector(sections[clickedText]).classList.remove("hidden");
    }
  };

  // handel show and hidden in sections description , reviews
  const displayItem = (e) => {
    const sections = {
      Description: "#description",
      "Additional information": "#information",
      Reviews: "#reviews",
    };

    const sectionKeys = Object.keys(sections);
    const active = document.querySelector(".active-show-details");

    // Remove the "active" class from the current active element
    active.classList.remove("active-show-details");

    // Hide all sections
    sectionKeys.forEach((key) => {
      document.querySelector(sections[key]).classList.add("hidden");
    });

    // Get the clicked tab text
    const clickedText = e.target.innerText;

    // Add the "active" class to the clicked tab
    e.target.classList.add("active-show-details");

    // Show the corresponding section
    if (sections[clickedText]) {
      document.querySelector(sections[clickedText]).classList.remove("hidden");
    }
  };

  // handel add item in wishlist array
  const handlWshlite = (item) => {
    const productInWishlist = wishlist.find((prod) => prod.id === item.id);

    // تحديد أيقونة القلب والنمط بناءً على وجود المنتج في قائمة الأمنيات
    const iconClass = productInWishlist
      ? "bx bx-heart text-[14.8px] bg-[#ff000090] rounded-full text-white p-1"
      : "bx bx-heart text-[14.8px] bg-white rounded-full p-1";

    return (
      <div
        onClick={() => dispatch(addProduct(item))}
        className="flex items-center gap-[4px]"
      >
        <i className={iconClass}></i>
        <h6 className="text-[14.8px] md:text-[15px] cursor-pointer">
          Add to Wishlist
        </h6>
      </div>
    );
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
    <div>
      {products.map((item) => {
        if (item._id == prams.id) {
          console.log(item)
          return (
            <div className="container" key={item._id}>
              {/* title of this page title + categorie + home */}
              <div className="hidden md:block">
                <ul className="flex items-center gap-2 text-[15px]">
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <i className="bx bx-chevron-right"></i>
                  <li>
                    <Link>
                      {item.category[0]}
                    </Link>
                  </li>
                  <i className="bx bx-chevron-right"></i>
                  <li className="text-[#868686]">{item.name}</li>
                </ul>
              </div>
              {/* fetch data in product */}
              <div className="grid grid-cols-1 pb-4 md:pt-[20px] md:grid-cols-1 lg:grid-cols-2 md:gap-6 lg:gap-8">
                {/* imges in this product */}
                <div className="flex flex-col xl:flex-row-reverse md:gap-3 ">
                  <img
                    alt={item.name}
                    className="display-img h-[80%] md:w-full lg:w-[500px] lg:h-[90%]"
                    // src={showImg(item)}
                    src={item.image[0]}
                  />
                  <div className="">
                    <ul className="flex flex-row xl:flex-col  gap-3 pt-2">
                      {item.image.map((image, index) => {
                        return (
                          <img
                            alt={item.name}
                            className=" w-[60px] xl:w-[100px] cursor-pointer"
                            key={index}
                            src={image}
                            onMouseMove={(e) => showImg(e, item)}
                          />
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div>
                  {/* information in this product */}
                  <div className="pb-[20px] ">
                    <div className=" flex flex-col lg:gap-4">
                      <h1 className="text-[25px] lg:text-[30px] font-[500] leading-[1.3]">
                        {item.name}
                      </h1>
                      <div className="flex items-center gap-4">
                        <span className="text-[35px] md:text-[30px] font-medium">
                          ${item.price}
                        </span>
                        <span className="text-[red] line-through ">
                          {item.PriceDiscount &&
                            `$${item.PriceDiscount}`}
                        </span>
                      </div>
                    </div>

                    {showShortdescriptin(item)}
                    <div className="flex items-center flex-wrap gap-1 md:gap-3 border-b-2 py-2">
                      <div className="flex items-center gap-[4px]">
                        <i className="bx bxs-truck text-[17px] md:text-[17px] text-[#868686]"></i>
                        <h6
                          data-action="showDelivery"
                          className="text-[14.8px] md:text-[15px] delivery cursor-pointer"
                          onClick={(e) => setShowDelivery(true)}
                        >
                          Delivery & Return
                        </h6>
                      </div>
                      {handlWshlite(item)}
                      <div className="flex items-center gap-[4px]">
                        <i className="bx bx-message-square-dots text-[17px] md:text-[17px] text-[#868686]"></i>
                        <h6
                          data-action="showQuestion"
                          className="text-[14.8px] md:text-[15px] question cursor-pointer"
                          onClick={(e) => setShowAskQustion(true)}
                        >
                          Ask a Question
                        </h6>
                      </div>
                    </div>
                    {/* size selected  */}
                    {showSizeSelected(item)}

                    <div className="grid grid-cols-1 gap-4 ">
                      <div className="flex items-center gap-[20px] ">
                        <button
                          className="px-[30px] bg-slate-100 text-[25px]"
                          onClick={(e) => changAmount(e, item)}
                        >
                          -
                        </button>
                        <span className=" text-[20px] QuAnount">
                          {quantite}
                        </span>
                        <button
                          className="px-[30px] bg-slate-100 text-[25px]"
                          onClick={(e) => changAmount(e, item)}
                        >
                          +
                        </button>
                      </div>
                      <div
                        className="bg-black py-[10px] text-center  cursor-pointer"
                        onClick={() => handleAddtoCart(item)}
                      >
                        <button className=" text-[white] text-[20px]">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative ">
                    <div>
                      <AnimatePresence>
                        {showDelivery && (
                          <motion.div
                            className=" styleShadow px-4 fixed right-[10px] left-[10px] top-[20px]  bg-white  py-4  z-[2000] overflow-scroll"
                            variants={item}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            exit="exit"
                          >
                            <DeliveryInfo setShowDelivery={setShowDelivery} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {showAskQustion && (
                          <motion.div
                            className=" styleShadow px-4 fixed right-[10px] left-[10px] top-[20px]  bg-white  py-4  z-[2000] overflow-scroll "
                            variants={item}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            exit="exit"
                          >
                            <Qustion setShowAskQustion={setShowAskQustion} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className=" py-2 md::py-5 flex flex-col gap-[5px]  text-[14px]  ">
                      <h4 className="text-black text-[16px] ">
                        Sku :{" "}
                        <span className="text-[#868686]">SKU_{item._id}</span>
                      </h4>
                      <h4 className=" text-black  text-[16px]">
                        Available :{" "}
                        <span className="text-[#868686]">{item.stock > 0 ? 'One Stock' : 'Out Stock'}</span>
                      </h4>
                      <h4 className="text-black text-[16px]">
                        categories :{" "}
                        {item.category.map((cate , index) => {
                          return (
                            <Link
                              key={index}
                              to={`/products/${cate}`}
                              className="text-[#868686] pr-[8px]"
                            >
                               {cate}
                            </Link>
                          );
                        })}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-[16px]">Share :</h4>
                      <div>
                        <ul className="flex items-center gap-3 text-[20px] text-[#868686]">
                          <li>
                            <i className="bx bxl-facebook"></i>
                          </li>
                          <li>
                            <i className="bx bxl-youtube"></i>
                          </li>
                          <li>
                            <i className="bx bxl-whatsapp"></i>
                          </li>
                          <li>
                            <i className="bx bxl-gmail"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <hr className="lg:my-6" />
              {/* description and reviews*/}
              <div className="my-[30px]">
                <div className="flex items-center justify-center gap-3 text-[16px] lg:text-[19px] md:gap-5 font-medium cursor-pointer text-[#868686] ">
                  <h3
                    onClick={(e) => displayItem(e)}
                    className="active-show-details  pb-1"
                  >
                    Description
                  </h3>
                  <h3 onClick={(e) => displayItem(e)} className="pb-1">
                    Additional information
                  </h3>
                  <h3 onClick={(e) => displayItem(e)} className="pb-1">
                    Reviews{" "}
                  </h3>
                </div>
                {/* description */}
                <div id="description" className="lg:my-[25px] my-5  ">
                  <div className="">
                    {/* description */}
                    {item.description && (
                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="bg-inherit text-[16px] font-[500] lg:text-[19px]">
                            Description
                          </h3>
                        </div>
                        <div className="mt-2 ml-2">
                          <p className="text-[#868686] text-[15.5px] lg:text-[16px] tracking-[0.03em]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* details */}
                    {item.details && (
                      <div className="mt-1">
                        <div className="flex justify-between items-center">
                          <h3 className=" text-[16px] font-medium lg:text-[19px]">
                            Details
                          </h3>
                        </div>
                        <div className="mt-2 ml-2">
                          <p className="text-[#868686] text-[15.5px] lg:text-[16px]">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Additional informstion */}
                <div id="information" className="hidden my-5 lg:my-[25px] ">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            value
                          </th>
                          <th scope="col" className="px-6 py-3">
                            value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            size
                          </th>
                          <td className="px-6 py-4">
                            {item.size &&
                              item.size.map((ite, index) => {
                                return (
                                  <span key={index} className="pr-3 uppercase">
                                    {ite}
                                  </span>
                                );
                              })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* reviews */}
                <div id="reviews" className="my-5 hidden lg:my-[40px]  ">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
                    <article className="h-[]  ">
                      <div className="flex items-center mb-2">
                        <img
                          className="w-10 h-10 me-4 rounded-full"
                          src={userImage}
                          alt=""
                        />
                        <div className="font-medium dark:text-white text-[14px]">
                          <p>
                            Jese Leos{" "}
                            <time className="block text-[13px] lg:text-sm text-gray-500 dark:text-gray-400">
                              Joined on August 2014
                            </time>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-gray-300 dark:text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <h3 className="ms-2 text-[10px] lg:text-[12px] font-semibold text-gray-900 dark:text-white">
                          Thinking to buy another one!
                        </h3>
                      </div>
                      <footer className="mb-2 text-[10px] text-gray-500 dark:text-gray-400">
                        <p>
                          Reviewed in the United Kingdom on{" "}
                          <time className="text-black font-medium">
                            March 3, 2017
                          </time>
                        </p>
                      </footer>
                      <p className="mb-2 text-gray-500 dark:text-gray-400 text-[13px]">
                        This is my third Invicta Pro Diver. They are just
                        fantastic value for money. This one arrived yesterday
                        and the first thing I did was set the time
                      </p>
                      <a
                        href="#"
                        className="block mb-2 text-[13px] lg:text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Read more
                      </a>
                      <aside>
                        <div className="flex items-center mt-3">
                          <a
                            href="#"
                            className="px-2 py-1.5 text-[13px] lg:text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Helpful
                          </a>
                          <a
                            href="#"
                            className="ps-4 text-[13px] lg:text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600"
                          >
                            Report abuse
                          </a>
                        </div>
                      </aside>
                    </article>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex items-center gap-4 pb-8">
                  <h2
                    className="text-[15px] font-medium md:text-[18px] active-show-product  pb-1 cursor-pointer same"
                    onClick={(e) => showListProducts(e, item)}
                  >
                    Related products
                  </h2>
                  <h2
                    className=" text-[15px] font-medium md:text-[18px] pb-1 cursor-pointer views"
                    onClick={(e) => showListProducts(e, item)}
                  >
                    Recently viewed
                  </h2>
                </div>
                {/* List produts same cate */}
                <div id="related-products">{listSameProducts(item)}</div>
                <div id="recently-viewed" className="hidden">
                  {listViewsProducts(item)}
                </div>
              </div>
              <AnimatePresence>
                {showNoti && (
                  <motion.div
                    className="fixed bottom-[20px]  left-[12px] md:left-[5rem] w-[300px]  z-[1000]"
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
                      title={item.name}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }
      })}
    </div>
  );
}

export default ProductDetail;
