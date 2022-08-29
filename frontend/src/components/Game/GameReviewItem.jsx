import React from "react";
import { useRecoilState } from "recoil";
import { auth } from "../../recoil/Auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { deleteReviews } from "../../api/Review";

const GameReviewItem = (props) => {
  const { review, setRerender, profile } = props;
  const [userAuth] = useRecoilState(auth);
  const isMine = review.userServiceId === userAuth.userId;
  function leftPad(value) {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  }

  function toStringByFormatting(source, delimiter = ".") {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
  }

  const time = toStringByFormatting(new Date(review.currentDate));
  let starCol = "";
  if (review.reviewScore < 3) {
    starCol = "text-moa-blue";
  } else if (review.reviewScore < 4) {
    starCol = "text-moa-purple";
  } else {
    starCol = "text-moa-pink";
  }

  const onDelete = () => {
    Swal.fire({
      width: 300,
      text: "리뷰를 삭제할까요?",
      showCancelButton: true,
      confirmButtonColor: "#FA448C",
      cancelButtonColor: "#A9ACB1",
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      customClass: {
        confirmButton: "btn bg-moa-pink px-4 py-0.5 mr-3 rounded text-white text-lg",
        cancelButton: "btn bg-mainBtn-disabled px-4 py-0.5 rounded text-white text-lg",
      },
      buttonsStyling: false,
    }).then((res) => {
      if (res.isConfirmed) {
        deleteReviews(review.reviewId)
          .then((res) => {
            setRerender((rerender) => rerender + 1);
          })
          .catch((err) => {});
      }
    });
  };

  return (
    <div className="border rounded p-3 drop-shadow-md my-1.5 bg-white">
      {/* 작성자+시간 */}
      <div className="w-full flex justify-between">
        {/* 작성자 */}
        <div>
          {!profile ? (
            <Link
              to={`/profile/${review.userServiceId}`}
              className="text-xs text-center font-semibold hover:cursor-pointer">
              {review.userServiceId}
            </Link>
          ) : (
            // 게임으로 리다이렉트
            <Link
              to={`/gamemoa/detail/${review.gameId}`}
              className="text-xs text-center font-semibold hover:cursor-pointer">
              {review.gameName}
            </Link>
          )}
          <span className="text-xs text-center"> | </span>
          {/* 시간 */}
          <span className="text-xs text-center">{time}</span>
        </div>
        {isMine ? (
          <div>
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={onDelete}
              className="w-3 h-3 text-center text-gray-500 hover:text-gray-800"
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {/* 평점관련 */}
      <div className="flex items-center h-5 overflow-hidden mb-2">
        {/* 별 */}
        <div className="mr-2 h-auto">
          {review.reviewScore ? (
            [...Array(Math.floor(review.reviewScore))].map((_, index) => {
              return (
                <span className={`text-[1.2em] ${starCol} py-1`} key={index}>
                  ★
                </span>
              );
            })
          ) : (
            <></>
          )}
          {[...Array(5 - Math.floor(review.reviewScore))].map((_, index) => {
            return (
              <span className={`text-[1.2em] text-searchbar-gray py-1`} key={index}>
                ★
              </span>
            );
          })}
        </div>
        <div className="text-xs pt-1 font-semibold">{review.reviewScore}</div>
      </div>
      {/* content */}
      <div className="text-sm mb-1"><pre className="whitespace-pre-wrap">{review.reviewContent}</pre></div>
    </div>
  );
};

export default GameReviewItem;
