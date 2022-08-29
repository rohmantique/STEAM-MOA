import React, { useState } from "react";
import "../../assets/reviewStar.css";
import { useRecoilState } from "recoil";
import { auth } from "../../recoil/Auth";
import { Link, useParams } from "react-router-dom";
import { postReviews } from "../../api/Review";

const GameReviewCreate = (props) => {
  const { setRerender } = props;
  const params = useParams();
  const gameId = params.game_id;
  const [userAuth] = useRecoilState(auth);
  const [reviewData, setReviewData] = useState({
    gameId: gameId,
    reviewContent: "",
    reviewScore: 0,
    userServiceId: userAuth.userId,
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    postReviews(reviewData)
      .then((res) => {
        setRerender((rerender) => rerender + 1);
      })
      .catch((err) => {});
  };

  if (userAuth.isLoggedIn) {
    return (
      <div className="w-full px-[3%] py-2 tablet:py-4 bg-[#C9D1F1] rounded mt-2 drop-shadow-md">
        <div className="mb-0.5 text-[0.9em] font-semibold">리뷰 작성하기</div>
        <div className="flex items-center h-10">
          {/* 별점 label */}
          <div className="text-center mb-1 mr-2 text-[0.85em] font-bold">만족도</div>
          {/* 별점 5점척도 */}
          <div className="star-rating mb-2 max-h-10 max-w-144">
            <input
              type="radio"
              id={`5-stars-edit`}
              name="reviewScore"
              value={5}
              disabled={!userAuth.isLoggedIn}
              onChange={onChange}
            />
            <label
              htmlFor={`5-stars-edit`}
              className="star text-center drop-shadow-md
            ">
              ★
            </label>
            <input
              type="radio"
              id={`4-stars-edit`}
              name="reviewScore"
              value={4}
              disabled={!userAuth.isLoggedIn}
              onChange={onChange}
            />
            <label
              htmlFor={`4-stars-edit`}
              className="star text-center drop-shadow-md
            ">
              ★
            </label>
            <input
              type="radio"
              id={`3-stars-edit`}
              name="reviewScore"
              value={3}
              disabled={!userAuth.isLoggedIn}
              onChange={onChange}
            />
            <label
              htmlFor={`3-stars-edit`}
              className="star text-center drop-shadow-md
            ">
              ★
            </label>
            <input
              type="radio"
              id={`2-stars-edit`}
              name="reviewScore"
              value={2}
              disabled={!userAuth.isLoggedIn}
              onChange={onChange}
            />
            <label
              htmlFor={`2-stars-edit`}
              className="star text-center drop-shadow-md
            ">
              ★
            </label>
            <input
              type="radio"
              id={`1-stars-edit`}
              name="reviewScore"
              value={1}
              disabled={!userAuth.isLoggedIn}
              onChange={onChange}
            />
            <label
              htmlFor={`1-stars-edit`}
              className="star text-center drop-shadow-md
            ">
              ★
            </label>
          </div>
        </div>
        {/* input */}
        <textarea
          className="w-full min-h-6 resize-none rounded mb-1 text-[0.8em] bg-gray-50 border border-gray-400 focus:bg-white focus:ring-indigo-200"
          value={reviewData.reviewContent}
          onChange={onChange}
          name="reviewContent"
          placeholder="게임에 대한 의견을 남겨주세요"
        />

        <div className="flex justify-end">
          <button
            className="disabled:bg-mainBtn-disabled
                                disabled:hover:scale-100
                                min-w-[80px] w-[8%] bg-moa-purple text-center
                                py-1 tablet:py-1.5 drop-shadow-lg rounded
                              text-white text-[0.7em] font-bold hover:scale-[102%] hover:bg-moa-purple-dark"
            onClick={onSubmit}
            disabled={reviewData.reviewContent && reviewData.reviewScore ? false : true}>
            SUBMIT
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full px-[3%] py-2 tablet:py-4 bg-mainBtn-disabled rounded opacity-80  drop-shadow-md">
        <div className="mb-0.5 text-[0.9em] font-semibold text-gray-500">
          리뷰 작성을 위해{" "}
          <Link to={"/login"} className="text-[1.1em] text-moa-purple font-bold">
            로그인
          </Link>
          을 진행해주세요
        </div>
        <div className="flex items-center h-10">
          {/* 별점 label */}
          <div className="text-center mb-1 mr-2 text-[0.85em] font-bold text-gray-500">만족도</div>
          {/* 별점 5점척도 */}
          <div className="star-rating-disabled mb-2 max-h-10 max-w-144">
            <input
              type="radio"
              id={`5-stars-edit`}
              name="reviewScore"
              value={5}
              disabled={!userAuth.isLoggedIn}
            />
            <label
              htmlFor={`5-stars-edit`}
              className="star text-center drop-shadow-md
            ">
              ★
            </label>
            <input
              type="radio"
              id={`4-stars-edit`}
              name="reviewScore"
              value={4}
              disabled={!userAuth.isLoggedIn}
            />
            <label
              htmlFor={`4-stars-edit`}
              className="star text-center drop-shadow-md
            ">
              ★
            </label>
            <input
              type="radio"
              id={`3-stars-edit`}
              name="reviewScore"
              value={3}
              disabled={!userAuth.isLoggedIn}
            />
            <label
              htmlFor={`3-stars-edit`}
              className="star text-center drop-shadow-md
            ">
              ★
            </label>
            <input
              type="radio"
              id={`2-stars-edit`}
              name="reviewScore"
              value={2}
              disabled={!userAuth.isLoggedIn}
            />
            <label
              htmlFor={`2-stars-edit`}
              className="star text-center drop-shadow-md
            ">
              ★
            </label>
            <input
              type="radio"
              id={`1-stars-edit`}
              name="reviewScore"
              value={1}
              disabled={!userAuth.isLoggedIn}
            />
            <label
              htmlFor={`1-stars-edit`}
              className="star text-center drop-shadow-md
            ">
              ★
            </label>
          </div>
        </div>
        {/* input */}
        <textarea
          className="bg-card-lightgray w-full min-h-6 resize-none rounded mb-1 text-[0.8em]"
          disabled
          placeholder="리뷰 작성은 로그인 후 가능합니다."
        />

        <div className="flex justify-end">
          <button
            className="disabled:bg-gray-500
                                disabled:hover:scale-100
                                min-w-[80px] w-[8%]
                                py-1 tablet:py-1.5 drop-shadow-lg rounded
                              text-white text-[0.7em] font-bold"
            onClick={onSubmit}
            disabled>
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
};

export default GameReviewCreate;
