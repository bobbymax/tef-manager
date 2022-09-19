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
import ManageTag from "../modals/ManageTag";

const Tags = () => {
  const [modalState, setModalState] = useState(false);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(undefined);

  const manageRow = (data) => {
    setTag(data);
    setModalState(true);
  };

  const handleSubmit = (data) => {
    // console.log(data);
    try {
      if (data?.id < 1) {
        store("tags", data)
          .then((res) => {
            const result = res.data;
            setTags([result.data, ...tags]);
            setModalState(false);
            Alert.success("Tag Added!!", result.message);
          })
          .catch((err) => console.log(err.message));
      } else {
        alter("tags", data.id, data)
          .then((res) => {
            const result = res.data;
            setTags(
              tags.map((tg) => {
                if (tg.id == result.data.id) {
                  return result.data;
                }

                return tg;
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
      collection("tags")
        .then((res) => {
          setTags(res.data.data);
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
        title="Tags"
        handleClick={() => setModalState(true)}
        isAdding={modalState}
        canAdd
      />

      <ManageTag
        show={modalState}
        handleSubmit={handleSubmit}
        onHide={() => setModalState(false)}
        data={tag}
      />

      <DataTable
        pillars={COLS.tags}
        rows={tags}
        manageRow={manageRow}
        canManage
      />
    </div>
  );
};

export default Tags;
