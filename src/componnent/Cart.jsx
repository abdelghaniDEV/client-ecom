import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementAmount,
  deleteItemCart,
  incrementAmount,
} from "../rtlk/slices/cart-slices";
import { motion } from "framer-motion";
// import { useHistory } from 'react-router-dom';

function Cart({ setShowCart }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const priceTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.amount, 0)
      .toFixed(2);
  };

  const changAmount = (e, item) => {
    const buttonValue = e.target.textContent;
    if (buttonValue === "+" && item.amount >= 1) {
      dispatch(incrementAmount(item));
    } else if (buttonValue === "-" && item.amount > 1) {
      dispatch(decrementAmount(item));
    }
  };

  return (
    <div id="cart" className="">
      <div className="flex items-center justify-between py-[10px] px-[25px]">
        <h3>SHOPPING CART</h3>
        <div>
          <i
            className="bx bx-x text-[35px]  h-[35px] w-[35px]     cursor-pointer"
            onClick={() => setShowCart(false)}
          ></i>
        </div>
      </div>
      <div>
        <div className=" flex flex-col  gap-3  md:h-[480px]  overflow-scroll px-[25px] ">
          {cart.map((item) => {
            return (
              <motion.div
                initial={{ x: "100vh" }}
                animate={{ x: 0 }}
                transition={{
                  duration: 0.6,
                }}
                className="flex  gap-3 border-t-2 pt-3"
                key={item.id}
              >
                <div>
                  <img
                    alt={item.name}
                    className="w-[100px] rounded-[5px]"
                    src={item.image[0]}
                  />
                </div>
                <div className="md:pt-2 flex flex-col  w-full ">
                  <Link
                    to={`product/${item._id}`}
                    onClick={() => setShowCart(false)}
                    className="text-[14px] truncate font-[600]"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-4">
                    <h1 className="font-medium text-[20px] leading-[18px]">
                      ${(item.price * item.amount).toFixed(2)}
                    </h1>
                    <span className="text-[red] text-[13px] line-through">
                      {item.PriceDiscount}
                    </span>
                  </div>
                  {item.sizeTarget && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-medium">
                        size:{" "}
                        <span className="text-[#686868] font-[600] text-[15px]">
                          {item.sizeTarget}
                        </span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3 bg-slate-200 px-4 py-">
                      <button onClick={(e) => changAmount(e, item)}>-</button>
                      <span className="border-r-2">{item.amount}</span>
                      <button onClick={(e) => changAmount(e, item)}>+</button>
                    </div>
                    <div className="flex items-center gap-3">
                      
                      <i
                        className="bx bx-trash text-[20px] text-[red]"
                        onClick={() => dispatch(deleteItemCart(item))}
                      ></i>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {cart.length === 0 && (
            <div className="text-center">
              <p className="text-[30px]  pt-[50%] ">Your cart is empty.</p>{" "}
              <Link
                to={"/products/All"}
                onClick={() => setShowCart(false)}
                className="text-[18px] py-1 px-6 border-2 border-black"
              >
                return To Shop
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex  fixed  bottom-0 items-center px-[25px] border-t-2  bg-slate-00 w-full py-2 z-[1000] bg-slate-100 ">
        <div className="flex gap-[40px] md:gap-[100px]">
          <div>
            <span className="text-[18px]">
              Total :{" "}
              <span className=" text-[22px] font-[600]">${priceTotal()}</span>
            </span>
          </div>
          <div className="py-1  ">
            <Link
              to={"/checkout"}
              onClick={() => setShowCart(false)}
              className="bg-[#C59780] text-white px-[18px] py-[6px] rounded-[20px] text-[15px] fon-[600]"
            >
              Checkout ({cart.length})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
