/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Header } from "../../components";
import { collection } from "../../services/controllers";
import { formatCurrency, updateCartState } from "../../resources/helpers";
import { useStateContext } from "../../contexts/ContextProvider";
import Alert from "../../services/classes/Alert";
import { useCart } from "../../services/hooks";
// import prodImg from "../../data/product2.jpg";

const Menu = () => {
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useCart();
  const { currentColor } = useStateContext();

  const handleAddToCart = (product) => {
    const newItems = updateCartState(product, "add");
    setCart(newItems);
    Alert.success("Added!!", `${product.title} added to cart successfully!!`);
  };

  useEffect(() => {
    try {
      collection("products")
        .then((res) => {
          setProducts(res.data.data);
        })
        .catch((err) => console.log(err.message));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(products);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Menu" />

      <div className="product-area mb-4">
        <div className="grid grid-cols-9 gap-4">
          {products?.map((product, i) => (
            <div key={i} className="col-span-3 sm:col-span-9 md:col-span-3">
              <div className="w-full max-w-sm bg-white rounded-lg shadow-md dar:bg-gray-800 dark:border-gray-700">
                <div className="px-5 pb-5">
                  <h2
                    className="uppercase sm:text-sm md:text-xl mb-3 font-semibold tracking-tight text-gray-600 dark:text-white"
                    style={{ color: currentColor, letterSpacing: 2 }}
                  >
                    {product?.title}
                  </h2>
                  <div className="product-image mb-3">
                    <img
                      src={product?.image}
                      alt={product?.title}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold text-gray-600">
                      {formatCurrency(product.price)}
                    </p>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      style={{ backgroundColor: currentColor }}
                      onClick={() => handleAddToCart(product)}
                    >
                      <FiShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
