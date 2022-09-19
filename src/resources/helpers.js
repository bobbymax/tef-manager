/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
export const staffTypes = [
  { key: "subscriber", label: "Subscriber" },
  { key: "staff", label: "Staff" },
  { key: "dispatch", label: "Rider" },
  { key: "adhoc", label: "AdHoc" },
  { key: "support", label: "Support" },
];

export const moduleTypes = [
  { key: "application", label: "Application" },
  { key: "module", label: "Module" },
  { key: "page", label: "Page" },
];

export const paymentMethods = [
  { key: "electronic", label: "Electronic" },
  { key: "cash", label: "Cash" },
];

export const isBooleanValue = [
  { key: 0, label: "No" },
  { key: 1, label: "Yes" },
];

export const formatSelectOptions = (data, value, label) =>
  data?.length > 0 &&
  data.map((val) => ({
    value: val[value],
    label: val[label],
  }));

export const allowedFileTypes = ["jpg", "jpeg", "png"];
export const getFileExt = (name) => name.split(".").pop();

export const formatCurrency = (amount) => {
  const currency = Intl.NumberFormat("en-US");
  return `NGN ${currency.format(amount)}`;
};

export const formatCurrencyWithoutSymbol = (amount) => {
  const currency = Intl.NumberFormat("en-US");
  return currency.format(amount);
};

export const VAT = 0.075;
export const subCharge = VAT;

export const updateCartState = (data, action = "") => {
  const cartItems = [];
  let storage = localStorage.getItem("basket");
  storage = storage ? JSON.parse(storage) : [];
  const newItem = {
    id: data.id,
    product_id: data.id,
    quantity: 1,
    price: parseFloat(data.price),
    basePrice: parseFloat(data.price),
    product_path: data.image,
    product_title: data.title,
  };

  if (storage?.length < 1) {
    cartItems.push(newItem);
  } else {
    const exists = storage?.filter((product) => product.id == newItem.id);
    if (exists?.length > 0) {
      storage?.map((product) => {
        if (product.id == newItem.id) {
          const addToQuantity = product.quantity + newItem.quantity;
          const addToPrice = product.price + product.basePrice;
          const subtractFromQuantity = product.quantity - newItem.quantity;
          const subtractFromPrice = product.price - product.basePrice;

          product.quantity =
            action === "add" ? addToQuantity : subtractFromQuantity;
          product.price = action === "add" ? addToPrice : subtractFromPrice;
          return product;
        }

        return product;
      });
      cartItems.push(...storage);
    } else {
      cartItems.push(newItem, ...storage);
    }
  }

  return cartItems;
};

export const deleteCartItems = () => {
  localStorage.removeItem("basket");
};

export const removeProductFromCart = (item) => {
  const cartItems = [];
  let storage = localStorage.getItem("basket");
  storage = storage ? JSON.parse(storage) : [];
  if (storage?.length > 0) {
    const newData = storage?.filter((product) => product.id != item.id);
    cartItems.push(...newData);
  }
  localStorage.clear();
  return cartItems;
};
