import React, { useState } from "react";
import GameSearchBar from "./GameSearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import FilterCaterories from "../Filter/FilterCaterories";
import FilterBadge from "../Filter/FilterBadge";
import { useRecoilState } from "recoil";
import { gameSearchFilter } from "../../recoil/Game";
import { useNavigate, useSearchParams } from "react-router-dom";

const GameSearchContainer = () => {
  const categories = {
    filters: [
      {
        id: 1,
        name: "장르",
        items: [
          {
            id: 23,
            name: "Indie",
          },
          {
            id: 1,
            name: "Action",
          },
          {
            id: 25,
            name: "Adventure",
          },
          {
            id: 4,
            name: "Casual",
          },
          {
            id: 28,
            name: "Simulation",
          },
          {
            id: 2,
            name: "Strategy",
          },
          {
            id: 3,
            name: "RPG",
          },
          {
            id: 18,
            name: "Sports",
          },
          {
            id: 9,
            name: "Racing",
          },
        ],
      },
    ],
  };
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("word") ? decodeURIComponent(searchParams.get("word")) : "";
  const [searchFilter, setSearchFilter] = useRecoilState(gameSearchFilter);
  const [filter, setFilter] = useState([...searchFilter]);

  const handleResetFilter = () => {
    setFilter([]);
    setSearchFilter([]);
    navigate(`/gamemoa?page=1${keyword? "&word="+encodeURIComponent(keyword):""}`);
  };

  const handleSearchFilter = () => {
    setSearchFilter([...filter]);
    navigate(`/gamemoa?page=1${keyword? "&word="+encodeURIComponent(keyword):""}`);
  };

  const deleteHandler = (category_id, filterItem_id) => {
    setFilter(
      filter.filter((filterItem) => {
        return filterItem.category !== category_id || filterItem.item !== filterItem_id
          ? true
          : false;
      })
    );
  };

  const [ishidden, setIsHidden] = useState(true);
  const handleArcodion = () => {
    setIsHidden(!ishidden);
  };

  const bgColor = ["", "bg-moa-pink", "bg-moa-yellow", "bg-moa-green", "bg-moa-purple"];
  const setBgColor = (id) => bgColor[id];

  return (
    <div className="w-full tablet:w-per75 m-auto mb-5 bg-gradient-to-b from-bg-search-gradient-from via-bg-search-gradient-via to-bg-search-gradient-to">
      {/* header : 검색바, 정렬 Select, 펼침버튼 */}
      <div className="w-full grid grid-cols-2 tablet:px-5 tablet:py-3 px-2.5 py-2.5">
        {/* 검색바, 정렬 */}
        <div className="grid grid-cols-5 gap-2">
          {/* 검색바 */}
          <GameSearchBar setFilter={setFilter} />
        </div>
        {/* 아코디언 버튼 */}
        <div className="flex flex-row-reverse items-center" onClick={handleArcodion}>
          <span className="text-main-100 text-[0.8em] font-bold">상세조건</span>
          {ishidden ? (
            <FontAwesomeIcon className="text-main-100 mr-2" icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon className="text-main-100 mr-2" icon={faAngleUp} />
          )}
        </div>
      </div>

      <div className={`${ishidden ? "hidden" : ""}`}>
        <hr className="m-auto w-per95 h-px bg-main-100" />
        {/* body : 필터링 항목 */}
        <div className="w-full pt-5 pb-3">
          {categories.filters.map((category) => (
            <FilterCaterories
              key={category.id}
              category={category}
              filter={filter}
              setFilter={setFilter}
            />
          ))}
        </div>
        <hr className="m-auto w-per95 h-px bg-main-200" />
        {/* footer : 태그, 필터링 초기화 */}
        <div className="w-full grid laptop:grid-cols-12 py-2 px-5 mobile:grid-cols-2">
          <div className="items-center grid gap-1 laptop:grid-cols-7 laptop:col-span-9 tablet:grid-cols-3 tablet:col-span-9 mobile:grid-cols-2 mobile:col-span-7">
            {filter.map((filterItem, index) => (
              <FilterBadge
                key={index}
                category_id={filterItem.category}
                filterItem_id={filterItem.item}
                name={filterItem.name}
                color={setBgColor(filterItem.category)}
                deleteHandler={deleteHandler}
              />
            ))}
          </div>
          <div className="laptop:col-span-3 tablet:col-span-3 mobile:col-span-5 flex flex-row justify-end items-center ">
            <button
              onClick={handleSearchFilter}
              className="text-white text-[0.7em] bg-mainBtn-blue hover:bg-mainBtn-blue-hover m-1 p-2 px-6 rounded-lg">
              적용
            </button>
            <button
              onClick={handleResetFilter}
              className="text-white text-[0.7em] bg-mainBtn-blue hover:bg-mainBtn-blue-hover m-1 p-2 rounded-lg whitespace-nowrap">
              <FontAwesomeIcon className="mr-2" icon={faRotateRight} />
              필터 초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSearchContainer;
