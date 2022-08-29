import React from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../Badge";

const GameCard = (props) => {
  const { gameId, gameName, gameImgpath, gameTags, gameReviewScore } = props.game;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/gamemoa/detail/${gameId}`);
  };

  const renderStar = () => {
    let list = [];
    for (let i = 0; i < gameReviewScore; i++) {
      list.push(
        <img key={i} className="w-4 h-4" src="../ImgAssets/star.png" alt="게임 리뷰 별"></img>
      );
    }
    return list;
  };

  return (
    <div className="flex flex-col bg-card-lightgray" onClick={handleClick}>
      <img src={gameImgpath} alt="" />
      <div className="contentsContainer m-2">
        {/* 게임이름 */}
        <div className="font-blackSans text-base whitespace-nowrap text-ellipsis overflow-hidden">
          {gameName}
        </div>
        {/* 게임배지 */}
        <div className="flex flex-row mb-1">{renderStar()}</div>
        {/* 게임태그 */}
        <div className="flex overflow-hidden">
          {/* key값 설정 */}
          {gameTags.length > 2
            ? gameTags.slice(0, 2).map((tag, index) => <Badge key={index} name={tag} />)
            : gameTags.map((tag, index) => <Badge key={index} name={tag} />)}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
