import React from "react";
import GameCard from "./GameCard";

const GameList = (props) => {
  const { gameList, isLoading } = props;
  return (
    <div className="grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 laptop:gap-4 tablet:gap-2 mobile:gap-2.5">
      {isLoading ? (
        [...Array(12)].map((v, index) => (
          <div
            key={index}
            className="laptop:h-[12vw] tablet:h-[16vw] h-[55vw] flex flex-col bg-card-lightgray">
            {/* 스켈레톤 */}
            <div className="h-per70 animate-pulse bg-mainBtn-disabled"></div>
            <div className="h-per30 p-2.5 flex flex-col justify-between">
              <div className="h-per40 w-per30 animate-pulse bg-mainBtn-disabled rounded"></div>
              <div className="h-per40 w-full animate-pulse bg-mainBtn-disabled rounded"></div>
            </div>
          </div>
        ))
      ) : gameList.length ? (
        gameList.map((game) => {
          return <GameCard key={game.gameId} game={game} />;
        })
      ) : (
        <div className="text-white text-2xl mx-auto my-16 laptop:col-span-5 tablet:col-span-3">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default GameList;
