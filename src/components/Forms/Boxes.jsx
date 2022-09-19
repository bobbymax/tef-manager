/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
import React from "react";

const Boxes = ({
  id = "",
  label = "",
  type = "checkbox",
  value = "",
  onChange = undefined,
  name = "",
  ...otherProps
}) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 ${
            type === "checkbox" && "rounded"
          }`}
          {...otherProps}
        />
      </div>

      <div className="ml-3 text-sm">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Boxes;
