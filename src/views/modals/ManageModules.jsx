/* eslint-disable comma-dangle */
/* eslint-disable import/order */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import SelectContainer from "../../components/Forms/Select/SelectContainer";
import SelectOptions from "../../components/Forms/Select/SelectOptions";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TextInput from "../../components/Forms/TextInput";
import { useStateContext } from "../../contexts/ContextProvider";
import { formatSelectOptions, moduleTypes } from "../../resources/helpers";

const ManageModules = ({
  show = false,
  onHide,
  data = undefined,
  handleSubmit = undefined,
  dependencies = undefined,
}) => {
  const initialState = {
    id: 0,
    name: "",
    icon: "",
    path: "",
    parentId: 0,
    type: "",
    generatePermissions: 0,
  };

  const [state, setState] = useState(initialState);
  const [roles, setRoles] = useState([]);
  const { currentColor } = useStateContext();
  const animated = makeAnimated();

  const manageSubmit = (e) => {
    e.preventDefault();
    const body = {
      id: state.id,
      name: state.name,
      icon: state.icon,
      path: state.path,
      parentId: state.parentId,
      type: state.type,
      generatePermissions: state.generatePermissions,
      roles,
    };

    handleSubmit(body);
    setState(initialState);
    setRoles([]);
  };

  const handleClose = () => {
    setState(initialState);
    setRoles([]);
    onHide();
  };

  useEffect(() => {
    if (data !== undefined) {
      setState({
        ...state,
        id: data.id,
        name: data.name,
        icon: data.icon,
        path: data.path,
        parentId: data.parentId,
        type: data.type,
        generatePermissions: data.generatePermissions,
      });
      setRoles(formatSelectOptions(data.roles, "id", "name"));
    }
  }, [data]);

  return (
    <div
      id="employee-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        !show && "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div
        className="relative p-4 w-full max-w-2xl h-full md:h-auto"
        style={{ margin: "0px auto" }}
      >
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={() => handleClose()}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-10 text-xl font-medium text-gray-900 dark:text-white">
              Add New Module
            </h3>
            <form className="space-y-6" onSubmit={manageSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <TextInput
                    label="Name"
                    placeholder="Enter Module Name"
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <TextInput
                    label="Icon"
                    placeholder="Enter Module Icon"
                    value={state.icon}
                    onChange={(e) =>
                      setState({ ...state, icon: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <TextInput
                    label="Path"
                    placeholder="Enter Module Path"
                    value={state.path}
                    onChange={(e) =>
                      setState({ ...state, path: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <SelectContainer
                    label="Parent"
                    value={state.parentId}
                    onChange={(e) =>
                      setState({ ...state, parentId: Number(e.target.value) })
                    }
                  >
                    <SelectOptions value={0} label="None" />
                    {dependencies?.modules?.length > 0 &&
                      dependencies?.modules?.map((nav, i) => (
                        <SelectOptions
                          key={i}
                          value={nav.id}
                          label={nav.name}
                        />
                      ))}
                  </SelectContainer>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <SelectContainer
                    label="Type"
                    value={state.type}
                    onChange={(e) =>
                      setState({ ...state, type: e.target.value })
                    }
                  >
                    <SelectOptions value="" label="Select Menu Type" disabled />
                    {moduleTypes.map((type, i) => (
                      <SelectOptions
                        key={i}
                        value={type.key}
                        label={type.label}
                      />
                    ))}
                  </SelectContainer>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <SelectContainer
                    label="Generate Permissions"
                    value={state.generatePermissions}
                    onChange={(e) =>
                      setState({
                        ...state,
                        generatePermissions: Number(e.target.value),
                      })
                    }
                  >
                    <SelectOptions
                      value=""
                      label="Generate Permission?"
                      disabled
                    />
                    {[
                      { key: 0, label: "No" },
                      { key: 1, label: "Yes" },
                    ].map((type, i) => (
                      <SelectOptions
                        key={i}
                        value={type.key}
                        label={type.label}
                      />
                    ))}
                  </SelectContainer>
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <p className="block mb-2 text-sm font-medium text-gray-700">
                    Roles
                  </p>
                  <Select
                    closeMenuOnSelect={false}
                    components={animated}
                    options={formatSelectOptions(
                      dependencies.roles,
                      "id",
                      "name"
                    )}
                    value={roles}
                    onChange={setRoles}
                    isMulti
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{ backgroundColor: currentColor }}
              >
                Add Module
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageModules;
