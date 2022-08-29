import React from "react";

const Game = (props) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full h-per20 flex justify-center items-center">
        <div className="m-auto text-4xl text-white">
          관심있는 <strong className="text-moa-purple">게임 정보</strong>를 모아보세요!
        </div>
      </div>

      <div className="w-per90 h-per80 flex flex-row justify-center items-center">
        <div className="flex flex-col justify-start w-per30 h-per90 bg-white rounded-xl p-5 mr-5">
          <span className="self-start font-blackSans text-3xl text-moa-pink">게임</span>
          <span>내가 원하는 게임의 정보를 빠르게 확인할 수 있어요.</span>
          <div className="h-per75 my-auto">
            <img src="../../ImgAssets/gameMoa.PNG" alt="" className="h-full aspect-auto mx-auto rounded"/>
          </div>
        </div>
        <div className="flex flex-col justify-start w-per30 h-per90 bg-white rounded-xl p-5 mr-5">
          <span className="self-start font-blackSans text-3xl text-moa-yellow-dark">리뷰</span>
          <span>다른 플레이어들은 이 게임을 어떻게 생각할까요?</span>
          <span>사용자들의 리뷰를 통해 재밌는 게임을 골라보세요!</span>
          <div className="h-per75 my-auto">
            <img src="../../ImgAssets/reviewGIF.gif" alt="" className="h-full aspect-auto mx-auto"/>
          </div>
        </div>
        <div className="flex flex-col justify-start w-per30 h-per90 bg-white rounded-xl p-5">
          <span className="self-start font-blackSans text-3xl text-moa-blue">공략</span>
          <span>게임이 잘 풀리지 않을 땐, 집단지성이 답!</span>
          <span>공략글을 통해 게임에 대해 더 알아가세요!</span>
          <div className="h-per75 my-auto">
            <img src="../../ImgAssets/tactic.PNG" alt="" className="h-full aspect-auto mx-auto rounded-lg"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
