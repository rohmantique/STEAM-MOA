import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import SearchUser from "../components/Search/SearchUser";
import SearchGame from "../components/Search/SearchGame";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Search = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("word");
  const [searchWord, setSearchWord] = useState(keyword);

  useEffect(() => {
    setSearchWord(keyword);
  }, [keyword]);

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      onSearch();
    }
  };

  const onSearch = () => {
    if (searchWord.startsWith("@")) {
      if (searchWord.length - 1 < 3) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "아이디를 3글자 이상 입력해주세요. &#128521",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        navigate(`/search/user?word=${encodeURIComponent(searchWord.slice(1, searchWord.length))}`);
      }
    } else {
      if (searchWord.length < 2) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "게임명을 2글자 이상 입력해주세요. &#128521",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        navigate(`/search/game?word=${encodeURIComponent(searchWord)}`);
      }
    }
  };

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full h-full">
      <Navbar />
      {/* 검색 입력 부분 */}
      <div className="w-full h-per20 tablet:pt-14 tablet:pb-20 pt-10 pb-14 nav-grad flex flex-col justify-center items-center text-white">
        {/* 안내문구 */}
        <span className="font-blackSans text-3xl">
          <span className="text-moa-yellow">파티</span>
          {", "}
          <span className="text-moa-pink">게임</span>
          {", "}
          <span className="text-moa-green">공략글</span>
          {"과"}
        </span>
        <span className="font-blackSans text-3xl mb-5">
          <span className="text-moa-purple">@사용자</span>를 검색해보세요
        </span>
        {/* 검색어 입력 */}
        <div id="search-bar" className="laptop:w-per50 tablet:w-per75 mobile:w-per90 h-14 flex felx-row bg-searchbar-gray rounded-lg">
          <div className="flex w-per5 items-center ml-5 pointer-events-none">
            <FontAwesomeIcon className="text-detailContent-light text-2xl" icon={faSearch} />
          </div>
          <input
            type="text"
            id="search"
            value={searchWord}
            onChange={onChangeSearch}
            onKeyUp={onKeyPress}
            className="w-per95 text-lg text-gray-800 bg-transparent border-0 focus:border-none focus:border-slate-500border-transparent focus:border-transparent focus:ring-0"
          />
        </div>
      </div>
      {/* 검색 결과 화면 */}
      <Routes>
        <Route path="user" element={<SearchUser />}></Route>
        <Route path="game" element={<SearchGame />}></Route>
      </Routes>
      <button
        className="fixed bottom-2 right-2 w-10 h-10 bg-moa-pink hover:bg-moa-pink-dark text-white rounded-full"
        onClick={handleScrollUp}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default Search;
