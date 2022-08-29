import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState } from "recoil";
import { gameSearchFilter } from "../../recoil/Game";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = (props) => {
  const navigate = useNavigate();
  const { setFilter } = props;
  const setSearchFilter = useSetRecoilState(gameSearchFilter);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("word") ? decodeURIComponent(searchParams.get("word")) : "";
  const [word, setWord] = useState(keyword);

  const onChange = (e) => {
    e.preventDefault();
    setWord(e.target.value);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      setFilter([]);
      setSearchFilter([]);
      navigate(`/gamemoa?page=1${word ? "&word=" + encodeURIComponent(word) : ""}`);
    }
  };

  return (
    <div
      id="search-bar"
      className="laptop:col-span-3 tablet:col-span-5 mobile:col-span-5 flex felx-row bg-searchbar-gray rounded-lg">
      <div className="flex w-per5 inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <FontAwesomeIcon className="text-detailContent-light" icon={faSearch} />
      </div>
      <input
        type="text"
        id="search"
        className="w-per95 mx-2 text-[0.85em] text-gray-900 bg-transparent border-none focus:outline-hidden focus:border-none tablet:py-2 py-1"
        placeholder="게임 이름으로 검색하세요"
        value={word}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

export default SearchBar;
