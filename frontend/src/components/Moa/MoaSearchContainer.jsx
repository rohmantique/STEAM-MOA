import React, { useState } from "react";
import MoaSearchBar from "./MoaSearchBar";
import SelectInput from "../../components/SelectInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import FilterCaterories from "../Filter/FilterCaterories";
import FilterBadge from "../Filter/FilterBadge";
import { useRecoilState } from "recoil";
import { moaSearchFilter } from "../../recoil/Moazone";
import { useNavigate, useSearchParams } from "react-router-dom";

const MoazoneSearchContainer = (props) => {
  const categories = {
    filters: [
      {
        id: 1,
        name: "모집상태",
        items: [
          {
            id: "1",
            name: "모집중",
          },
          {
            id: "2",
            name: "모집완료",
          },
          {
            id: "3",
            name: "게임중",
          },
          {
            id: "4",
            name: "게임완료",
          },
        ],
      },
      {
        id: 2,
        name: "파티태그",
        items: [
          {
            id: "1",
            name: "즐겜",
          },
          {
            id: "2",
            name: "빡겜",
          },
          {
            id: "3",
            name: "공략겜",
          },
          {
            id: "4",
            name: "무지성겜",
          },
          {
            id: 5,
            name: "친목겜",
          },
        ],
      },
    ],
    sort: [
      {
        id: 1,
        name: "최근 생성 순",
      },
      {
        id: 2,
        name: "마감 나중 순",
      },
      {
        id: 3,
        name: "많이 모인 순",
      },
    ],
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(decodeURIComponent(searchParams.get("page")))
    : 1;
  const keyword = searchParams.get("word") ? decodeURIComponent(searchParams.get("word")) : "";
  const sort = searchParams.get("sort") ? decodeURIComponent(searchParams.get("sort")) : "";
  const [searchFilter, setSearchFilter] = useRecoilState(moaSearchFilter);
  const [filter, setFilter] = useState([...searchFilter]);

  const handleResetFilter = () => {
    setFilter([]);
    setSearchFilter([]);
    navigate(
      `/moazone?page=1${keyword ? "&word=" + encodeURIComponent(keyword) : ""}${
        sort ? "&sort=" + encodeURIComponent(sort) : ""
      }`
    );
  };

  const handleDeleteTag = (category_id, filterItem_id) => {
    setFilter(
      filter.filter((filterItem) => {
        return filterItem.category !== category_id || filterItem.item !== filterItem_id
          ? true
          : false;
      })
    );
  };

  const handleSearch = () => {
    //필터검색 -> 검색어, 정렬, 필터
    setSearchFilter([...filter]);
    navigate(
      `/moazone?page=1${keyword ? "&word=" + encodeURIComponent(keyword) : ""}${
        sort ? "&sort=" + encodeURIComponent(sort) : ""
      }`
    );
  };

  const handleSelectChange = (sort) => {
    navigate(
      `/moazone?page=${page}${keyword ? "&word=" + encodeURIComponent(keyword) : ""}${
        sort ? "&sort=" + encodeURIComponent(sort) : ""
      }`
    );
  };

  const [ishidden, setIsHidden] = useState(true);
  const handleArcodion = () => {
    setIsHidden(!ishidden);
  };

  const bgColor = [
    "",
    "bg-moa-yellow-dark",
    "bg-moa-pink-dark",
    "bg-moa-green-dark",
    "bg-moa-purple-dark",
  ];
  const setBgColor = (id) => bgColor[id];

  return (
    <div className="w-full tablet:w-per75 m-auto bg-gradient-to-b from-bg-search-gradient-from via-bg-search-gradient-via to-bg-search-gradient-to">
      {/* header : 검색바, 정렬 Select, 펼침버튼 */}
      <div className="w-full grid grid-cols-2 tablet:px-5 tablet:py-3 px-2.5 py-2">
        {/* 검색바, 정렬 */}
        <div className="grid grid-cols-5 gap-2">
          {/* 검색바 */}
          <MoaSearchBar setFilter={setFilter} />
          <SelectInput options={categories.sort} handleSelectChange={handleSelectChange} />
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
        <div className="w-full grid laptop:grid-cols-12 py-2 tablet:px-5 px-3 grid-cols-2">
          <div className="items-center grid gap-1 laptop:grid-cols-7 laptop:col-span-9 tablet:grid-cols-3 tablet:col-span-9 mobile:grid-cols-2 mobile:col-span-7">
            {filter.map((filterItem, index) => (
              <FilterBadge
                key={index}
                category_id={filterItem.category}
                filterItem_id={filterItem.item}
                name={filterItem.name}
                color={setBgColor(filterItem.category)}
                deleteHandler={handleDeleteTag}
              />
            ))}
          </div>
          <div className="laptop:col-span-3 tablet:col-span-3 mobile:col-span-5 flex flex-row justify-end items-center ">
            <button
              onClick={handleSearch}
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

export default MoazoneSearchContainer;
