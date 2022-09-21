/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
/* eslint-disable semi */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from ".";
import { useCart } from "../services/hooks";
import {
  formatCurrency,
  formatCurrencyWithoutSymbol,
  removeProductFromCart,
  subCharge,
  updateCartState,
} from "../resources/helpers";

const Cart = () => {
  const { currentColor, setIsClicked } = useStateContext();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);

  const proceedToCheckout = () => {
    setIsClicked(false);
    navigate("/checkout");
  };

  const updateCart = (data, action = "") => {
    const newItems = updateCartState(data, action);
    setCart(newItems);
  };

  const handleRemoveProductFromCart = (item) => {
    const newItems = removeProductFromCart(item);
    setCart(newItems);
  };

  useEffect(() => {
    if (cart?.length > 0) {
      const totalAmount = cart
        ?.map((item) => parseFloat(item.price))
        .reduce((sum, prev) => sum + prev, 0);

      setTotal(totalAmount);
    } else {
      setTotal(0);
    }
  }, [cart]);

  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 ">
      <div className="float-right h-screen  duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Shopping Cart</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        {cart?.map((item, index) => (
          <div key={index}>
            <div>
              <div className="flex items-center   leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
                <img
                  className="rounded-lg h-80 w-24"
                  src={item.product_path}
                  alt=""
                />
                <div>
                  <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                    {item.product_title}
                  </p>
                  <button
                    type="button"
                    className="dark:text-red-400 text-xs mt-1 capitalize font-semibold text-red-500"
                    onClick={() => handleRemoveProductFromCart(item)}
                  >
                    Remove
                  </button>
                  <div className="flex gap-4 mt-2 items-center">
                    <p className="font-semibold text-lg">
                      {formatCurrencyWithoutSymbol(item.price)}
                    </p>
                    <div className="flex items-center border-1 border-r-0 border-color rounded">
                      <button
                        type="button"
                        className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 "
                        onClick={() => updateCart(item, "subtract")}
                        disabled={item.quantity == 1}
                      >
                        <AiOutlineMinus />
                      </button>
                      <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">
                        {item.quantity}
                      </p>
                      <button
                        type="button"
                        className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"
                        onClick={() => updateCart(item, "add")}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {cart?.length > 0 ? (
          <>
            <div className="mt-3 mb-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-200 uppercase text-sm">
                  vat
                </p>
                <p className="font-semibold">{`${subCharge * 100}%`}</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-500 dark:text-gray-200 uppercase text-sm">
                  Sub Total
                </p>
                <p className="font-semibold">
                  {formatCurrency(total * subCharge)}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-500 dark:text-gray-200 uppercase text-sm">
                  Total
                </p>
                <p className="font-semibold">
                  {formatCurrency(total + subCharge * total)}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mt-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{ backgroundColor: currentColor }}
                onClick={() => proceedToCheckout()}
              >
                Place Order
              </button>
            </div>
          </>
        ) : (
          <div className="mt-3 mb-3">
            <p>Your Cart is Empty!!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
