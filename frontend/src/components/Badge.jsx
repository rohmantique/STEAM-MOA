import React from "react";

const Badge = (props) => {
  const name = props.name;
  return (
    <div className=" text-center h-5 whitespace-nowrap bg-detailContent-light text-gray-800 text-xs font-sans mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
      {name}
    </div>
  );
};

export default Badge;
