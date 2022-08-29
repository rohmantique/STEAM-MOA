import React from "react";
import { useNavigate } from "react-router-dom";

const SquareGameComponent = (props) => {
  const navigate = useNavigate();
  const { game } = props;
  const onClickRecommend = () => {
    navigate(`/gamemoa/detail/${game.gameId}`);
  };

  return (
    <div
      className="w-full hover:cursor-pointer drop-shadow-md bg-main-500 p-1 rounded hover:scale-[102%] ease-out duration-300"
      onClick={onClickRecommend}>
      <div className="overflow-hidden w-full relative pt-[100%] rounded">
        <img
          src={game.gameImgpath}
          alt=""
          className="drop-shadow-md object-cover h-full absolute top-0 left-0"
        />
      </div>
      <div className="w-full whitespace-nowrap text-ellipsis overflow-hidden text-white text-[1em] mt-[4%]">
        {game.gameName}
      </div>
    </div>
  );
};

export default SquareGameComponent;
