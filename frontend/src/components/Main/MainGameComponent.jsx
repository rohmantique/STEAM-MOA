import React from "react";
import { useNavigate } from "react-router-dom";

const MainGameComponent = (props) => {
  const navigate = useNavigate();
  const { type, game, isLoading } = props;
  let bg = "bg-moa-green-dark";
  let text = "TODAY";
  let subText = "추천!";
  if (type === "best") {
    bg = "bg-moa-purple-dark";
    text = "BEST";
    subText = "고퀄";
  } else if (type === "hot") {
    bg = "bg-moa-pink";
    text = "HOT";
    subText = "트렌드";
  }

  const onClickRecommend = () => {
    navigate(`/gamemoa/detail/${game.gameId}`);
  };

  return (
      <div
      className="w-full flex h-[30%] justify-between bg-main-400 rounded opacity-90 hover:opacity-100 hover:scale-[102%] drop-shadow-md hover:cursor-pointer ease-in duration-200"
      onClick={onClickRecommend}>
      <div className="overflow-hidden w-per20 relative pt-[20%] rounded">
        <img
          src={game.gameImgpath}
          alt=""
          className="drop-shadow-md object-cover h-full absolute top-0 left-0"
        />
      </div>
      <div className="flex flex-col justify-center w-per70 mr-3">
        <div className="tags flex">
          <span className={`${bg} text-white text-[0.9vw] font-semibold mr-2 px-2 py-0.5 rounded`}>
            {text}
          </span>
          <span className="bg-moa-yellow-dark text-main-500 text-[0.9vw] font-semibold mr-2 px-2 py-0.5 rounded">
            {subText}
          </span>
        </div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden text-white text-[1.2vw] mt-[3%]">
          {game.gameName}
        </div>
      </div>
    </div>
  
  );
};

export default MainGameComponent;
