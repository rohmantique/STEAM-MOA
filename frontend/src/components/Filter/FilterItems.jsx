import React from "react";

const FilterItems = (props) => {
  const { checkedItemHandler, item, check } = props;

  const checkHandler = (e) => {
    checkedItemHandler(item, e.target.checked);
  };

  return (
    <div>
      <input
        id="filter-checkbox"
        type="checkbox"
        onChange={checkHandler}
        checked={check}
        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
      />
      <span className="ml-2 text-[0.95em] font-medium text-main-100 dark:text-gray-300">
        {item.name}
      </span>
    </div>
  );
};

export default FilterItems;
