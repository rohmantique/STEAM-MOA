import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PaginationItem from "../PaginationItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamePage, gameMaxPage } from "../../recoil/Game";
import { useNavigate, useSearchParams } from "react-router-dom";

const GamePagination = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const PAGE_COUNT = 10;
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;
  const keyword = searchParams.get("word") ? searchParams.get("word") : "";
  const maxPage = useRecoilValue(gameMaxPage);

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
    navigate(`/gamemoa?page=${encodeURIComponent(newPage)}&word=${encodeURIComponent(keyword)}`);
  };
  const onClickNext = () => {
    let newPage = page + 1 <= maxPage ? page + 1 : maxPage;
    navigate(`/gamemoa?page=${encodeURIComponent(newPage)}&word=${encodeURIComponent(keyword)}`);
  };

  const handlePageMove = (value) => {
    navigate(`/gamemoa?page=${encodeURIComponent(value)}&word=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="flex text-white">
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={onClickPrev}
        className="w-7 h-7 rounded-full hover:bg-main-100 hover:text-main-500"
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
        className="w-7 h-7 rounded-full hover:bg-main-100 hover:text-main-500"
      />
    </div>
  );
};

export default GamePagination;
