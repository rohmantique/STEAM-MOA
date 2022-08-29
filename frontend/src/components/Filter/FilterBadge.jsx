import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const FilterBadge = (props) => {
  const { category_id, filterItem_id, name, color, deleteHandler } = props;

  const onClickDelete = () => {
    deleteHandler(category_id, filterItem_id);
  };

  return (
    <div
      className={`${color} flex flex-row justify-between items-center h-8 text-white py-2 px-2 mx-1 text-sm font-medium rounded-2xl`}>
      <span
        id="badge-dismiss-default"
        className="inline-flex items-center p-0.5 whitespace-nowrap laptop:text-sm mobile:text-xs overflow-clip">
        {name}
      </span>
      <button
        type="button"
        onClick={onClickDelete}
        className="inline-flex items-center p-0.5 ml-1 text-sm bg-transparent rounded-2xl hover:bg-white hover:text-blue-900 dark:hover:bg-blue-300 dark:hover:text-blue-900"
        data-dismiss-target="#badge-dismiss-default"
        aria-label="Remove">
        <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
        <span className="sr-only">Remove badge</span>
      </button>
    </div>
  );
};

export default FilterBadge;
