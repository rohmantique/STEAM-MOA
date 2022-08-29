import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PaginationItem from "../PaginationItem";
import { useRecoilValue } from "recoil";
import { moaMaxPage } from "../../recoil/Moazone";
import { useNavigate, useSearchParams } from "react-router-dom";

const Pagination = () => {
  const PAGE_COUNT = 10;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(decodeURIComponent(searchParams.get("page")))
    : 1;
  const keyword = searchParams.get("word") ? decodeURIComponent(searchParams.get("word")) : "";
  const sort = searchParams.get("sort") ? decodeURIComponent(searchParams.get("sort")) : "";
  const maxPage = useRecoilValue(moaMaxPage);

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
    navigate(
      `/moazone?page=${newPage}${keyword ? "&word=" + encodeURIComponent(keyword) : ""}${
        sort ? "&sort=" + encodeURIComponent(sort) : ""
      }`
    );
  };
  const onClickNext = () => {
    let newPage = page + 1 <= maxPage ? page + 1 : maxPage;
    //setPage(newPage);
    navigate(
      `/moazone?page=${newPage}${keyword ? "&word=" + encodeURIComponent(keyword) : ""}${
        sort ? "&sort=" + encodeURIComponent(sort) : ""
      }`
    );
  };

  const handlePageMove = (value) => {
    //setPage(value);
    navigate(
      `/moazone?page=${value}${keyword ? "&word=" + encodeURIComponent(keyword) : ""}${
        sort ? "&sort=" + encodeURIComponent(sort) : ""
      }`
    );
  };

  return (
    <div className="flex text-white items-center">
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={onClickPrev}
        className="text-[1.2em] rounded-full hover:bg-main-100 hover:text-main-500"
      />
      <ul className="p-0 mx-2">
        {getPaginationList(page, PAGE_COUNT).map((item) => (
          <PaginationItem
            key={item}
            value={item}
            handlePageMove={handlePageMove}
            active={page === item}
          />
        ))}
      </ul>
      <FontAwesomeIcon
        icon={faAngleRight}
        onClick={onClickNext}
        className="text-[1.2em] rounded-full hover:bg-main-100 hover:text-main-500"
      />
    </div>
  );
};

export default Pagination;
