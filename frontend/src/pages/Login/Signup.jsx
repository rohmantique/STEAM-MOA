import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import "../../assets/style.css";
import { useRecoilState } from "recoil";
import { auth } from "../../recoil/Auth";
import Swal from "sweetalert2";

// import axios from "axios";

const Signup = (props) => {
  const [userAuth] = useRecoilState(auth);
  const navigate = useNavigate();

  const FailureToast = Swal.mixin({
    buttonsStyling: false,
    toast: true,
    position: "center",
    showConfirmButton: true,
  });

  useEffect(() => {
    if (userAuth.isLoggedIn) {
      FailureToast.fire({
        customClass: {
          confirmButton: "mx-2 rounded py-1 px-5 bg-rose-500 text-white w-full",
        },
        width: "35%",
        padding: "1em",
        icon: "error",
        title: `이미 로그인 되어있어요. &#129300`,
        text: "로그인 상태에서는 회원가입할 수 없어요.",
      });
      navigate("/");
    }
  }, []);

  const handleSteamAuth = () => {
    // genUrl 중간함수
    const http_build_query = (obj) => {
      let str = "";

      for (const key in obj) {
        const value = obj[key];
        str += `${key}=${value}&`;
      }

      return str;
    };

    // steam으로 보내줄 url 만드는 함수
    const genUrl = () => {
      const params = {
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": "https://i7a303.p.ssafy.io/signupform",
        "openid.realm": "https://i7a303.p.ssafy.io/",
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
      };

      const url = `https://steamcommunity.com/openid/login?${http_build_query(params)}`;
      return url;
    };
    window.location.href = genUrl();
  };
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="bg-slate-700 w-full tablet:w-per75 h-per95 mx-auto  flex flex-col align-center justify-center items-center">
        {/* 로고 */}
        <img
          src="../ImgAssets/TypoIconLogo.png"
          alt="TypoIconLogo"
          className="login-Logo my-8 w-per30 min-w-[180px]"
        />
        <div className="description text-white text-xs tablet:text-sm font-sans mt-10 mb-2 text-justify w-per80 tablet:w-per55 laptop:w-per50">
          스팀모아는 더 나은 서비스를 제공하기 위해 회원가입 단계에서 유저의 스팀 계정 인증을 거치고
          있습니다. 아래의 버튼을 눌러 Steam을 통한 회원가입을 진행하게 되면 스팀 모아는 귀하의
          Steam ID 정보를 제공받게됩니다. 해당 정보를 바탕으로 Steam Web API에서 귀하 계정의 공개
          정보(프로필 이름, 아바타 및 게임 목록 등)를 가져올 수 있습니다. 회원가입을 진행하시면 위
          정보 제공에 동의한 것으로 간주됩니다.
        </div>
        <div className="description text-white text-sm font-sans mt-2 mb-7 text-justify w-per80  tablet:w-per55 laptop:w-per50">
          스팀모아는 Valve Corporation 및 Steam과 관련이 없으며, 언제든지 계정을 삭제할 수 있습니다.
        </div>
        {/* 스팀 로그인 버튼 */}
        <img
          src="../ImgAssets/steam_signin.png"
          alt=""
          onClick={handleSteamAuth}
          className="login-Logo my-8 w-per30 drop-shadow-lg hover:scale-[101%] hover:cursor-pointer min-w-[180px]"
        />
      </div>
    </div>
  );
};

export default Signup;
