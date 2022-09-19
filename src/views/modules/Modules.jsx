/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable radix */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { COLS } from "../../resources/columns";
import { Header } from "../../components";
import DataTable from "../../components/Tables/DataTable";
import { alter, batch, collection, store } from "../../services/controllers";
import ManageModules from "../modals/ManageModules";
import Alert from "../../services/classes/Alert";

const Modules = () => {
  const [modalState, setModalState] = useState(false);
  const [modules, setModules] = useState([]);
  const [roles, setRoles] = useState([]);
  const [module, setModule] = useState(undefined);

  const manageRow = (data) => {
    setModule(data);
    setModalState(true);
  };

  const handleSubmit = (data) => {
    console.log(data);
    try {
      if (data?.id < 1) {
        store("modules", data)
          .then((res) => {
            const result = res.data;
            setModules([result.data, ...modules]);
            setModalState(false);
            Alert.success("Module Added!!", result.message);
          })
          .catch((err) => console.log(err.message));
      } else {
        alter("modules", data.id, data)
          .then((res) => {
            const result = res.data;
            setModules(
              modules.map((mod) => {
                if (mod.id == result.data.id) {
                  return result.data;
                }

                return mod;
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
      const modulesData = collection("modules");
      const rolesData = collection("roles");
      batch([modulesData, rolesData])
        .then(
          axios.spread((...res) => {
            setModules(res[0].data.data);
            setRoles(res[1].data.data);
          })
        )
        .catch((err) => console.log(err.message));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Modules"
        handleClick={() => setModalState(true)}
        isAdding={modalState}
        canAdd
      />

      <ManageModules
        show={modalState}
        handleSubmit={handleSubmit}
        onHide={() => setModalState(false)}
        data={module}
        dependencies={{ modules, roles }}
      />

      <DataTable
        pillars={COLS.modules}
        rows={modules}
        manageRow={manageRow}
        canManage
      />
    </div>
  );
};

export default Modules;
