import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { moaGameSearch } from "../../api/Moazone";

const MoaGameSearchBox = (props) => {
  const inputRef = useRef();
  // 버튼 누르면 게임id 검색 API 호출
  const handleSubmit = (e) => {
    e.preventDefault();
    const gameName = inputRef.current.value;

    moaGameSearch(gameName).then((res) => {
      props.onSearch(res.data[0].gameId);
    });
  };

  return (
    <div id="search-bar" className="col-span-3 flex felx-row bg-searchbar-gray rounded-lg mb-3">
      <div className="flex w-per5 inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <FontAwesomeIcon className="text-detailContent-light" icon={faSearch} />
      </div>
      {/* 검색창에 글자 하나씩 입력할 때마다 API 호출 & 무한 스크롤 */}
      <input
        ref={inputRef}
        type="text"
        className="w-per80 mx-2 text-sm text-gray-900 bg-transparent border-none focus:outline-hidden focus:border-none "
        placeholder="게임을 검색하세요"
        id="gameName"
      />
      <button
        onClick={handleSubmit}
        className="w-per15 px-1 py-1 my-1 mr-1 block text-sm text-white bg-mainBtn-blue hover:bg-mainBtn-blue-hover rounded-lg ">
        검색
      </button>
    </div>
  );
};

export default MoaGameSearchBox;
