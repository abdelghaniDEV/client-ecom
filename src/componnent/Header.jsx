import React, { useEffect, useState } from "react";
// import logo from '../logo_new_black@4x.png';
import Cart from "./Cart";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../images/SAFWA@4x.png";
import { AnimatePresence, motion } from "framer-motion";
import Search from "./Search";

function Header() {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const cart = useSelector((state) => state.cart);
  const wshlist = useSelector((state) => state.wshlist);
  const settings = useSelector((state) => state.settings);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleOpacityContent = () => {
      const productsContainer = document.querySelector("#products-container");
      if (showCart == true || showSearch === true || showMenu === true) {
        productsContainer.classList.remove("opacity-0", "invisible");
      } else {
        productsContainer.classList.add("opacity-0", "invisible");
      }
    };
    handleOpacityContent();
  }, [showCart, showSearch, showMenu]);
  const item = {
    exit: {
      opacity: 0,
      width: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
        // delay: 1.2,
      },
    },
  };

  return (
    <header className="   header-container rlative md:bg-white">
      <div
        id="products-container"
        onClick={() => setShowCart(false)}
        className="fixed top-0 left-0 w-full h-full bg-[#000000b3] opacity-0 invisible transition-opacity z-[1000] pointer-events-none "
      ></div>
      {/* animation cart */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="fixed top-0 h-full right-0 bg-white w-[90%] md:w-[400px]  z-[1000] overflow-scroll pb-[60px]"
            variants={item}
            initial={{ right: "-100vh", opacity: 0 }}
            animate={{ right: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit="exit"
          >
            <Cart setShowCart={setShowCart} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* animation search */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed top-0 right-0 bg-white w-[90%] md:w-[400px]  z-[1000]"
            variants={item}
            initial={{ left: "-100vh", opacity: 0 }}
            animate={{ left: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit="exit"
          >
            <Search setShowSearch={setShowSearch} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* animation menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed top-0 right-0 h-full bg-[#f5f5f7] w-[90%] md:w-[400px]  z-[1000]"
            variants={item}
            initial={{ left: "-100vh", opacity: 0 }}
            animate={{ left: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit="exit"
          >
            {/* <div className="bg-[#d4d4d4] flex items-center justify-between">
              <h1 className="text-[20px] py-3 pl-4 font-[500]">Menu</h1>
              <i
                class="bx bx-x  bg-black text-white text-[30px] p-3"
                onClick={() => setShowMenu(false)}
              ></i>
            </div> */}

            <ul className="  flex flex-col text-[#1D1D1F] items-center uppercase text-[40px] font-[800] pt-[50px]">
              <div
                className="btn_close cursor-pointer bg-[#1D1D1F] p-3 mb-3 text-[20px] flex items-center rounded-full text-center"
                onClick={() => setShowMenu(false)}
              >
                <i class="bx bx-x text-white text-[40px]"></i>
              </div>
              <li onClick={() => setShowMenu(false)}>
                <Link
                  className="cursor-pointer transition duration-250 hover:text-[#F5CAAB] overflow-hidden "
                  to={"/"}
                >
                  HOME
                </Link>
              </li>
              <li onClick={() => setShowMenu(false)}>
                <Link
                  className="cursor-pointer transition duration-250 hover:text-[#F5CAAB] overflow-hidden "
                  to={"/shop"}
                >
                  Shop
                </Link>
              </li>
              <li onClick={() => setShowMenu(false)}>
                <Link
                  className="cursor-pointer transition duration-250 hover:text-[#F5CAAB] overflow-hidden "
                  to={"/products/All"}
                >
                  products
                </Link>
              </li>
              <li onClick={() => setShowMenu(false)}>
                <Link
                  className="cursor-pointer transition duration-250 hover:text-[#F5CAAB] overflow-hidden "
                  to={"/wishlist"}
                >
                  wishlist
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-[#F5CAAB] hidden md:block">
        <div className="flex items-center justify-between container mx-auto  py-[10px] ">
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center gap-[5px] transition-all hover:text-[#eeeeee] cursor-pointer ">
              <i className="bx bx-phone text-[20px]"></i>
              <span className="text-[13px]">{settings.storePhone}</span>
            </div>
            <div className="flex items-center gap-[5px] transition-all hover:text-[#eeeeee] cursor-pointer">
              <i className="bx bx-envelope text-[20px]"></i>
              <span className="text-[13px]">{settings.storeEmail}</span>
            </div>
          </div>
          <div>
            <ul className="flex items-center gap-[15px]">
              <li>
                <a href={settings.facebookLink}>
                  <i className="bx bxl-facebook text-[20px]"></i>
                </a>
              </li>
              <li>
                <a href={settings.instagramLink}>
                  <i className="bx bxl-instagram-alt text-[20px]"></i>
                </a>
              </li>
              <li>
                <a href={settings.twitterLink}>
                  <i className="bx bxl-gmail text-[20px]"></i>
                </a>
              </li>
              <li>
                <a href={settings.tiktokLink}>
                  <i className="bx bxl-tiktok"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between  container py-3  md:py-[13px] ">
        {/* header notifi */}
        <div className="md:hidden">
          <i
            className="bx bx-menu text-[35px] cursor-pointer "
            onClick={() => setShowMenu(true)}
          ></i>
        </div>
        {/*  logo */}
        <div>
          <Link to="/">
            <img className="w-[100px]" src={settings.storeLogo} />
          </Link>
        </div>
        {/* menu */}
        <div className=" hidden md:block ">
          <ul className="flex md:items-center md:justify-between gap-[40px]  md:text-[15px]">
            <li>
              <Link
                className="cursor-pointer transition duration-250 hover:text-[#F5CAAB]"
                to={"/"}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                className="cursor-pointer transition duration-250 hover:text-[#F5CAAB]"
                to={"/shop"}
              >
                SHOP
              </Link>
            </li>
            <li>
              <Link
                className="cursor-pointer transition duration-250 hover:text-[#F5CAAB]"
                to={"/products/All"}
              >
                PRODUCTS
              </Link>
            </li>
            <li>
              <Link className="cursor-pointer transition duration-250 hover:text-[#F5CAAB]">
                BLOG
              </Link>
            </li>
          </ul>
        </div>
        {/* icons search and cart , and wishlist */}
        <div className="pr-[8px] md:pr-0">
          <ul className="flex items-start gap-1 md:gap-[12px]">
            <li>
              <a>
                <i
                  onClick={() => setShowSearch(true)}
                  className="bx bx-search text-[20px] md:text-[22px] cursor-pointer"
                ></i>
              </a>
            </li>
            <li className="">
              <Link to={"/wishlist"} className="relative">
                <i className="bx bx-heart text-[20px] md:text-[22px] "></i>
                <span className="absolute rounded-[20px] bottom-[18px] text-center md:bottom-[20px] left-[10px] md:left-[12px]  text-[12px] font-[500] bg-black text-white h-[18px] w-[18px]">
                  {wshlist.length}
                </span>
              </Link>
            </li>
            <li onClick={() => setShowCart(true)} className=" cursor-pointer">
              <a className="relative">
                <i className="bx bx-cart text-[20px] md:text-[22px] "></i>
                <span className="absolute rounded-[20px] bottom-[18px] text-center md:bottom-[20] left-[10px] md:left-[12px]  text-[12px] font-[500] bg-black text-white h-[18px] w-[18px]">
                  {cart.length}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
