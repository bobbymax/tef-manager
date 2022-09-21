/* eslint-disable comma-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  formatCurrency,
  formatCurrencyWithoutSymbol,
} from "../../resources/helpers";
import Alert from "../../services/classes/Alert";
import { alter } from "../../services/controllers";
import "./cart.css";
import logo from "../../data/logo.png";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [order, setOrder] = useState(undefined);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrintOrder = (data) => {
    console.log(data);
    setIsPrinting(true);
  };

  const printDocket = () => {
    // window.print();

    const mywindow = window.open("", "PRINT", "height=400,width=600");

    mywindow.document.write(
      `<html><head><link rel="stylesheet" href="./cart.css" /><title>TEF</title>`
    );
    mywindow.document.write("</head><body >");
    mywindow.document.write(document.getElementById("docketPrint").innerHTML);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    // mywindow.close();

    return true;
  };

  const fulfillOrder = (data) => {
    // console.log(data);
    const body = {
      paid: true,
      status: "fulfilled",
      closed: true,
    };

    try {
      alter("internalOrders", data?.id, body)
        .then((res) => {
          const result = res.data;
          Alert.success("Fulfilled!!", result.message);
          navigate("/internal-orders", {
            state: {
              order: undefined,
            },
          });
        })
        .catch((err) => console.log(err.response.data.message));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location?.state?.order !== undefined) {
      try {
        const commitment = location?.state?.order;
        setOrder(commitment);
      } catch (error) {
        console.log(error);
      }
    }
  }, [location?.state]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {!isPrinting ? (
        <>
          <Header category="Page" title="Order Summary" />

          <div id="orderDetails">
            <div className="grid grid-cols-8 gap-3">
              <div className="col-span-5 sm:col-span-5">
                <div className="orderHeader">
                  {order?.closed === "closed" && (
                    <span className="badge text-sm bg-red-600">
                      {order?.closed}
                    </span>
                  )}

                  <h2
                    className={`text-2xl font-semibold text-gray-700 dark:text-gray-300 ${
                      order?.closed === "closed" && "mt-3"
                    }`}
                  >
                    {order?.orderId}
                  </h2>
                  <p className="text-sm text-gray-600 uppercase">{`Table Number: ${order?.table_no}`}</p>
                  <p className="text-sm text-gray-600 uppercase mb-4">{`Payment Method: ${order?.payment_method}`}</p>
                  <span
                    style={{ backgroundColor: currentColor }}
                    className="badge text-sm"
                  >
                    {order?.status}
                  </span>
                </div>
              </div>
              <div className="col-span-3 sm:col-span-3">
                <div className="float-right">
                  <h2 className="text-4xl">{formatCurrency(order?.amount)}</h2>
                  <button
                    type="button"
                    style={{ backgroundColor: currentColor }}
                    className="mt-4 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => handlePrintOrder(order)}
                  >
                    Print Docket
                  </button>
                  {order?.status !== "fulfilled" && (
                    <button
                      type="button"
                      style={{ backgroundColor: currentColor }}
                      onClick={() => fulfillOrder(order)}
                      className="mt-4 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={order?.status === "fulfilled"}
                    >
                      Fulfil Order
                    </button>
                  )}
                </div>
              </div>
              <div className="col-span-8 sm:col-span-8">
                <table className="mt-5 invoice-table w-full border-collapse text-left text-gray-600 uppercase dark:text-gray-400">
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.items?.length > 0 &&
                      order?.items?.map((item, i) => (
                        <tr key={i}>
                          <td>{item?.title}</td>
                          <td>{item?.quantity}</td>
                          <td>{formatCurrencyWithoutSymbol(item?.amount)}</td>
                        </tr>
                      ))}
                    <tr className="font-bold">
                      <td colSpan={2}>Total:</td>
                      <td>{formatCurrency(order?.amount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="docket" id="docketPrint">
            <div className="brand">
              <img src={logo} alt="Brand Logo" style={{ margin: "0px auto" }} />
              <p className="restuarant mt-2">Tamuno Exalted Fingers</p>
              <address>38 Lingu Crescent, Wuse II, Abuja</address>
              <small>Tel: +234 705 1964 777</small>
            </div>
            <div className="details mt-4">
              <h4 className="text-center mb-2">Bill (Unpaid)</h4>
              <div className="dab">
                <table className="topDetail">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Order No.:</strong>
                      </td>
                      <td className="float-right">458959003</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Date.:</strong>
                      </td>
                      <td className="float-right">20-Sep-2022</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Waiter:</strong>
                      </td>
                      <td className="float-right">CHIDI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="orderDetails mt-5">
              <table className="cart-items">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fresh Fish (catfish)</td>
                    <td>5</td>
                    <td>2,000</td>
                    <td>10,000</td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      style={{ textAlign: "left", padding: "12px 0" }}
                    >
                      <strong>Order Total:</strong>
                    </td>
                    <td>10,000</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-center mt-4">Thank you for your purchase!!</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => printDocket()}
            className="mt-4 w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Print Docket
          </button>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
