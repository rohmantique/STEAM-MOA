import React from "react";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../util/FormatTime";

function GameTacticListItem(props) {
  const { tacticId, tacticTitle, tacticContent, userServiceId, createTime } =
    props.tactic;

  const navigate = useNavigate();

  const onClickTactic = () => {
    navigate(`/tactic/detail/${tacticId}`);
  };

  const onClickUser = (e) => {
    e.stopPropagation(); 
    navigate(`/profile/${userServiceId}`);
  }

  return (
    <div
      onClick={onClickTactic}
      className="w-full h-32 border rounded drop-shadow-md my-1.5 bg-white p-3 flex flex-col justify-between">
      {/* 공략글 정보 */}
      <div className="hover:cursor-pointer">
        {/* 공략글 제목 */}
        <div className=" w-fit font-sans font-semibold hover:font-bold mb-1 whitespace-nowrap overflow-hidden text-ellipsis hover:underline">
          {tacticTitle && tacticTitle}
        </div>
        {/* 공략글 내용 */}
        <div className="laptop:max-h-14 tablet:max-h-12 mobile:max-h-10 text-sm break-words text-left whitespace-normal leading-5 overflow-hidden text-ellipsis">
          {tacticContent && tacticContent}
        </div>
      </div>
      {/* 유저, 게시글 작성 시간 */}
      <div className="flex flex-row justify-end items-center">
        {userServiceId && (
          <span
            onClick={onClickUser}
            className=" font-semibold text-moa-purple-light hover:cursor-pointer hover:text-moa-purple-dark">
            {userServiceId}
          </span>
        )}
        <span className="mx-2">{"."}</span>
        <span className="text-searchbar-gray algitn-text-center">
          {createTime && formatTime(createTime)}
        </span>
      </div>
    </div>
  );
}

export default GameTacticListItem;
