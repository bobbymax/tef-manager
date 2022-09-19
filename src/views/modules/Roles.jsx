/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable comma-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import DataTable from "../../components/Tables/DataTable";
import ManageRoles from "../modals/ManageRoles";
import { COLS } from "../../resources/columns";
import { alter, collection, store } from "../../services/controllers";
import Alert from "../../services/classes/Alert";

const Roles = () => {
  const [modalState, setModalState] = useState(false);
  const [roles, setRoles] = useState([]);
  const [rol, setRol] = useState(undefined);

  const manageRow = (data) => {
    // console.log(data);
    setRol(data);
    setModalState(true);
  };

  const handleSubmit = (data) => {
    try {
      if (data.id < 1) {
        store("roles", data)
          .then((res) => {
            const result = res.data;
            setRoles([result.data, ...roles]);
            setModalState(false);
            Alert.success("Role Added!!", result.message);
          })
          .catch((err) => console.log(err.message));
      } else {
        alter("roles", data.id, data)
          .then((res) => {
            const result = res.data;
            setRoles(
              roles.map((role) => {
                if (role.id == result.data.id) {
                  return result.data;
                }

                return role;
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
      collection("roles")
        .then((res) => {
          const result = res.data.data;
          setRoles(result);
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
        title="Roles"
        handleClick={() => setModalState(true)}
        isAdding={modalState}
        canAdd
      />

      <ManageRoles
        show={modalState}
        handleSubmit={handleSubmit}
        onHide={() => setModalState(false)}
        data={rol}
      />

      <DataTable
        pillars={COLS.roles}
        rows={roles}
        manageRow={manageRow}
        canManage
      />
    </div>
  );
};

export default Roles;
