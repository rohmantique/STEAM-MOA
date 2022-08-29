import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { auth } from "../../recoil/Auth";
import { useRecoilValue } from "recoil";
import { getATactic, putTactics } from "../../api/Tactic";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

const TacticUpdate = () => {
  const { tactic_id } = useParams();
  const navigate = useNavigate();
  const [tacticTitle, setTacticTitle] = useState("");
  const [tacticContent, setTacticContent] = useState("");
  const [tactic, setTactic] = useState({});

  const user = useRecoilValue(auth);
  const user_id = user.userId;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  useEffect(() => {
    if (!user_id) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "잘못된 접근입니다! &#128529",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/`);
    } else {
      getATactic(tactic_id)
        .then(({ data }) => {
          setTacticTitle(data.tacticTitle);
          setTacticContent(data.tacticContent);
          setTactic({
            userServiceId: data.userServiceId,
            gameId: data.gameId,
            gameName: data.gameName,
            gameImgPath: data.gameImgPath,
          });
        })
        .catch(() => {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "해당 게임을 불러올 수 없습니다. &#128521",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(-1);
        });
    }
  }, []);

  const handleChangeTitle = useCallback(
    (e) => {
      setTacticTitle(e.target.value);
    },
    [tacticTitle]
  );

  const handleChangeContents = (e) => {
    setTacticContent(e.target.value);
  };

  const onClickUpload = () => {
    const _tactic = {
      tacticId: tactic_id,
      gameId: tactic.gameId,
      tacticContent: tacticContent,
      tacticTitle: tacticTitle,
      userServiceId: tactic.userServiceId,
    };

    if (!_tactic.gameId || !_tactic.tacticTitle || !_tactic.tacticContent) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "제목, 게임, 공략글을 작성해주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (_tactic.userServiceId !== user_id) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "잘못된 접근입니다!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }

    putTactics(_tactic)
      .then(({ data }) => {
        const { msg } = data;
        if (msg === "Success") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "공략글 업로드 성공! &#128521",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/gamemoa/detail/${tactic.gameId}/tactic`);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "공략글 업로드 실패...",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch();
  };

  return (
    <div className="w-full min-h-full">
      <Navbar />
      <div className="w-per95 tablet:w-per75 min-h-full mx-auto my-5 rounded flex flex-col">
        <div className="w-full h-full bg-main-300 mb-2 text-main-300">**</div>
        <div className="w-full h-full m-aut p-5 mb-2 bg-main-400">
          <div className="w-full flex flex-col">
            <span className="text-white text-sm font-semibold">공략 제목</span>
            <input
              id="tacticTitle"
              onChange={handleChangeTitle}
              value={tacticTitle}
              className="w-full text-main-500 bg-createInput-gray laptop:text-lg rounded p-1 px-2 "
              placeholder="공략글 제목을 작성해주세요"
            />
          </div>
          {/* 게임 정보 */}
          <div className="w-full flex flex-col mt-3">
            {tactic.gameId ? (
              <div className="w-full flex flex-col">
                <span className="text-white text-sm font-semibold">공략 게임</span>
                <div className="w-full max-h-10 border-solid border-stone-700 bg-createInput-gray rounded flex p-1">
                  <img
                    src={tactic.gameImgPath}
                    alt="게임 이미지"
                    className="laptop:w-per10 tablet:w-per30 mobile:w-per50 rounded"
                  />
                  <span className="laptop:w-per90 tablet:w-per70 mobile:w-per50 whitespace-nowrap p-1.5 text-gray-900 align-center pt-1 overflow-hidden text-ellipsis">
                    {tactic.gameName}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-white text-white border-solid border-stone-700 w-full h-full p-1 rounded">
                **
              </div>
            )}
          </div>
          <div className="flex flex-col justify-start items-start mt-3">
            <label htmlFor="tacticContent" className="text-white text-sm font-semibold">
              공략 내용
            </label>
            <textarea
              className="w-full min-h-[25rem] bg-createInput-gray rounded"
              id="tacticContent"
              value={tacticContent}
              placeholder="공략글을 작성해 주세요."
              onChange={handleChangeContents}></textarea>
          </div>
          <div className="flex justify-center mt-4">
            <Link
              to={`/gamemoa/detail/${tactic.gameId}/`}
              className="mr-2 text-white bg-gray-500 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              취소
            </Link>
            <button
              onClick={onClickUpload}
              className={`text-white bg-moa-pink hover:bg-moa-pink-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
              업로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticUpdate;
