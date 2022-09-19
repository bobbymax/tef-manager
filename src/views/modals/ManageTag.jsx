/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import TextInput from "../../components/Forms/TextInput";

const ManageTag = ({
  show = false,
  onHide,
  data = undefined,
  handleSubmit = undefined,
}) => {
  const initialState = {
    id: 0,
    name: "",
  };

  const [state, setState] = useState(initialState);
  const { currentColor } = useStateContext();

  const manageSubmit = (e) => {
    e.preventDefault();
    const body = {
      id: state.id,
      name: state.name,
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
              Add New Tag
            </h3>
            <form className="space-y-6" onSubmit={manageSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <TextInput
                    label="Name"
                    placeholder="Enter Module Name"
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{ backgroundColor: currentColor }}
              >
                Add Tag
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTag;
