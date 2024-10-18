import React, { useState } from "react";

import womenCate from "../images/womennew.png";
import menCate from "./NEN-1.png";
import arrowDesighn from "../images/arrow-2.png";
import desighOne from "../images/shape-11-02-2.png";
import desighnThow from "../images/shape-07-02-2 (1).png";
import desighn from "../images/shape-02-03-2.png";
import banner from "../images/Fashion-5 (3).webp"


import { useSelector } from "react-redux";
import ListProducts from "../componnent/ListProducts";
import ProductSlider from "../componnent/ProductsSlider";
import ImagesSlider from "../componnent/ImagesSlider";
import CategoriesSlice from "../rtlk/slices/categories-slice";
import CategpryCart from "../componnent/CategpryCart";
import Notification from "../componnent/Notification";
import { motion } from "framer-motion"
function Home() {
  // const [products, setProducts] = useRecoilState(productsState);

  const products = useSelector(state => state.products);
  const categories = useSelector(state => state.categories)
  const betterProducts = products.filter((product) => product.better === true)

  const sameItems = products.filter((product) => product.better === true)

    

  return (
    <section >
     {/* hero style */}
      <div className="relative">
        <div className="">
          <img alt="hom1"
            className=" object-cover object-right  w-full h-[350px] md:h-full"
            // src="https://demo-unsen.myshopify.com/cdn/shop/files/Fashion-5.jpg?v=1658990456&width=1500"
            src={banner}
          />
        </div>
        <motion.div 
          initial={{ x:-200 }}
          animate={{ x:0 }}
          transition={{ 
            duration: 0.6
           }} 
          className="absolute  top-[40%] left-5 flex flex-col items-center gap-1 md:left-[17%] md:top-[20%] md:gap-6 md:w-[300px] ">
          <span className="font-[700] md:font-normal">UP TO 50% OF ONLINE</span>
          <h1 className="text-[35px]   text-center leading-10 md:text-[60px] md:leading-[70px] lg:text-[80px] lg:leading-[100px] ">
            Sprint Collection
          </h1>
          <a className="text-[11px] bg-black text-white  py-[10px] px-[20px] transition duration-700 hover:bg-white hover:text-[black] md:py-[12px] md:px-[30px]">
            Shop Collection
          </a>
        </motion.div>
      </div>
      <motion.div 
        className="m-[35px] grid grid-cols-1 gap-6  md:grid-cols-3  ">
        {/* {categories.map((cate) => {
          if(cate.index === 1){
            return />
          }
        })} */}
        {/* <CategpryCart category={categories[0]}/> */}
      </motion.div>
      <div>
        <div className="  flex flex-col gap-2 items-center mb-[20px]">
          <h1 className="text-[30px] font-medium lg:text-[40px]">BEST COLLECTION</h1>
          <p className="text-[12px]  text-center px-[60px]">
            Donec venenatis vulputate lorem roin sapien ipsum, porta a auctor
          </p>
        </div>
        <ListProducts products={products} />
      </div>
      {/* banner */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className=" relative bg-[#F1EEF4] h-[240px] my-[30px] overflow-hidden flex md:h-[420px]   ">
        <div>
          <img
            className="hidden lg:block lg:absolute lg:bottom-0 lg:right-0"
            src={desighOne}
          />
          <img
            className="hidden  lg:block lg:absolute  lg:left-[18%]"
            src={arrowDesighn}
          />
          <img
            className="hidden  lg:block lg:absolute lg:right-0"
            src={desighnThow}
          />
          <img
            className="hidden  lg:block lg:absolute lg:right-[80px] lg:top-[80px] md:hidden"
            src={desighn}
          />
        </div>
        <div >
          <img
            className="w-[400px] md:w-[500px]"
            src="https://demo-unsen.myshopify.com/cdn/shop/products/straw-floppy-hat_04.jpg?v=1661767425&width=700"
          />
        </div>
        <div className="flex flex-col items-center gap-4 mt-auto mb-auto pr-[30px]">
          <h1  className="text-[30px]  text-center font-medium md:text-[50px] lg:text-[60px] overflow-hidden">
            Safwa fashion store.
          </h1>
          <p className="text-center hidden lg:block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <span  className="flex items-center lg:gap-2  border-2 border-black  px-[10px] py-1  md:px-[20px] md:py-[8px]">
            <a className="text-[12px] text-black">Get to know us more</a>
            <i className="bx bx-right-arrow-circle text-black text-[25px] hidden"></i>
          </span>
        </div>
      </motion.div>
      {/* products slider */}
      <div>
        <div className="text-center px-[40px] pb-[30px]">
          <h1 className="text-[30px] font-medium lg:text-[40px] lg:pb-2">Must have items</h1>
          <p className="text-[13px] text-[#868686] lg:text-[16px]">Donec venenatis vulputate lorem roin sapien ipsum, porta a auctor
          quis, euismod</p>
        </div>
        <ProductSlider products={sameItems}/>
      </div>
      <div className="bg-[#eaf2ee] py-[70px] my-[25px] text-center relative">
      <div>
          <img
            className="hidden lg:block lg:absolute lg:bottom-0 lg:right-0"
            src={desighOne}
          />
          <img
            className="hidden  lg:block lg:absolute  lg:top-0 left-[40px]"
            src={arrowDesighn}
          />
          <img
            className="hidden  lg:block lg:absolute lg:right-0"
            src={desighnThow}
          />
          <img
            className="hidden  lg:block lg:absolute lg:right-[35%] lg:top-[20px] md:hidden"
            src={desighn}
          />
        </div>
        <div className="flex flex-col items-center container pb-4 ">
          <h1 className=" text-[25px] text-center lg:text-[35px] lg:leading-[50px] ">Fancy $10* off <br/> your first order?</h1>
          <span className="pt-4 text-[15px]">Join our mailing list!</span>
        </div>
        <div className="flex flex-col md:flex-row justify-center  md:gap-[50px] gap-4 px-[40px] ">
             <input placeholder="entre your email" className="text-[14px] py-2 pl-1 bg-[#eaf2ee] border-b-2 focus:outline-none border-black md:w-[400px]" />
             <button className="text-[15px] font-medium border-2 border-black py-1 md:px-[20px] md:mx-0 mx-[90px]">SUBSCRIBE</button>
          </div>
      </div>
      <div className="">
        <div className=" text-[20px]  lg:text-[35px] container flex items-end justify-between  ">
          <h1 className="text-[#868686] leading-[20px] lg:leading-[35px]">Shop <br/><span className="text-[black]">Instagram</span></h1>
          <div className="flex items-center gap-1 border-b-2 p-1">
            <i className='bx bxl-instagram-alt lg:text-[30px]' ></i>
            <span className="text-[15px] lg:text-[20px] font-medium">Safwa</span>
          </div>
        </div>
        <div className="my-[25px] mb-[70px]">
           <ImagesSlider />
        </div>
      </div>
    </section>
  );
}

export default Home;
