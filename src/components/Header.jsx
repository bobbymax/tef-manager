/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React from "react";
import { FiPlus } from "react-icons/fi";
import { useStateContext } from "../contexts/ContextProvider";

const Header = ({
  category,
  title,
  toggleModal = "",
  canAdd = false,
  isAdding = false,
  handleClick = undefined,
}) => {
  const { currentColor } = useStateContext();

  return (
    <div className=" mb-10">
      <p className="text-lg text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
      {canAdd && (
        <button
          type="button"
          onClick={handleClick}
          disabled={isAdding}
          className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{ backgroundColor: currentColor }}
          data-modal-toggle={toggleModal}
        >
          <FiPlus style={{ marginRight: 3, marginTop: 3 }} />
          Add {title}
        </button>
      )}
    </div>
  );
};

export default Header;
