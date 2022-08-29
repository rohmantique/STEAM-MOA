import React from "react";
import { useNavigate } from "react-router-dom";
import Badge from "./Badge";
import { formatTimeISO } from "../util/FormatTime"

function MoaCard(props) {
  const navigate = useNavigate();
  const {
    partyId,
    gameImgPath,
    gameName,
    partyTitle,
    maxPlayer,
    curPlayer,
    startTime,
    partyIsUrgent,
    partyStatus,
    partyTags,
  } = props.party;

  let bgColors = [
    "bg-red-400",
    "bg-moa-pink",
    "bg-moa-green",
    "bg-moa-yellow",
    "bg-moa-purple",
    "bg-mainBtn-disabled",
  ];
  let statusMsg = ["마감임박", "모집중", "모집완료", "게임중", "게임완료", "모집실패"];

  const onClickCard = (e) => {
    e.stopPropagation();
    navigate(`/moazone/detail/${partyId}`);
  };
  return (
    <div
      id={partyId}
      className="flex flex-col opacity-90 bg-card-lightgray hover:cursor-pointer hover:opacity-100"
      onClick={onClickCard}>
      <img src={gameImgPath} alt="게임이미지" />
      <div className="flex flex-col justify-between m-2">
        <div className="flex">
          <div
            className={`p-1 rounded flex justify-center items-center w-per25 text-xs font-blackSans text-white mr-2 ${
              partyIsUrgent ? bgColors[0] : bgColors[partyStatus]
            }`}>
            <span className="whitespace-nowrap">{partyIsUrgent ? statusMsg[0] : statusMsg[partyStatus]}</span>
          </div>

          <div className="font-blackSans text-base whitespace-nowrap overflow-hidden text-ellipsis">
            {partyTitle}
          </div>
        </div>
        <div className=" font-blackSans text-xs my-1 whitespace-nowrap overflow-hidden text-ellipsis">
          [{gameName}]
        </div>
        <div className=" flex justify-between">
          <span className="text-xs font-sans font-semibold">{formatTimeISO(startTime)}</span>
          <span className="text-xs font-sans  font-semibold">
            {curPlayer}/{maxPlayer}
          </span>
        </div>
        <div className="flex overflow-hidden mt-1">
          {/* key값 설정 */}
          {partyTags.length ? partyTags.map((tag, index) => <Badge key={index} name={tag} />) : ""}
        </div>
      </div>
    </div>
  );
}

export default MoaCard;
