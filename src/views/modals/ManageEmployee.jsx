/* eslint-disable eqeqeq */
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import SelectContainer from "../../components/Forms/Select/SelectContainer";
import SelectOptions from "../../components/Forms/Select/SelectOptions";
import TextInput from "../../components/Forms/TextInput";
import { useStateContext } from "../../contexts/ContextProvider";
import { staffTypes } from "../../resources/helpers";

const ManageEmployee = ({
  show = false,
  onHide,
  data = undefined,
  handleSubmit = undefined,
  dependencies = undefined,
}) => {
  const initialState = {
    id: 0,
    name: "",
    email: "",
    mobile: "",
    type: "",
    designation: "",
    role_id: 0,
  };
  const { currentColor } = useStateContext();
  const [state, setState] = useState(initialState);

  const manageSubmit = (e) => {
    e.preventDefault();
    const body = {
      id: state.id,
      name: state.name,
      email: state.email,
      mobile: state.mobile,
      type: state.type,
      designation: state.designation,
      role_id: state.role_id,
    };

    handleSubmit(body);
    setState(initialState);
  };

  const handleClose = () => {
    setState(initialState);
    onHide();
  };

  useEffect(() => {
    if (data !== undefined) {
      setState({
        ...state,
        id: data.id,
        name: data.name,
        email: data.email,
        mobile: data.mobile ?? "",
        type: data.type,
        designation: data.designation,
        role_id: data.role_id,
      });
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
              Sign in to our platform
            </h3>
            <form className="space-y-6" onSubmit={manageSubmit}>
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-3 sm:col-span-4">
                  <TextInput
                    label="Name"
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    placeholder="Enter Staff Name Here"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <TextInput
                    label="Email"
                    value={state.email}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                    placeholder="Enter Staff Email Here"
                  />
                </div>
                <div className="col-span-3 sm:col-span-3">
                  <TextInput
                    label="Mobile"
                    value={state.mobile}
                    onChange={(e) =>
                      setState({ ...state, mobile: e.target.value })
                    }
                    placeholder="Enter Staff Mobile Here"
                  />
                </div>
                <div className="col-span-3 sm:col-span-3">
                  <SelectContainer
                    label="Type"
                    value={state.type}
                    onChange={(e) =>
                      setState({ ...state, type: e.target.value })
                    }
                  >
                    <SelectOptions
                      value=""
                      label="Select Staff Type"
                      disabled
                    />

                    {staffTypes.map((typ, i) => (
                      <SelectOptions
                        value={typ.key}
                        label={typ.label}
                        key={i}
                      />
                    ))}
                  </SelectContainer>
                </div>
                <div className="col-span-3 sm:col-span-4">
                  <TextInput
                    label="Designation"
                    value={state.designation}
                    onChange={(e) =>
                      setState({ ...state, designation: e.target.value })
                    }
                    placeholder="Enter Designation"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <SelectContainer
                    label="Role"
                    value={state.role_id}
                    onChange={(e) =>
                      setState({ ...state, role_id: Number(e.target.value) })
                    }
                  >
                    <SelectOptions
                      value={0}
                      label="Select Staff Role"
                      disabled
                    />

                    {dependencies?.roles?.length > 0 &&
                      dependencies?.roles?.map((role) => (
                        <SelectOptions
                          value={role.id}
                          label={role.name}
                          key={role.id}
                        />
                      ))}
                  </SelectContainer>
                </div>
              </div>
              <button
                type="submit"
                className="w-full uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{ backgroundColor: currentColor }}
              >
                {data !== undefined ? "Update" : "Create"} Staff
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployee;
