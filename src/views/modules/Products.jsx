/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable comma-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import DataTable from "../../components/Tables/DataTable";
import { collection } from "../../services/controllers";
import { COLS } from "../../resources/columns";
import Alert from "../../services/classes/Alert";

const Products = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const manageRow = (data) => {
    // console.log(data);
    navigate(`/products/${data.id}`, {
      state: {
        product: data,
      },
    });
  };

  const handleClick = () => {
    navigate("/products/create", {
      state: {
        product: null,
      },
    });
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

  useEffect(() => {
    if (location?.state?.product !== undefined) {
      const product = location?.state?.product;
      const message = location?.state?.message;
      const isUpdating = location?.state?.isUpdating;
      if (!isUpdating && message !== "") {
        setProducts([product, ...products]);
        Alert.success("Created!!", message);
      } else {
        setProducts(
          products?.map((prd) => {
            if (prd.id == product.id) {
              return product;
            }

            return prd;
          })
        );
        Alert.success("Updated", message);
      }
    }

    window.history.replaceState({}, document.title);
  }, [location?.state]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Products"
        handleClick={handleClick}
        canAdd
      />

      <DataTable
        pillars={COLS.products}
        rows={products}
        manageRow={manageRow}
        canManage
        selectable
      />
    </div>
  );
};

export default Products;
