import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../api/User";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "../../recoil/Auth";

function MoaUserCard(props) {
  const navigate = useNavigate();
  const currentUser = useRecoilState(auth);
  const currentUserServiceId = currentUser[0].userId;

  const [player, setPlayer] = useState(props.player);

  const [user, setUser] = useState({
    userId: 0,
    userServiceId: "",
    userPoint: 0,
    userTags: [],
  });

  const tierMin = 33.5;
  const tierMax = 39.5;
  const tierNum = [34.5, 35.5, 37.5, 38.5];
  const tiersImg = ["Bronze", "Silver", "Gold", "Platinum", "Ruby"];
  const progressStyle = {
    width: ((user.userPoint - tierMin) / (tierMax - tierMin)) * 100 + "%",
  };

  const getTier = () => {
    for (let i = 0; i < tierNum.length; i++) {
      if (user.userPoint < tierNum[i]) {
        return tiersImg[i];
      }
    }
    return tiersImg[4];
  };

  useEffect(
    (e) => {
      if (!props.player.userId) return;
      getUserInfo(props.player.userId).then((res) => {
        setUser(res.data.user);
      });
    },
    [props]
  );

  const onUserCard = () => {
    navigate(`/profile/${user.userServiceId}`);
  };

  const onClickUserDelete = (e) => {
    e.stopPropagation();
    props.deleteUser(user.userServiceId);
  };

  const pinkNeonBox = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "100%",
    maxWidth: "12em",
    height: "7rem",
    border: "0.1rem solid #fff",
    borderRadius: "1.7rem",
    padding: "0.8rem",
    boxShadow:
      "0 0 1px, 0 0 .1rem #fff, 0 0 1rem #FA448C, 0 0 0.8rem #FA448C, 0 0 1.5rem #FA448C, inset 0 0 0.05rem #FA448C",
  };

  const yellowNeonBox = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "100%",
    maxWidth: "12em",
    height: "7rem",
    border: "0.1rem solid #fff",
    borderRadius: "1.7rem",
    padding: "0.8rem",
    boxShadow:
      "0 0 1px, 0 0 .1rem #fff, 0 0 1rem #FEC859, 0 0 0.8rem #FEC859, 0 0 1.5rem #FEC859, inset 0 0 0.05rem #FEC859",
  };

  let cardColor = "";
  if (props.player.leader === true) {
    cardColor = yellowNeonBox;
  } else {
    cardColor = pinkNeonBox;
  }

  return (
    <div
      className="col-span-1 mx-auto flex flex-col justify-evenly overflow-hidden hover:cursor-pointer hover:opacity-80 w-full"
      onClick={onUserCard}
      style={cardColor}>
      {/* 파티장이 접속했을 때만 x 아이콘 표시 */}
      {currentUserServiceId === props.leader && (
        <div className="flex justify-end mr-1">
          {/* 파티장 아닌 멤버만 x 표기 */}
          {user.userServiceId !== props.leader && (
            <FontAwesomeIcon
              onClick={onClickUserDelete}
              className="text-sm text-black hover:cursor-pointer hover:text-red-600"
              icon={faX}
            />
          )}
        </div>
      )}
      {/* 매너 온도에 따른 티어 이미지 */}
      <div className="w-full flex laptop:flex-row justify-between items-center text-white mb-3 tablet:flex-col mobile:flex-col">
        <div className="flex flex-row items-center">
          <img src={`../../ImgAssets/Tier${getTier()}.png`} alt="" className="w-8 h-8 mr-1" />
          <div className="font-blackSans text-black text-sm mr-2 overflow-hidden text-ellipsis">
            {user.userServiceId}
          </div>
        </div>
      </div>
      {/* 유저 매너 온도 */}
      {/* 색깔 티어에 따라 맞춰서 */}
      <div className="bg-gray-400 h-4 text-xs font-medium text-white text-center leading-none rounded-full">
        <div
          className="bg-amber-600 h-4 text-xs font-medium text-white text-center leading-4 rounded-full"
          style={progressStyle}>
          {`${user.userPoint}°C`}
        </div>
      </div>
    </div>
  );
}

export default MoaUserCard;
