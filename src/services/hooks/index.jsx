/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
import { useState, useEffect } from "react";

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("basket");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(cart));
  }, [cart]);

  return [cart, setCart];
};
