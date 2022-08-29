import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTactic, getATactic } from "../../api/Tactic";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar";
import { formatTime } from "../../util/FormatTime";
import { auth } from "../../recoil/Auth";
import { useRecoilValue } from "recoil";

const TacticDetail = () => {
  const { tactic_id } = useParams();
  const navigate = useNavigate();
  const [tactic, setTactic] = useState({});

  const user = useRecoilValue(auth);
  const user_id = user.userId;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  useEffect(() => {
    getATactic(tactic_id)
      .then(({ data }) => {
        setTactic({ ...data });
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "게임을 불러올 수 없습니다. &#128521",
          text: "잠시 후 다시 시도해주세요.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(-1);
      });
  }, []);

  const onClickUser = () => {
    tactic.userServiceId && navigate(`/profile/${tactic.userServiceId}/`);
  };

  const onClickList = () => {
    tactic.gameId && navigate(`/gamemoa/detail/${tactic.gameId}/tactic`);
  };

  const onClickUpdate = () => {
    tactic_id && navigate(`/tactic/update/${tactic_id}`);
  };

  const onClickDelete = () => {
    Swal.fire({
      title: "정말로 삭제하시겠어요?",
      text: "공략글을 삭제하면 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제할래요",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        tactic_id &&
          deleteTactic(tactic_id)
            .then(({ data }) => {
              if (data.msg === "Success") {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "삭제 성공! &#128521",
                  showConfirmButton: false,
                  timer: 1500,
                });
                tactic.gameId && navigate(`/gamemoa/detail/${tactic.gameId}/tactic`);
              }
            })
            .catch(() => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "삭제 실패... &#128521",
                showConfirmButton: false,
                timer: 1500,
              });
            });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="w-per95 tablet:w-per75 m-auto text-gray-200">
        <div className="overflow-hidden w-full relative pb-[25%] bg-gray-900 object opacity-[95%] hover:opacity-100 transition-transform ease-in-out duration-7000">
          {/* 게임 이미지 */}
          {tactic.gameImgPath ? (
            <img
              className="w-screen absolute top-[-50%] left-0 hover:scale-[55%] hover:translate-y-[5%] hover:object-contain transition-transform delay-150 ease-in-out duration-700"
              src={tactic.gameImgPath}
              alt="게임 이미지"
            />
          ) : (
            <div className="w-screen absolute top-[-50%] left-0" />
          )}
        </div>

        {/* 게임 이름 */}
        <div className="w-full h-4 flex items-center tablet:h-5 bg-gradient-to-b from-bg-search-gradient-from via-bg-search-gradient-via to-bg-search-gradient-to font-blackSans text-white text-xs whitespace-nowrap overflow-hidden text-ellipsis ">
          {tactic.gameName ? tactic.gameName : ""}
        </div>
        {/* 공략글 제목, 유저, 작성시간 */}
        <div className="flex flex-col mt-2 p-2 rounded bg-main-400">
          {/* 제목 */}
          <div className="font-blackSans text-2xl">{tactic.tacticTitle}</div>
          {/* 유저, 작성시간 */}
          <div className="w-full flex flex-row justify-between items-end">
            {tactic.userServiceId ? (
              <span className="mr-2 hover:cursor-pointer hover:text-gray-400" onClick={onClickUser}>
                [{tactic.userServiceId}]
              </span>
            ) : (
              ""
            )}
            <span className="text-sm">{formatTime(tactic.createTime)}</span>
          </div>
        </div>
        {/* 공략글 내용 */}
        <div className="w-full h-[30rem] overflow-y-auto flex flex-col mt-2 p-2 rounded bg-main-400">
          {tactic.tacticContent ? <pre className="whitespace-pre-wrap">{tactic.tacticContent}</pre> : "내용이 없습니다."}
        </div>
        <div className="flex justify-center mt-2 pb-5">
          {user_id && tactic.userServiceId && user_id === tactic.userServiceId ? (
            <>
              <button
                className="bg-moa-pink hover:cursor-pointer hover:bg-moa-pink-dark text-white rounded p-1 px-5 mr-2"
                onClick={onClickUpdate}>
                수정하기
              </button>
              <button
                className="bg-red-600 hover:cursor-pointer hover:bg-red-800 text-white rounded p-1 px-5 mr-2"
                onClick={onClickDelete}>
                삭제하기
              </button>
            </>
          ) : (
            ""
          )}
          <button
            className="bg-moa-green hover:cursor-pointer hover:bg-moa-green-dark text-white rounded p-1 px-5"
            onClick={onClickList}>
            목록보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TacticDetail;
