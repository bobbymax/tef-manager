/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components";
import DataTable from "../../components/Tables/DataTable";
import { COLS } from "../../resources/columns";
import Alert from "../../services/classes/Alert";
import { alter, batch, collection, store } from "../../services/controllers";
import ManageEmployee from "../modals/ManageEmployee";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [roles, setRoles] = useState([]);
  const [employee, setEmployee] = useState(undefined);

  const manageRow = (data) => {
    setEmployee(data);
    setModalState(true);
  };

  const handleSubmit = (data) => {
    // console.log(data);
    try {
      if (data.id < 1) {
        store("users", data)
          .then((res) => {
            const result = res.data;
            setEmployees([result.data, ...employees]);
            setModalState(false);
            Alert.success("Created!!", result.message);
          })
          .catch((err) => console.log(err.message));
      } else {
        alter("users", data.id, data)
          .then((res) => {
            const result = res.data;

            setEmployees(
              employees.map((staff) => {
                if (staff.id == result.data.id) {
                  return result.data;
                }

                return staff;
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
      const userData = collection("users");
      const rolesData = collection("roles");

      batch([userData, rolesData])
        .then(
          axios.spread((...res) => {
            setEmployees(res[0].data.data);
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
        title="Employees"
        handleClick={() => setModalState(true)}
        isAdding={modalState}
        toggleModal="employee-modal"
        canAdd
      />

      <ManageEmployee
        show={modalState}
        handleSubmit={handleSubmit}
        onHide={() => {
          setModalState(false);
          setEmployee(undefined);
        }}
        dependencies={{ roles }}
        data={employee}
      />

      <DataTable
        pillars={COLS.employees}
        rows={employees}
        manageRow={manageRow}
        canManage
        // selectable
      />
    </div>
  );
};

export default Employees;
