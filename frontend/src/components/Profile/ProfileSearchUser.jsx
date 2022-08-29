import React from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../Badge";
import MoaCard from "../MoaCard";

const ProfileSearchUser = (props) => {
  const navigate = useNavigate();
  const { userName, userServiceId, userPoint, userTags, userParties } =
    props.user;
  const tierMin = 33.5;
  const tierMax = 39.5;
  const tierNum = [34.5, 35.5, 37.5, 38.5];
  const tiersImg = ["Bronze", "Silver", "Gold", "Platinum", "Ruby"];
  const progressStyle = {
    width: ((userPoint - tierMin) / (tierMax - tierMin)) * 100 + "%",
  };
  const roundedPoint = Math.round(userPoint * 10) / 10;

  const getTier = () => {
    for (let i = 0; i < tierNum.length; i++) {
      if (userPoint < tierNum[i]) {
        return tiersImg[i];
      }
    }
    return tiersImg[4];
  };

  const onClickUser = (e) => {
    e.preventDefault();
    navigate(`/profile/${userServiceId}`);
  };

  return (
    <div
      className="w-full flex flex-col bg-miniMoa-dark rounded-lg p-5 overflow-hidden"
      onClick={onClickUser}
    >
      {/* 유저 정보 */}
      <div className="w-full flex laptop:flex-row justify-between items-center text-white mb-3 tablet:flex-col mobile:flex-col">
        <div className="flex flex-row items-center">
          <img
            src={`../../ImgAssets/Tier${getTier()}.png`}
            alt=""
            className="w-14 h-14 mr-5"
          />
          <span className="font-blackSans laptop:text-2xl mr-2">
            {userServiceId}
          </span>
          <span className=" text-lg mr-2">[{userName}]</span>
        </div>
        <div className="flex flex-row justify-center">
          {userTags.map((tag) => (
            <Badge key={tag} name={tag} />
          ))}
        </div>
      </div>
      {/* 파티 온도 */}
      <div className="w-full mb-3">
        <div className="w-full flex flex-row justify-between mb-1">
          <div className="text-lg whitespace-nowrap text-white">파티 온도</div>
          <span className="whitespace-nowrap text-white">{`${roundedPoint}°C`}</span>
        </div>
        <div className="w-per80 m-auto bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-moa-purple text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={progressStyle}
          >
            {`${roundedPoint}°C`}
          </div>
        </div>
      </div>

      {/* 파티 정보 */}
      <div className="text-white text-lg mb-1">참여한 파티</div>

      {userParties.length ? (
        <div className="grid tablet:grid-cols-3 mobile:grid-cols-1 gap-1 text-lg">
          {props.isMobile ? (
            <MoaCard party={userParties[0]} />
          ) : (
            userParties.map((party) => (
              <MoaCard key={party.partyId} party={party} />
            ))
          )}
        </div>
      ) : (
        <span className="text-black m-auto">참여한 파티가 없습니다."</span>
      )}
    </div>
  );
};

export default ProfileSearchUser;
