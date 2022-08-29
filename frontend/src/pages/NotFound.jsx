import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/error404neon.css";

const NotFound = (props) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <div className="w-full h-screen bg-black bg-opacity-40">
      <div className="h-full my-auto flex flex-col justify-center items-center pb-10">
        <div className="font-blackSans text-white tablet:text-[7em] mobile:text-5xl mb-4">404</div>
        <div className="text-white font-blackSans tablet:text-[2.4em] mobile:text-2xl mt-3 mb-5">
          해당 페이지를 찾을 수 없습니다.
        </div>
        <h1
          contentEditable
          spellCheck="false"
          className="tablet:text-[2.3em] text-[1.2em] tablet:mt-10 mt-6 font-semibold hover:cursor-pointer"
          onClick={onClick}>
          STEAM MOA로 돌아가기
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
