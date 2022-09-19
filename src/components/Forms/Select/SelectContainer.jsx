/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React from "react";

const SelectContainer = ({
  label = "",
  value = "",
  onChange = undefined,
  children,
  error = false,
  errorMessage = null,
  additionalClasses = "",
  name = "",
  fullWidth = false,
  ...otherProps
}) => {
  return (
    <div className="mb-3">
      {label !== "" && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        name={name}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...otherProps}
      >
        {children}
      </select>
    </div>
  );
};

export default SelectContainer;
