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
import ManageCategory from "../modals/ManageCategory";

const Categories = () => {
  const [modalState, setModalState] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(undefined);

  const manageRow = (data) => {
    setCategory(data);
    setModalState(true);
  };

  const handleSubmit = (data) => {
    // console.log(data);
    try {
      if (data?.id < 1) {
        store("categories", data)
          .then((res) => {
            const result = res.data;
            setCategories([result.data, ...categories]);
            setModalState(false);
            Alert.success("Category Added!!", result.message);
          })
          .catch((err) => console.log(err.message));
      } else {
        alter("categories", data.id, data)
          .then((res) => {
            const result = res.data;
            setCategories(
              categories.map((cat) => {
                if (cat.id == result.data.id) {
                  return result.data;
                }

                return cat;
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
      collection("categories")
        .then((res) => {
          setCategories(res.data.data);
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
        title="Categories"
        handleClick={() => setModalState(true)}
        isAdding={modalState}
        canAdd
      />

      <ManageCategory
        show={modalState}
        handleSubmit={handleSubmit}
        onHide={() => setModalState(false)}
        data={category}
        dependencies={{ categories }}
      />

      <DataTable
        pillars={COLS.categories}
        rows={categories}
        manageRow={manageRow}
        canManage
      />
    </div>
  );
};

export default Categories;
