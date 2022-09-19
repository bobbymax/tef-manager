/* eslint-disable eqeqeq */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import SelectContainer from "../../components/Forms/Select/SelectContainer";
import SelectOptions from "../../components/Forms/Select/SelectOptions";
import TextInput from "../../components/Forms/TextInput";
import { useStateContext } from "../../contexts/ContextProvider";
import { formatCurrency, paymentMethods, VAT } from "../../resources/helpers";
import Alert from "../../services/classes/Alert";
import { collection, store } from "../../services/controllers";
import { useCart } from "../../services/hooks";
import "./cart.css";

const Checkout = () => {
  const initialState = {
    orderId: "",
    user_id: 0,
    carts: [],
    grandTotal: 0,
    table_no: 0,
    payment_method: "",
    amount_received: 0,
    trnxId: "",
    email: "",
    mobile: "",
    additional_info: "",
    recipient: "",
    total: 0,
    vat: 0,
  };
  const { currentColor } = useStateContext();
  const [cart, setCart] = useCart();
  const [state, setState] = useState(initialState);
  const [waiters, setWaiters] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = `IOR${Math.floor(100000 + Math.random() * 900000)}`;

    const data = {
      orderId: code,
      user_id: state.user_id,
      carts: state.carts,
      table_no: state.table_no,
      payment_method: state.payment_method,
      amount_received: parseFloat(state.amount_received),
      trnxId: code,
      email: state.email,
      mobile: state.mobile,
      additional_info: state.additional_info,
      recipient: state.recipient,
      total_amount: parseFloat(state.total),
      vat: state.vat,
    };

    setIsDisabled(true);

    Alert.flash(
      "You are placing this order?",
      "warning",
      "You would not be able to revert this action!!"
    ).then((result) => {
      if (result.isConfirmed) {
        store("internalOrders", data)
          .then((res) => {
            const response = res.data;
            Alert.success("Congrats!!", response.message);
            setState(initialState);
            setIsDisabled(false);
            setCart([]);
            localStorage.clear();
            navigate("/internal-orders");
          })
          .catch((err) => {
            setIsDisabled(false);
            console.log(err.response.data.message);
          });
      } else {
        setIsDisabled(false);
      }
    });

    console.log(data);
  };

  useEffect(() => {
    try {
      collection("users")
        .then((res) => {
          setWaiters(res.data.data);
        })
        .catch((err) => console.log(err.message));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (cart?.length > 0) {
      const grandTotal = cart
        ?.map((item) => parseFloat(item.price))
        .reduce((sum, prev) => sum + prev, 0);
      const vat = grandTotal * VAT;
      setState({
        ...state,
        carts: cart,
        total: grandTotal + vat,
        vat,
      });
    }
  }, [cart]);

  // console.log(state);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Checkout" />

      <div className="grid grid-cols-9 gap-4">
        <div className="col-span-6 sm:col-span-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-2">
              <div className="col-span-2 sm:col-span-2">
                <TextInput
                  label="Table Number"
                  value={state.table_no}
                  onChange={(e) =>
                    setState({ ...state, table_no: e.target.value })
                  }
                  disabled={isDisabled}
                />
              </div>
              <div className="col-span-4 sm:col-span-4">
                <SelectContainer
                  label="Payment Method"
                  value={state.payment_method}
                  onChange={(e) =>
                    setState({ ...state, payment_method: e.target.value })
                  }
                  disabled={isDisabled}
                >
                  <SelectOptions
                    label="Select Payment Method"
                    value=""
                    disabled
                  />
                  {paymentMethods?.map((meth, i) => (
                    <SelectOptions
                      key={i}
                      value={meth.key}
                      label={meth.label}
                    />
                  ))}
                </SelectContainer>
              </div>
              <div className="col-span-3 sm:col-span-3">
                <TextInput
                  label="Email"
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                  placeholder="Enter Customer Email"
                  disabled={isDisabled}
                />
              </div>
              <div className="col-span-3 sm:col-span-3">
                <TextInput
                  label="Mobile Number"
                  value={state.mobile}
                  onChange={(e) =>
                    setState({ ...state, mobile: e.target.value })
                  }
                  placeholder="Enter Customer Mobile"
                  disabled={isDisabled}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <TextInput
                  label="Customer Name"
                  value={state.recipient}
                  onChange={(e) =>
                    setState({ ...state, recipient: e.target.value })
                  }
                  placeholder="Enter Customer Name"
                  disabled={isDisabled}
                />
              </div>
              <div className="col-span-4 sm:col-span-4">
                <TextInput
                  label="Amount Received"
                  value={state.amount_received}
                  onChange={(e) =>
                    setState({ ...state, amount_received: e.target.value })
                  }
                  placeholder="Enter Amount Received"
                  disabled={isDisabled}
                />
              </div>
              <div className="col-span-2 sm:col-span-2">
                <SelectContainer
                  label="Waiter"
                  value={state.user_id}
                  onChange={(e) =>
                    setState({ ...state, user_id: e.target.value })
                  }
                  disabled={isDisabled}
                >
                  <SelectOptions label="Select Waiter" value={0} disabled />
                  {waiters?.length > 0 &&
                    waiters?.map((user, i) => (
                      <SelectOptions
                        key={i}
                        value={user.id}
                        label={user.name}
                      />
                    ))}
                </SelectContainer>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <TextInput
                  label="Additional Information"
                  value={state.additional_info}
                  onChange={(e) =>
                    setState({ ...state, additional_info: e.target.value })
                  }
                  multiline={3}
                  placeholder="Add any other relevant information"
                  disabled={isDisabled}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <button
                  type="submit"
                  className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{ backgroundColor: currentColor }}
                  disabled={
                    isDisabled ||
                    state.table_no == 0 ||
                    state.amount_received == 0 ||
                    state.user_id == 0
                  }
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-3 sm:col-span-3">
          <section className="cartArea">
            {cart?.length > 0
              ? cart?.map((item, i) => (
                  <div
                    key={i}
                    className="cart-items grid grid-cols-6 gap-2 mb-3"
                    style={{ border: `1px solid ${currentColor}` }}
                  >
                    <div className="col-span-2 sm:col-span-2">
                      <img
                        style={{ width: 102, height: 91 }}
                        src={item.product_path}
                        alt={item.product_title}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-4">
                      <h4
                        className="font-semibold"
                        style={{ color: currentColor }}
                      >
                        {item.product_title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <h3 className="text-xl font-semibold">
                        {formatCurrency(item.price)}
                      </h3>
                    </div>
                  </div>
                ))
              : "No data"}
          </section>
          <section>
            <div className="sumArea mt-5">
              <div className="grid grid-cols-9 gap-3">
                <div className="col-span-4 sm:col-span-4">
                  <h4
                    className="text-gray-700 font-semibold"
                    style={{ color: currentColor }}
                  >
                    Sub Total:
                  </h4>
                </div>
                <div className="col-span-5 sm:col-span-5">
                  <p className="text-gray-700 font-semibold">
                    {formatCurrency(state.vat)}
                  </p>
                </div>
                <div className="col-span-4 sm:col-span-4">
                  <h4
                    className="text-gray-700 font-semibold"
                    style={{ color: currentColor }}
                  >
                    Grand Total:
                  </h4>
                </div>
                <div className="col-span-5 sm:col-span-5">
                  <p className="text-gray-700 font-semibold text-xl">
                    {formatCurrency(state.total)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
