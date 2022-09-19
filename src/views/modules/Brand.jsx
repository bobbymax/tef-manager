/* eslint-disable comma-dangle */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { Header } from "../../components";
import { COLS } from "../../resources/columns";
import DataTable from "../../components/Tables/DataTable";
import Alert from "../../services/classes/Alert";
import { alter, collection, store } from "../../services/controllers";
import ManageBrand from "../modals/ManageBrand";

const Brand = () => {
  const [modalState, setModalState] = useState(false);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState(undefined);

  const manageRow = (data) => {
    setBrand(data);
    setModalState(true);
  };

  const handleSubmit = (data) => {
    // console.log(data);
    try {
      if (data?.id < 1) {
        store("brands", data)
          .then((res) => {
            const result = res.data;
            setBrands([result.data, ...brands]);
            setModalState(false);
            Alert.success("Brand Added!!", result.message);
          })
          .catch((err) => console.log(err.message));
      } else {
        alter("brands", data.id, data)
          .then((res) => {
            const result = res.data;
            setBrands(
              brands.map((brnd) => {
                if (brnd.id == result.data.id) {
                  return result.data;
                }

                return brnd;
              })
            );
            setModalState(false);
            Alert.success("Updated!!", result.message);
          })
          .catch((err) => console.log(err.message));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      collection("brands")
        .then((res) => {
          setBrands(res.data.data);
        })
        .catch((err) => console.log(err.message));
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Brands"
        handleClick={() => setModalState(true)}
        isAdding={modalState}
        canAdd
      />

      <ManageBrand
        show={modalState}
        handleSubmit={handleSubmit}
        onHide={() => setModalState(false)}
        data={brand}
      />

      <DataTable
        pillars={COLS.brands}
        rows={brands}
        manageRow={manageRow}
        canManage
      />
    </div>
  );
};

export default Brand;
