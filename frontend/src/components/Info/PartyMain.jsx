import React from "react";
import '../../assets/glowingHover.css'

const PartyMain = (props) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full h-per20 flex justify-center items-center">
        <div className="m-auto text-4xl text-white">
          원하는 게임의 <strong className="text-moa-purple">파티</strong>를 모아보세요!
        </div>
      </div>

      <div className="w-per75 h-per75 grid grid-cols-2 grid-rows-2 gap-5">
        <div className="flex flex-col justify-between w-full bg-white rounded-xl p-5">
          <div className="flex flex-col justify-start">
            <span className="self-start font-blackSans text-3xl text-moa-pink">모집중</span>
            <span>모집중인 파티에 참가하거나 나갈 수 있습니다.</span>
            <span>파티장의 권한으로 추방당할 수 있으니 티어를 관리해주세요!</span>
          </div>
          <div className="h-per50 w-full mb-2">
            <div className="photo h-full w-auto relative hover:translate-y-0.5 drop-shadow-lg">
              <img src="../../ImgAssets/moaOngoing.png" alt="" className="h-full aspect-auto mx-auto effect"/>
              <div className="glow-wrap w-full h-full">
                <i className="glow w-full h-full"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full h-full bg-white rounded-xl p-5">
          <div className="flex flex-col justify-start">
            <span className="self-start font-blackSans text-3xl text-moa-green">모집완료</span>
            <span>인원이 가득 찬 경우 모집이 완료됩니다.</span>
          </div>
          <div className="h-per50 w-full mb-2">
            <div className="photo h-full w-auto relative hover:translate-y-0.5 drop-shadow-lg">
              <img src="../../ImgAssets/moaCompleted.png" alt="" className="h-full aspect-auto mx-auto effect"/>
              <div className="glow-wrap w-full h-full">
                <i className="glow w-full h-full"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full h-full bg-white rounded-xl p-5">
          <div className="flex flex-col justify-start">
            <span className="self-start font-blackSans text-3xl text-moa-yellow">게임중</span>
            <span>게임이 시작되었습니다!</span>
            <span>약속한 시간에 채팅에 참여하여 게임을 즐겨보세요!</span>
          </div>
          <div className="h-per50 w-full mb-2">
            <div className="photo h-full w-auto relative hover:translate-y-0.5 drop-shadow-lg">
              <img src="../../ImgAssets/gameOngoing.png" alt="" className="h-full aspect-auto mx-auto effect"/>
              <div className="glow-wrap w-full h-full">
                <i className="glow w-full h-full"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full h-full bg-white rounded-xl p-5">
          <div className="flex flex-col justify-start">
            <span className="self-start font-blackSans text-3xl text-moa-purple">게임완료</span>
            <span>게임이 완료되었네요.</span>
            <span>함께했던 팀원의 매너를 다른 사용자에게 알려주세요!</span>
          </div>
          <div className="h-per50 w-full mb-2">
            <div className="photo h-full w-auto relative hover:translate-y-0.5 drop-shadow-lg">
              <img src="../../ImgAssets/gameCompleted.png" alt="" className="h-full aspect-auto mx-auto effect"/>
              <div className="glow-wrap w-full h-full">
                <i className="glow w-full h-full"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyMain;
