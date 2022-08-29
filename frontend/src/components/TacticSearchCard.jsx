import React from "react";
import { useNavigate } from "react-router-dom";

const TacticSearchCard = (props) => {
  const navigate = useNavigate();
  const {
    tacticId,
    tacticTitle,
    tacticContent,
    userServiceId,
    gameImgPath,
    gameName,
  } = props.tactic;

  const onClick = (e) => {
    e.preventDefault();
    navigate(`/tactic/detail/${tacticId}`);
  };
  return (
    <div className="flex flex-col bg-card-lightgray" onClick={onClick}>
      <img src={gameImgPath} alt="게임 이미지" />
      {/* 공략정보 */}
      <div className="contentsContainer m-2">
        <div className="font-blackSans whitespace-nowrap text-ellipsis overflow-hidden">
          {tacticTitle}
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row w-per70 font-blackSans">
            <span>[</span>
            <div className="text-xs my-1 whitespace-nowrap overflow-hidden text-ellipsis">
              {gameName}
            </div>
            <span>]</span>
          </div>
          <div className="flex justify-end w-per30 text-sm whitespace-nowrap text-ellipsis overflow-hidden">
            @{userServiceId}
          </div>
        </div>

        <div className="text-sm whitespace-nowrap text-ellipsis overflow-hidden">
          {tacticContent}
        </div>
      </div>
    </div>
  );
};

export default TacticSearchCard;
