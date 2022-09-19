/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { COLS } from "../../resources/columns";
import DataTable from "../../components/Tables/DataTable";
import { collection } from "../../services/controllers";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      collection("orders")
        .then((res) => {
          setOrders(res.data.data);
        })
        .catch((err) => console.log(err.response.data.message));
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <DataTable pillars={COLS.orders} rows={orders} />
    </div>
  );
};

export default Orders;
