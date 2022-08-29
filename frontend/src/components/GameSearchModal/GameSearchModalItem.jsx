import React from "react";

const GameSearchModalItem = (props) => {
  const { gameId, gameName, gameImgPath } = props.game;

  const onClick = () => {
    props.setSelectedGame({ gameId, gameName, gameImgPath });
  };
  return (
    <div
      className="w-full max-h-16 border-solid border-stone-700 bg-white rounded flex p-2 opacity-90 hover:opacity-100"
      onClick={onClick}>
      <img src={gameImgPath} alt="" className="w-per20 rounded" />
      <span className="w-per80 p-1.5 text-gray-900 text-sm pt-1 font-semibold" >{gameName}</span>
    </div>
  );
};

export default GameSearchModalItem;
