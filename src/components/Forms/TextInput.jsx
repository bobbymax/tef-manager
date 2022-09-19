/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/self-closing-comp */
import React from "react";

const TextInput = ({
  label = "",
  type = "text",
  value = "",
  onChange = undefined,
  placeholder = "",
  required = false,
  multiline = 0,
  disabled = false,
  name = "",
  ...otherProps
}) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {multiline < 1 ? (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          name={name}
          className="mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md"
        />
      ) : (
        <textarea
          rows={multiline}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          name={name}
          className="shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
        />
      )}
    </div>
  );
};

export default TextInput;
