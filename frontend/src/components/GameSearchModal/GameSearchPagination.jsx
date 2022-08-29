import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import PaginationItem from "../PaginationItem";

const GameSearchPagination = ({ page, setPage, maxPage }) => {
  const PAGE_COUNT = 10;

  const getPaginationList = (currPage, perCount) => {
    let pageList = [];

    const tmp = Math.floor((currPage - 1) / perCount);
    const start = 1 + tmp * perCount;
    let end = start + perCount;

    end = end > maxPage ? maxPage + 1 : end;

    let index = 0;
    for (let i = start; i < end; i++) {
      pageList[index++] = i;
    }

    return pageList;
  };

  const onClickPrev = () => {
    let newPage = page - 1 > 1 ? page - 1 : 1;
    setPage(newPage);
  };
  const onClickNext = () => {
    let newPage = page + 1 <= maxPage ? page + 1 : maxPage;
    setPage(newPage);
  };

  const handlePageMove = (value) => {
    setPage(value);
  };

  return (
    <div className="flex text-white">
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={onClickPrev}
        className="w-7 h-7 rounded-full hover:bg-main-100 hover:text-main-500"
      />
      <ul className="p-0 mx-2">
        {getPaginationList(page, PAGE_COUNT).map((item) => {
          return (
            <PaginationItem
              key={item}
              value={item}
              handlePageMove={handlePageMove}
              active={page === item}
            />
          );
        })}
      </ul>
      <FontAwesomeIcon
        icon={faAngleRight}
        onClick={onClickNext}
        className="w-7 h-7 rounded-full hover:bg-main-100 hover:text-main-500"
      />
    </div>
  );
};

export default GameSearchPagination;
