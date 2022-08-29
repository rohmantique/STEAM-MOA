import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import GameSearchPagination from "./GameSearchPagination";
import GameSearchList from "./GameSearchList";
import { moaGameSearch } from "../../api/Moazone";
import Swal from "sweetalert2";

const GameSearchModal = ({ hidden, setHidden, setGame }) => {
  const [selectedGame, setSelectedGame] = useState({});
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");

  const FailureToast = Swal.mixin({
    buttonsStyling: false,
    toast: true,
    position: "center",
    showConfirmButton: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const getGames = async (_page) => {
    try {
      setLoading(true);
      await moaGameSearch(_page, searchWord).then(({ data }) => {
        setGameList([...data.data]);
        setMaxPage(parseInt(data.maxPage));
        setLoading(false);
      });
    } catch (e) {}
    setLoading(false);
  };

  const onChangeSearchWord = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const handleSearchButton = (e) => {
    if (searchWord.trim().length < 2) {
      FailureToast.fire({
        customClass: {
          confirmButton:
            "mx-2 rounded py-1 px-5 bg-moa-pink hover:bg-moa-pink-dark text-white w-full",
        },
        icon: "error",
        title: `2글자 이상 입력해주세요. &#128521`,
      });
      return;
    }
    getGames(1);
  };

  useEffect(() => {
    if (!searchWord.trim()) return;
    getGames(page);
  }, [page]);

  const handleSelectGame = () => {
    if (selectedGame) {
      setGame({ ...selectedGame });
      setHidden();
    } else {
      FailureToast.fire({
        customClass: {
          confirmButton:
            "mx-2 rounded py-1 px-5 bg-moa-pink hover:bg-moa-pink-dark text-white w-full",
        },
        icon: "error",
        title: `게임을 선택해주세요. &#128521`,
      });
    }
  };

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      className={`${
        hidden ? "hidden" : ""
      } fixed z-50 md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 h-full w-per50`}>
      <div className="relative p-4 max-w-5xl min-w-5xl md:h-auto text-white">
        <div className="relative bg-main-300 rounded-lg shadow">
          {/* Header */}
          <div className="flex justify-between items-start p-3 rounded-t border-b border-white">
            <h3 className="font-semibold">게임 선택</h3>
            <FontAwesomeIcon onClick={setHidden} icon={faClose} />
          </div>
          {/* Body */}
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-10 gap-2">
              <input
                onChange={onChangeSearchWord}
                className="col-span-8 p-2 text-gray-900 bg-slate-100 rounded-sm text-sm border-none border-transparent focus:border-transparent focus:ring-0"
              />
              <button
                className="bg-mainBtn-blue hover:bg-mainBtn-blue-dark rounded col-span-2"
                onClick={handleSearchButton}>
                검색
              </button>
            </div>
            <div className="w-full h-96">
              <GameSearchList
                gameList={gameList}
                isLoading={loading}
                selectedGame={selectedGame}
                setSelectedGame={setSelectedGame}
              />
              <div className="flex justify-center mt-1">
                <GameSearchPagination page={page} setPage={setPage} maxPage={maxPage} />
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-end p-3 space-x-2 rounded-b border-t border-white">
            <button
              type="button"
              onClick={handleSelectGame}
              className="text-white bg-mainBtn-blue hover:bg-mainBtn-blue-dark font-medium rounded-lg text-xs px-3 py-2 text-center">
              선택 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSearchModal;
