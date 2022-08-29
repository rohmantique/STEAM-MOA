import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";
import jwt_decode from "jwt-decode";

import { useRecoilState } from "recoil";
import { auth } from "../../recoil/Auth";
import { postLogin } from "../../api/Auth.js";
import Swal from "sweetalert2";

const Login = (props) => {
  const [userAuth, setAuth] = useRecoilState(auth);
  const [user, setUser] = useState({
    service_id: "",
    service_pw: "",
  });
  const navigate = useNavigate();

  const SuccessToast = Swal.mixin({
    toast: true,
    position: "center",
    timer: 1000,
  });

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
        text: "재로그인을 원할 시 로그아웃하세요.",
      });
      navigate("/");
    }
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  const login = () => {
    postLogin({
      user_service_id: user.service_id,
      user_service_pw: user.service_pw,
    })
      .then(function (response) {
        //  로그인 후 처리 ->
        // 1. status 200일때 메인 페이지 or 원래 있던 페이지로 리다이렉트
        // res.data.status / res.status => int
        if (response.status === 200) {
          const token = response.data.accessToken;
          //토큰 디코딩, 아이디 받기
          const decoded = jwt_decode(token);
          const userId = decoded.sub;

          sessionStorage.setItem("token", token);
          const payload = {
            isLoggedIn: true,
            token: token,
            userId: userId,
          };
          setAuth(payload);
          SuccessToast.fire({
            showConfirmButton: false,
            icon: "success",
            title: "로그인 성공!",
            padding: "1em",
          }).then(() =>{
            if (sessionStorage.getItem('justSigned')){
              sessionStorage.removeItem('justSigned')
              navigate('/', { replace: true })
            } else{
              navigate(-1, { replace: true });
            }
          })
          // 2. 나머지는 오류 메시지 보여주기 (toast로)
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          FailureToast.fire({
            customClass: {
              confirmButton: "mx-2 rounded py-1 px-5 bg-rose-500 text-white w-full",
            },
            width: "30%",
            padding: "1em",
            icon: "error",
            title: `비밀번호가 올바르지 않습니다.`,
            text: "로그인 정보를 확인해주세요.",
          });
        } else if (err.message === "Network Error") {
          FailureToast.fire({
            customClass: {
              confirmButton: "mx-2 rounded py-1 px-5 bg-rose-500 text-white w-full",
            },
            width: "30%",
            padding: "1em",
            icon: "error",
            title: `존재하지 않는 아이디입니다.`,
            text: "로그인 정보를 확인해주세요.",
          });
        } else {
          FailureToast.fire({
            customClass: {
              confirmButton: "mx-2 rounded py-1 px-5 bg-rose-500 text-white w-full",
            },
            width: "30%",
            padding: "1em",
            icon: "error",
            title: `로그인 실패...`,
            text: "잠시 후 시도해주세요.",
          });
        }
      });
  };

  return (
    <div className="w-full h-screen">
      <Navbar></Navbar>
      <div className="bg-slate-700 w-full tablet:w-per75 h-[93%] mx-auto flex flex-col items-center justify-center">
        <div className="login-logo w-full">
          <img
            src="../ImgAssets/TypoIconLogo.png"
            alt="TypoIconLogo"
            className="login-Logo m-auto my-10 w-per65 tablet:w-per50 laptop:w-per35 laptop:max-w-[350px]"
          />
        </div>
        <div className="login-form  w-per65 tablet:w-per50 laptop:w-per35 laptop:max-w-[350px]">
          <input
            className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="input_id"
            name="service_id"
            onChange={onChange}
            type="text"
            value={user.service_id}
            placeholder="아이디를 입력하세요"
            onKeyUp={handleEnter}
          />
          <input
            className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="input_password"
            name="service_pw"
            onChange={onChange}
            type="password"
            value={user.service_pw}
            placeholder="비밀번호를 입력하세요"
            onKeyUp={handleEnter}
          />
          <div className="login-find-account flex justify-end texts-end text-white text-xs mb-4">
            <div className="mr-2">
              <Link to="/signup">회원가입</Link>
            </div>
            {/* <div className="items-end mb-4">
                <Link to="/">아이디|비밀번호 찾기</Link>
                </div> */}
          </div>
        </div>

        <button
          className="login-button text-white bg-black  w-per65 tablet:w-per50 laptop:w-per35 laptop:max-w-[350px]
                                hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                                px-5 py-4 text-center"
          onClick={login}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
