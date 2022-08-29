import React, { useEffect, useState } from "react";
import { useParams, Routes, Route, useNavigate, NavLink, Link } from "react-router-dom";
import { getGame } from "../../api/Game";
import Navbar from "../../components/Navbar";
import GameReviewList from "../../components/Game/GameReviewList";
import GameTacticList from "../../components/Game/GameTacticList";

const GameDetail = (props) => {
  const param = useParams();
  const isTactic = Object.values(param).includes("tactic") ? true : false;
  const navigate = useNavigate();
  const [gameDetail, setGameDetail] = useState({
    gameGenreRepository: "",
    gameCategoryRepository: "",
    gameId: "",
    steamgameId: "",
    name: "",
    score: "",
    imgpath: "",
    age: "",
    description: "",
    languages: "",
    developers: "",
    price: "",
    discount: "",
    genres: [],
    categories: [],
    gcategoryStorageRepository: "",
    ggenreStorageRepository: "",
    free: "",
    window: "",
    mac: "",
  });
  const params = useParams();
  const gameId = params.game_id;
  const tabDesign = `inline-flex py-[0.8em] px-[1.6em] rounded-t-lg border-b-2 border-transparent hover:text-gray-700 hover:border-indigo-400`;

  // Scroll To Top 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  useEffect(() => {
    getGame(gameId)
      .then((res) => {
        setGameDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [gameId]);
  const tagInfo = [...gameDetail.genres];
  if (gameDetail.free) {
    tagInfo.push("free");
  }
  const genresTrue = gameDetail.genres.length ? "border-r-2 border-dashed border-white" : "";
  const tagClass =
    gameDetail.genres.length > 2
      ? "tablet:flex my-2.5 tablet:my-3.5 laptop:my-5"
      : "flex my-2.5 tablet:my-3.5 laptop:my-5";
  const tagBtmClass =
    gameDetail.genres.length > 2
      ? "flex pr-2 mr-2 tablet:border-r-2 tablet:border-dashed tablet:border-white tablet:pr-4 tablet:mr-4 mb-2 tablet:mb-0"
      : `${genresTrue} flex pr-2 mr-2 tablet:pr-4 tablet:mr-4`;

  const onClickParty = () => {
    navigate(`/moazone?page=1&word=${gameDetail.name}`);
  };
  const onClickSteam = () => {
    window.location.href = `https://store.steampowered.com/app/${gameDetail.steamgameId}`;
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-per95 tablet:w-per75 mx-auto">
        {/* 게임 이미지 */}
        <div className="overflow-hidden w-full relative pb-[25%] bg-gray-900 object opacity-[95%] hover:opacity-100 transition-transform ease-in-out duration-7000">
          <img
            src={gameDetail.imgpath}
            alt=""
            className="w-screen absolute top-[-50%] left-0 hover:scale-[55%] hover:translate-y-[5%] hover:object-contain transition-transform delay-150 ease-in-out duration-700"
          />
        </div>
        {/* 그라데이션 구분선 */}
        <div className="w-full h-[1.5em] tablet:h-5 bg-gradient-to-b from-bg-search-gradient-from via-bg-search-gradient-via to-bg-search-gradient-to "></div>
        {/* 본문 */}
        <div className="p-[2.5%] mb-4">
          {/* 제목 */}
          <div className="font-blackSans text-xl tablet:text-2xl laptop:text-[32px] text-white">
            {gameDetail.name}
          </div>
          <div className={tagClass}>
            <div className={tagBtmClass}>
              {/* 스팀으로 */}
              <div
                onClick={onClickSteam}
                className="hover:cursor-pointer rounded-2xl font-bold text-white text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-1.5 tablet:px-2.5 py-0.5 bg-moa-blue hover:bg-moa-blue-dark drop-shadow-lg hover:scale-[102%] text-center flex items-center mr-2">
                스팀 GO!
              </div>
              {/* 파티보러가기 */}
              <div
                onClick={onClickParty}
                className="hover:cursor-pointer rounded-2xl font-bold text-white text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-1.5 tablet:px-2.5 py-1 bg-moa-pink hover:bg-moa-pink-dark drop-shadow-lg hover:scale-[102%] text-center flex items-center mr-2">
                파티 GO!
              </div>
              {/* 공략글쓰기 */}
              <Link
                to={`/tactic/create?game=${gameDetail.gameId}`}
                className="hover:cursor-pointer rounded-2xl font-bold text-white text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-1.5 tablet:px-2.5 py-1 bg-moa-green hover:bg-moa-green-dark drop-shadow-lg hover:scale-[102%] text-center flex items-center">
                공략 GO!
              </Link>
            </div>
            {/* tags */}
            <div className="flex">
              {tagInfo.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-2xl font-semibold text-gray-800 text-[2vw] tablet:text-[1.1vw] laptop:text-sm px-2.5 py-1 bg-moa-yellow-dark drop-shadow-lg text-center flex items-center mr-2">
                    {item}
                  </div>
                );
              })}
            </div>
            {gameDetail.genres.length > 2 ? <hr className="bg-white border-1 mt-2" /> : ""}
          </div>
          {/* description */}
          {gameDetail.description ? (
            <div className="px-2 py-1 tablet:px-3 tablet:py-2 laptop:px-5 laptop:py-3 tablet rounded opacity-90 bg-main-400 w-full">
              <p
                className="w-full text-white text-xs tablet:text-sm laptop:text-base text-justify leading-relaxed flex flex-col items-center
                          [&_img]:mx-auto [&_img]:mt-2 [&_img]:mb-4 [&_img]:w-per75 [&_h1]:text-xl"
                dangerouslySetInnerHTML={{ __html: gameDetail.description }}></p>
            </div>
          ) : (
            <div className="h-1"></div>
          )}
        </div>
        {/* 리뷰, 공략 */}
        <div className="w-full px-[2.5%]">
          {/* tab */}
          <div className="text-sm font-medium bg-indigo-200 text-center text-gray-500 border-b border-gray-300 rounded-t-lg">
            <ul className="flex flex-wrap -mb-px text-[1em] font-medium text-center text-gray-500">
              <li className="rounded-t-lg">
                <NavLink
                  to={`/gamemoa/detail/${gameId}`}
                  className={
                    !isTactic
                      ? `bg-white border-0 shadow-[0_-4px_0.25em_rgba(0,0,0,0.3)] text-gray-700 ${tabDesign}`
                      : `${tabDesign}`
                  }>
                  Review
                </NavLink>
              </li>
              <li className="rounded-t-lg">
                <NavLink
                  to={`/gamemoa/detail/${gameId}/tactic`}
                  className={({ isActive }) =>
                    isActive
                      ? `bg-white border-0 shadow-[0_-4px_0.25em_rgba(0,0,0,0.3)] text-gray-700 ${tabDesign}`
                      : `${tabDesign}`
                  }>
                  Tatic
                </NavLink>
              </li>
            </ul>
          </div>
          {/* list */}
          <div className="bg-white">
            <Routes>
              <Route exact={true} path="" element={<GameReviewList />} />
              <Route path="tactic" element={<GameTacticList />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetail;
