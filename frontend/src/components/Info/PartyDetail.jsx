import React from "react";

const PartyDetail = (props) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full h-per20 flex justify-center items-center">
        <div className="m-auto text-4xl text-white">
          나와 잘 맞는 <strong className="text-moa-purple">파티원</strong>을 모아보세요!
        </div>
      </div>

      <div className="w-full h-per80 flex flex-row justify-center items-center">
        <div className="flex flex-col justify-start w-per30 h-per90 bg-white rounded-xl p-5 mr-5">
          <span className="self-start font-blackSans text-3xl text-moa-pink">티어</span>
          <span>더욱 젠틀한 게임매너를 발휘해 티어를 올려보세요.</span>
          <div className="h-per80 my-auto">
            <img src="../../ImgAssets/tierInfo.png" alt=""  className="h-full aspect-auto mx-auto"/>
          </div>
        </div>
        <div className="flex flex-col justify-start w-per30 h-per90 bg-white rounded-xl p-5 mr-5">
          <span className="self-start font-blackSans text-3xl text-moa-yellow-dark">평가</span>
          <span>게임 후 파티원의 매너를 평가하여 건전한 파티 문화를 만들어요</span>
          <div className="h-per75 my-auto">
            <img src="../../ImgAssets/evalGIF.gif" alt="" className="h-full aspect-auto mx-auto"/>
          </div>
        </div>
        <div className="flex flex-col justify-start w-per30 h-per90 bg-white rounded-xl p-5">
          <span className="self-start font-blackSans text-3xl text-moa-blue">채팅</span>
          <span>게임이 시작되면 화상채팅방에서 이야기를 나눌 수 있어요.</span>
          <span>시작 후 24시간 이용 가능하니 비대면 뒷풀이는 어떨까요?</span>
          <div className="h-per75 my-auto">
            <img src="../../ImgAssets/chat.jpg" alt="" className="h-full aspect-auto mx-auto"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyDetail;
