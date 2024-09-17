import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementAmount,
  deleteItemCart,
  deletItemCart,
  incrementAmount,
} from "../rtlk/slices/cart-slices";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../api";
// import { useHistory } from 'react-router-dom';

function Cart({ setShowCart }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const stripePromise = loadStripe(
    "pk_test_51Px9ITFcvwzdK8OARbahJMcmYbry0gWZstXb6bROkVgFspD0frKPGQ1LI70Dl9n0TxUB4erpmPp5pqUe8hSpMqr700zCglaxwK"
  );

  const priceTotal = () => {
    return cart
      .reduce((total, item) => total + item.attributes.price * item.amount, 0)
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
                    alt={item.attributes.title}
                    className="w-[120px] rounded-[5px]"
                    src={item.attributes.images.data[0].attributes.url}
                  />
                </div>
                <div className="md:pt-2 flex flex-col  w-full ">
                  <Link
                    to={`product/${item.id}`}
                    onClick={() => setShowCart(false)}
                    className="text-[14px] truncate font-[600]"
                  >
                    {item.attributes.title}
                  </Link>
                  {/* <span className="text-[12px] text-[#055507] font-medium">
                    In Stock
                  </span> */}
                  <div className="flex items-center gap-4">
                    <h1 className="font-medium text-[20px]">
                      ${(item.attributes.price * item.amount).toFixed(2)}
                    </h1>
                    <span className="text-[red] text-[13px] line-through">
                      {item.attributes.discount}
                    </span>
                  </div>
                  {item.attributes.sizeclothes && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-medium">
                        size:{" "}
                        <span className="text-[#686868]">
                          {item.sizeTarget}
                        </span>
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3 bg-slate-200 px-5 py-1">
                      <button onClick={(e) => changAmount(e, item)}>-</button>
                      <span className="border-r-2">{item.amount}</span>
                      <button onClick={(e) => changAmount(e, item)}>+</button>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* <Link onClick={() => setShowCart(false)} to={`product/${item.id}`}><i className='bx bxs-edit-alt text-[20px]' ></i></Link> */}
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
        <div className="flex gap-[120px]">
          <div>
            <span className="text-[18px]">
              Total :{" "}
              <span className=" text-[22px] font-[600]">${priceTotal()}</span>
            </span>
          </div>
          <div className="py-1 ">
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
