import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import GameSearchModalItem from "./GameSearchModalItem";

const GameSearchList = ({ gameList, isLoading, selectedGame, setSelectedGame }) => {
  return (
    <div className="w-per100 h-per95 m-auto overflow-auto">
      {selectedGame.gameId ? (
        <div className="sticky z-50 top-0 w-full max-h-16  bg-moa-green-light rounded flex p-2 mb-2">
          <FontAwesomeIcon icon={faCircleCheck} className="text-white text-2xl text-center my-auto ml-3 mr-5"/>
          <img src={selectedGame.gameImgPath} alt="" className="w-per20 rounded" />
          <span className="w-per80 p-1.5 text-black">{selectedGame.gameName}</span>
        </div>
      ) : (
        ""
      )}
      {isLoading ? (
        <div className="min-w-full grid grid-cols-1 gap-2 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="min-w-[100%] min-h-[4rem] rounded flex">
              <div className="w-full h-full bg-gray-200 rounded mr-2"></div>
            </div>
          ))}
        </div>
      ) : gameList.length ? (
        <div className="grid grid-cols-1 gap-2 ">
          {gameList.map((game) => (
            <GameSearchModalItem key={game.gameId} game={game} setSelectedGame={setSelectedGame} />
          ))}
        </div>
      ) : (
        <div className="text-center my-auto">검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default GameSearchList;
