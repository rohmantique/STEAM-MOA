import React, { useEffect, useState } from "react";
import { postPartyEval } from "../../api/MoaPartyEval";
import Swal from "sweetalert2";
import "../../assets/reviewStar.css";

const MoaPartyEval = (props) => {
  const { setShowEvalModal, showEvalModal, partyEvalInfo, userId } = props;
  const [evalInfo, setEvalInfo] = useState([]);
  const evalList = partyEvalInfo?.partyPlayers
    .map((player) => {
      if (player.userId !== userId) {
        return {
          playerId: player.userId,
        };
      }
    })
    .filter((item) => {
      if (item) {
        return item;
      }
    });

  useEffect(() => {
    setEvalInfo(
      partyEvalInfo?.partyPlayers
        .map((player) => {
          if (player.userId !== userId) {
            return {
              partyId: partyEvalInfo.partyId,
              score: 0,
              userId: player.playerId,
              voterId: userId,
            };
          }
        })
        .filter((item) => {
          if (item) {
            return item;
          }
        })
    );
  }, [partyEvalInfo]);

  const SuccessToast = Swal.mixin({
    toast: true,
    position: "center",
    timer: 1000,
  });

  const onHandleScore = (e) => {
    const idx = parseInt(e.target.name);
    const val = e.target.value;
    setEvalInfo(
      evalInfo.map((el, index) => {
        if (idx === index) {
          el.score = val;
        }
        return el;
      })
    );
  };

  const onSubmit = () => {
    Swal.fire({
      text: "평가를 제출할까요?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4461FA",
      cancelButtonColor: "#FA448C",
      confirmButtonText: "제출하기",
      cancelButtonText: "취소하기",
      focusConfirm: true,
      focusCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        evalInfo.map((evaluation) => {
          postPartyEval(evaluation)
            .then((res) => {})
            .catch((err) => {});
        });
        setShowEvalModal(false);
        SuccessToast.fire({
          showConfirmButton: false,
          icon: "success",
          title: "평가 완료!",
        });
      }
    });
  };

  const onCloseEvalModal = () => {
    setShowEvalModal(false);
  };

  return (
    // modal
    <div
      id="following-modal"
      className={`${
        showEvalModal ? "bg-black bg-opacity-50" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}>
      <div className="relative p-4 top-[100px] w-full max-w-[550px] h-full  md:h-[450px] mx-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow w-full">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center p-5 rounded-t border-b">
            <div className=" font-medium text-gray-800">
              <div className="text-sm font-semibold mb-0.5">[{partyEvalInfo.gameName}]</div>
              <div className="text-sm text-baseline">
                <span className="text-base font-bold mr-2">{partyEvalInfo.partyTitle}</span>{" "}
                <span>파티원 평가</span>
              </div>
            </div>
            <button
              onClick={onCloseEvalModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="px-6 py-4 space-y-4 h-[400px] overflow-y-auto ">
            <div className="text-[13px]">
              <div>
                모아러들의 더 좋은 경험을 위해{" "}
                <span className="text-base text-moa-purple font-bold">{userId}</span>님의 모아
                경험을 평가해주세요.
              </div>
              <div>점수를 입력하지 않고 제출하게 되면 0점으로 평가됩니다.</div>
              <div className="mb-4">꼭 점수를 선택하고 제출해주세요!</div>
              <div className="flex">
                <div className="mr-3">평가기준| </div>
                <div>
                  <div>★: 파티 미참여등으로 인해 파티에 피해가 왔어요</div>
                  <div>★★: 참여는 했지만 매너가 좋지않았어요</div>
                  <div>★★★: 그냥 그랬어요.</div>
                  <div>★★★★: 매너가 좋은 파티원이었어요</div>
                  <div>★★★★★: 꼭 다시 파티를 함께하고 싶어요</div>
                </div>
              </div>
            </div>
            <hr />
            {/* 팔로잉 리스트 */}
            {evalList?.map((evaluation, idx) => {
              return (
                <div className="px-5 py-3 flex" key={idx}>
                  <div className="flex items-center mr-4 text-lg">{evaluation.playerId}</div>
                  <div className="star-rating-user mb-2 max-h-10 max-w-144 flex items-center">
                    <input
                      type="radio"
                      id={`${idx}-5-star`}
                      name={idx}
                      value={5}
                      onChange={onHandleScore}
                    />
                    <label
                      htmlFor={`${idx}-5-star`}
                      className="star text-center drop-shadow-md
                    ">
                      ★
                    </label>
                    <input
                      type="radio"
                      id={`${idx}-4-star`}
                      name={idx}
                      value={4}
                      onChange={onHandleScore}
                    />
                    <label
                      htmlFor={`${idx}-4-star`}
                      className="star text-center drop-shadow-md
                    ">
                      ★
                    </label>
                    <input
                      type="radio"
                      id={`${idx}-3-star`}
                      name={idx}
                      value={3}
                      onChange={onHandleScore}
                    />
                    <label
                      htmlFor={`${idx}-3-star`}
                      className="star text-center drop-shadow-md
                    ">
                      ★
                    </label>
                    <input
                      type="radio"
                      id={`${idx}-2-star`}
                      name={idx}
                      value={2}
                      onChange={onHandleScore}
                    />
                    <label
                      htmlFor={`${idx}-2-star`}
                      className="star text-center drop-shadow-md
                    ">
                      ★
                    </label>
                    <input
                      type="radio"
                      id={`${idx}-1-star`}
                      name={idx}
                      value={1}
                      onChange={onHandleScore}
                    />
                    <label
                      htmlFor={`${idx}-1-star`}
                      className="star text-center drop-shadow-md
                    ">
                      ★
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end p-3">
            <button
              className="px-2.5 py-1.5 bg-moa-purple rounded text-white hover:bg-moa-purple-dark hover:cursor-pointer drop-shadow-md"
              onClick={onSubmit}>
              평가 제출하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoaPartyEval;
