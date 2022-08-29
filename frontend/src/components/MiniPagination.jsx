import React from "react";
import { range } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const MiniPagination = (props) => {
  const { viewablePages, setViewablePages, setPage, page, totPage, color } = props;
  let selectedColor = 'bg-moa-purple-light'
  let hoverColor = 'bg-moa-purple-dark'

  const onClickItem = (e) => {
    const val = e.target.value;
    const view = (Math.ceil(val / 5) - 1) * 5;
    setPage(val);
    setViewablePages(range(view + 1, Math.min(view + 6, totPage + 1)));
  };

  const onClickPrev = () => {
    let newPage = page - 1 > 1 ? page - 1 : 1;
    const view = (Math.ceil(newPage / 5) - 1) * 5;
    setPage(newPage);
    setViewablePages(range(view + 1, Math.min(view + 6, totPage + 1)));
  };
  const onClickNext = () => {
    let newPage = page + 1 <= totPage ? page + 1 : totPage;
    const view = (Math.ceil(newPage / 5) - 1) * 5;
    setPage(newPage);
    setViewablePages(range(view + 1, Math.min(view + 6, totPage + 1)));
  };

  return (
    <div id="pagination" className="w-per35 flex justify-between items-center">
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={onClickPrev}
        className={`w-4 h-4 rounded-full hover:${hoverColor} hover:text-white`}
      />
      {viewablePages.map((item, index) => {
        return (
          <li
            value={item}
            key={index}
            onClick={onClickItem}
            className={`${
              page === item ? selectedColor+" text-white" : ""
            } w-6 h-6 text-center list-none inline-block rounded-full hover:${hoverColor} hover:text-gray-100 hover:cursor-pointer`}
          >
            {item}
          </li>
        );
      })}
      <FontAwesomeIcon
        icon={faAngleRight}
        onClick={onClickNext}
        className={`w-4 h-4 rounded-full hover:${hoverColor} hover:text-white`}
      />
    </div>
  );
};

export default MiniPagination;
