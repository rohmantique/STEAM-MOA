import React from "react";
import MainGameComponent from "./MainGameComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MiniGameMoa = (props) => {
  const navigate = useNavigate();
  const { bests, frees, today, hots, isLoading } = props;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640 ? true : false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [isMobile]);

  const onClickToday = () => {
    navigate(`/gamemoa/detail/${today[4].gameId}`);
  };

  const onClickMore = () => {
    navigate(`/gamemoa`);
  };

  if (!isMobile) {
    return (
      <>
        <div className="w-full text-center font-Sans font-semibold text-lg tablet:text-xl laptop:text-2xl my-4 tablet:mt-6 miniGameMoa-neonText text-white">
          GAME+
        </div>
        <hr className="bg-createInput-gray mb-3" />
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 py-2 px-3">
            <div className={`w-full h-full flex flex-col justify-between items-center ${(isLoading ? "h-max-[300px] h-[18vw]":"")}`}>
              {today.length ? (
                <MainGameComponent game={today[Math.floor(Math.random() * 4)]} type="today" isLoading={isLoading}/>
              ) : (
                <div
                className="w-full flex h-[5vw] h-max-[90px] bg-main-400 rounded opacity-90 hover:opacity-100 drop-shadow-md animate-pulse">
                </div>
              )}
              {hots.length ? (
                <MainGameComponent game={frees[Math.floor(Math.random() * 10)]} type="hot" isLoading={isLoading}/>
              ) : (
                <div
                className="w-full flex h-[5vw] h-max-[90px] bg-main-400 rounded opacity-90 hover:opacity-100 drop-shadow-md animate-pulse">
                </div>
              )}
              {bests.length ? (
                <MainGameComponent game={bests[Math.floor(Math.random() * 5)]} type="best" isLoading={isLoading}/>
              ) : (
                <div
                className="w-full flex h-[5vw] h-max-[90px] bg-main-400 rounded opacity-90 hover:opacity-100 drop-shadow-md animate-pulse">
                </div>
              )}
            </div>
          </div>
          <div className="col-span-3">
            {today.length ? (
              <img
                src={today[4].gameImgpath}
                alt=""
                className="rounded w-full drop-shadow-md hover:cursor-pointer"
                onClick={onClickToday}
              />
            ) : (
              <div className="w-full h-full bg-main-400 animate-pulse"></div>
            )}
          </div>
        </div>
        <div
          className="flex justify-end text-white text-[10px] tablet:text-xs font-semibold hover:cursor-pointer hover:font-bold mt-1"
          onClick={onClickMore}>
          for MORE +
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full text-center font-Sans font-semibold text-lg tablet:text-xl laptop:text-2xl my-4 tablet:mt-6 miniGameMoa-neonText text-white">
          GAME+
        </div>
        <hr className="bg-createInput-gray mb-3" />
        <div className="w-full">
          {today.length ? (

            <img
              src={today[4].gameImgpath}
              alt=""
              className="rounded w-full drop-shadow-md hover:cursor-pointer"
              onClick={onClickToday}
            />
          ) : (
            ""
          )}
        </div>
        <div
          className="flex justify-end text-white text-xs tablet:text-sm font-semibold hover:cursor-pointer hover:font-bold mt-1"
          onClick={onClickMore}>
          for MORE +
        </div>
      </>
    );
  }
};

export default MiniGameMoa;
