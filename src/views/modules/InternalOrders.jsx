/* eslint-disable no-console */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLS } from "../../resources/columns";
import { Header } from "../../components";
import DataTable from "../../components/Tables/DataTable";
import { collection } from "../../services/controllers";

const InternalOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const manageOrder = (data) => {
    console.log(data);
    navigate(`/internal-orders/${data.orderId}`, {
      state: {
        order: data,
      },
    });
  };

  useEffect(() => {
    try {
      collection("internalOrders")
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
      <Header category="Page" title="Internal Orders" />
      <DataTable
        pillars={COLS.orders}
        rows={orders}
        manageRow={manageOrder}
        canManage
      />
    </div>
  );
};

export default InternalOrders;
