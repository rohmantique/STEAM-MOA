import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getServiceIdDuplicate, postSignup } from "../../api/Auth";
import Swal from "sweetalert2";

const SignupForm = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  let steamId = "";
  const [user, setUser] = useState({
    service_id: "",
    name: "",
    service_pw: "",
    service_pw_confirm: "",
  });

  //오류메시지 상태저장
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isCheckedId, setIsCheckedId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

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

  const onChangeId = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    if (!isCheckedId) {
      setIdMessage("* '중복 검사' 버튼을 통해 확인해주세요.");
      setIsCheckedId(false);
    }
  };

  const onChangeName = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const onChangePassword = (event) => {
    const { name, value } = event.target;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    setUser({
      ...user,
      [name]: value,
    });
    if (!passwordRegex.test(value)) {
      setPasswordMessage("* 비밀번호가 유효하지 않습니다.");
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
    if (value !== user.service_pw) {
      setPasswordConfirmMessage("* 비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    }
  };

  const handleIdCheck = (e) => {
    getServiceIdDuplicate(user.service_id)
      .then(({ data }) => {
        if (!(data.statusCode === 200)) {
          setIdMessage("아이디가 중복되었습니다.");
          setIsCheckedId(false);
        } else {
          setIdMessage("사용 가능한 아이디입니다.");
          setIsCheckedId(true);
        }
      })
      .catch();
  };

  useEffect(() => {
    //return url 파싱
    const search = location.search.substring(1);

    const urlObj = JSON.parse(
      '{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
    );
    const getUserId = (response) => {
      const str = response["openid.claimed_id"];
      const res = decodeURIComponent(str);
      const propsArr = res.split("/");

      return propsArr[propsArr.length - 1];
    };

    steamId = getUserId(urlObj);
  });

  const signup = () => {
    if (!user.service_id || !user.name || !user.service_pw || !user.service_pw_confirm) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "모든 사항을 입력해주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (!steamId) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "유효하지 않은 접근입니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/signup", { replace: true });
      return;
    }

    postSignup({
      user_name: user.name,
      user_service_id: user.service_id,
      user_service_pw: user.service_pw,
      user_steam_id: steamId,
    })
      .then(({ status, data }) => {
        if (status === 200) {
          sessionStorage.setItem('justSigned', true)
          SuccessToast.fire({
            padding: "3em",
            showConfirmButton: false,
            icon: "success",
            title: "회원가입 성공!",
          }).then(navigate("/login", { replace: true }));
        } else {
          SuccessToast.fire({
            padding: "3em",
            showConfirmButton: false,
            icon: "error",
            title: "회원가입 실패...",
          }).then(navigate("/signup", { replace: true }));
        }
      })
      .catch(({ response }) => {
        console.log(response)
        if (response.status === 409) {
          FailureToast.fire({
            customClass: {
              confirmButton: "mx-2 rounded py-1 px-5 bg-rose-500 text-white w-full",
            },
            padding: "1em",
            icon: "error",
            title: `이미 가입된 스팀 아이디입니다.`,
            text: "로그인을 진행해주세요.",
          }).then(() => {
            navigate("/login", { replace: true });
          });
        } else {
          FailureToast.fire({
            customClass: {
              confirmButton: "mx-2 rounded py-1 px-5 bg-rose-500 text-white w-full",
            },
            padding: "1em",
            icon: "error",
            title: `유효하지 않은 접근입니다.`,
            text: "다시 시도해주세요.",
          }).then(() => {
            navigate("/signup", { replace: true });
          });
        }
      });
  };

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="bg-slate-700 pt-24 w-full tablet:w-per75 h-per95 mx-auto flex flex-col align-center  items-center">
        <span className="text-white font-blackSans text-[2em] mb-2">회원가입</span>
        <div className="w-per85 tablet:w-per70 laptop:w-per50 max-w-[450px]">
          {/* ID */}
          <div className="w-full mb-2">
            <label htmlFor="user_service_id" className="text-white text-[0.8em]">
              아이디
            </label>
            <div className="w-full flex flex-row justify-between">
              <input
                id="user_service_id"
                type="text"
                name="service_id"
                onChange={onChangeId}
                className="w-per70 tablet:w-per75 laptop:w-per80 rounded-md"
              />
              <button
                className="w-per30 tablet:w-per25 laptop:w-per20 ml-2 text-white text-[0.8em] text-center rounded-lg bg-mainBtn-blue hover:bg-main-300 focus:ring-4 focus:outline-none laptop:px-3 tablet:px-1 py-2.5"
                onClick={handleIdCheck}>
                중복검사
              </button>
            </div>

            <span className={`font-semibold ${isCheckedId ? "text-green-500" : "text-red-500"} `}>
              {idMessage}
            </span>
          </div>
          {/* NAME */}
          <div className="w-full mb-2">
            <label htmlFor="user_name" className="text-white text-[0.8em]">
              닉네임
            </label>
            <input
              id="user_name"
              type="text"
              name="name"
              onChange={onChangeName}
              className="w-full rounded-md"
            />
          </div>
          {/* PASSWORD */}
          <div className="w-full mb-2">
            <label htmlFor="user_service_pw" className="text-white text-[0.8em]">
              비밀번호
            </label>
            <input
              id="user_service_pw"
              type="password"
              name="service_pw"
              onChange={onChangePassword}
              className="w-full rounded-md text-sm"
              placeholder="숫자, 영문 대,소문자 , 특수문자(!@#$%^+=-) 포함 (8~25자)"
            />
            <span className="text-red-500 font-semibold">{passwordMessage}</span>
          </div>
          {/* PASSWORD CONFIRM */}
          <div className="w-full mb-2.5">
            <label htmlFor="user_service_pw_confirm" className="text-white text-[0.8em]">
              비밀번호 확인
            </label>
            <input
              id="user_service_pw_confirm"
              type="password"
              name="service_pw_confirm"
              onChange={onChangePasswordConfirm}
              className="w-full rounded-md"
              placeholder="한번 더 비밀번호를 입력해주세요"
            />
            <span className="text-red-500 font-semibold">{passwordConfirmMessage}</span>
          </div>
        </div>
        <button
          className="w-per85 tablet:w-per70 laptop:w-per50 max-w-[450px] 
                     mt-5 text-white text-center font-blackSans text-[1.2em] 
                     bg-black hover:bg-main-300 focus:ring-4 focus:outline-none focus:ring-blue-300 
                     rounded-lg px-5 laptop:py-3.5 tablet:py-3 py-2 
                     disabled:opacity-75 disabled:bg-gray-500"
          onClick={signup}
          disabled={!(isCheckedId && isPassword && isPasswordConfirm)}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
