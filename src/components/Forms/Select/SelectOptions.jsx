/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

const SelectOptions = ({
  value = "",
  label,
  disabled = false,
  ...otherProps
}) => {
  return (
    <option value={value} disabled={disabled} {...otherProps}>
      {label}
    </option>
  );
};

export default SelectOptions;
