import React from "react";
import SquareGameComponent from "./SquareGameComponent";
import "../../assets/neon.css";

const MainGameSpread = (props) => {
  const { frees, hots, picks, isLoading } = props;

  const parts = [
    {
      theme: "HOT 모아",
      subText: "요즘 핫한 모아 게임은?!",
      textStyle: "gameSpread-neonTextPink",
      list: hots.slice(0, 10),
      bg: "bg-rose-400",
    },
    {
      theme: "모아러 PICK!",
      subText: "모아러가 픽!한 게임",
      textStyle: "gameSpread-neonTextBlue",
      list: picks.slice(0, 10),
      bg: "bg-moa-blue",
    },
    {
      theme: "가성비 MOA",
      subText: "3000원 이하! $가성비$ 모아",
      textStyle: "gameSpread-neonTextGreen",
      list: frees.slice(0, 10),
      bg: "bg-moa-green",
    },
  ];

  return (
    <div className="mt-9 tablet:mt-10 laptop:mt-14">
      {parts.map((part, index) => {
        return (
          <div
            className="my-5 tablet:my-8 laptop:my-9 flex flex-col justify-center items-center"
            key={index}>
            <span
              className={`font-blackSans text-white ${part.textStyle} text-lg tablet:text-xl laptop:text-2xl my-0.5 `}>
              {part.theme}
            </span>
            <div
              className={`text-center ${part.textStyle} mb-1.5 laptop:text-base tablet:text-sm text-xs`}>
              [{part.subText}]
            </div>
            <div
              className={`grid grid-cols-2 w-full p-3 tablet:p-5 drop-shadow-md shadow-inner laptop:p-6 ${part.bg} bg-opacity-[15%] tablet:grid-cols-5 gap-x-2.5 gap-y-4 tablet:gap-y-5 rounded mt-0.5`}>
              {
              (isLoading ? 
                [...Array(15)].map((_,idx) => {
                  return (
                    <div className="w-full hover:cursor-pointer drop-shadow-md bg-main-500 p-1 rounded opacity-80">
                      <div className="overflow-hidden w-full relative pt-[100%] rounded bg-main-400 animate-pulse"></div>
                      <div className="h-[16px]"></div>
                    </div>
                  )
                })
                :
                part.list.map((game, index) => {
                  return <SquareGameComponent game={game} key={index} />;
                })
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainGameSpread;
