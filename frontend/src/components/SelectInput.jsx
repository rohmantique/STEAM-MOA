import React from "react";

const SelectInput = (props) => {
  const { options, handleSelectChange } = props;

  const onSelect = (e) => {
    handleSelectChange(e.target.value);
  }

  return (
    <select
      id="small"
      defaultValue={"1"}
      className="col-span-2 text-[0.85em] text-gray-900 bg-searchbar-gray rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={onSelect}
    >
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectInput;
