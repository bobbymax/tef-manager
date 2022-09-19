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
import ManageClassification from "../modals/ManageClassification";

const Classifications = () => {
  const [modalState, setModalState] = useState(false);
  const [classifications, setClassifications] = useState([]);
  const [classification, setClassification] = useState(undefined);

  const manageRow = (data) => {
    setClassification(data);
    setModalState(true);
  };

  const handleSubmit = (data) => {
    // console.log(data);
    try {
      if (data?.id < 1) {
        store("classifications", data)
          .then((res) => {
            const result = res.data;
            setClassifications([result.data, ...classifications]);
            setModalState(false);
            Alert.success("Classification Added!!", result.message);
          })
          .catch((err) => console.log(err.message));
      } else {
        alter("classifications", data.id, data)
          .then((res) => {
            const result = res.data;
            setClassifications(
              classifications.map((brnd) => {
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
      collection("classifications")
        .then((res) => {
          setClassifications(res.data.data);
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
        title="Classifications"
        handleClick={() => setModalState(true)}
        isAdding={modalState}
        canAdd
      />

      <ManageClassification
        show={modalState}
        handleSubmit={handleSubmit}
        onHide={() => setModalState(false)}
        data={classification}
      />

      <DataTable
        pillars={COLS.classifications}
        rows={classifications}
        manageRow={manageRow}
        canManage
      />
    </div>
  );
};

export default Classifications;
