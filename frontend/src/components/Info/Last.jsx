import React from "react";
import { useNavigate } from "react-router-dom";
import "../..//assets/error404neon.css";

const Last = (props) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full h-per20 flex justify-center items-center">
        <span className="text-white text-4xl">스팀모아에서 멀티 플레이 게임을 즐겨보세요.</span>
      </div>

      <div className="w-full min-h-per80 flex justify-center">
        <h1
          contentEditable
          spellCheck="false"
          className="tablet:text-[2.3em] text-[1.2em] tablet:mt-10 mt-6 font-semibold hover:cursor-pointer"
          onClick={onClick}>
          모으러 가기
        </h1>
      </div>
    </div>
  );
};

export default Last;
