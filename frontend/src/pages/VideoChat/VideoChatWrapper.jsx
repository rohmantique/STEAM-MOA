import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { auth } from "../../recoil/Auth";
import VideoChat from "./VideoChat";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { moaDetail } from "../../api/Moazone";

const VideoChatWrapper = (props) => {
  const PARTY_STATUS = "3";
  const navigate = useNavigate();
  const user = useRecoilValue(auth);
  const user_id = user.userId;
  const { chat_id } = useParams();
  const [party, setParty] = useState({});

  useEffect(() => {
    if (!user_id) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "로그인이 필요한 서비스입니다. &#128517",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } else {
      moaDetail(chat_id).then(({ data }) => {
        if (data.partyStatus === PARTY_STATUS && isPlayer(data.partyPlayers)) {
          setParty({
            partyStatus: data.partyStatus,
            gameName: data.gameName,
            partyName: data.partyTitle,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "잘못된 접근입니다.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      });
    }
  }, []);

  const isPlayer = (players) => {
    const found = players.find((player) => player.userId === user_id);
    return found ? true : false;
  };

  const leaveChat = () => {
    navigate("/");
  };

  return (
    <div>
      {party.partyStatus === PARTY_STATUS ? (
        <VideoChat
          userId={user_id}
          partyName={party.partyName}
          gameName={party.gameName}
          leaveChat={leaveChat}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default VideoChatWrapper;
