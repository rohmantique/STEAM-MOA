import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GameSearchContainer from "../../components/Game/GameSearchContainer";
import GameList from "../../components/Game/GameList";
import GamePagination from "../../components/Game/GamePagination";
import { getGamesSearch } from "../../api/Game";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { gameMaxPage, gameSearchFilter } from "../../recoil/Game";
import { useSearchParams } from "react-router-dom";

import '../../assets/mainNeon.css'

const GameMoa = () => {
  const [gameList, setGameList] = useState([]);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(decodeURIComponent(searchParams.get("page")))
    : 1;
  const keyword = searchParams.get("word") ? decodeURIComponent(searchParams.get("word")) : "";
  const searchFilter = useRecoilValue(gameSearchFilter);
  const setMaxPage = useSetRecoilState(gameMaxPage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  useEffect(async () => {
    try {
      setLoading(true);
      await getGamesSearch(page, searchFilter, keyword)
        .then(({ data }) => {
          setGameList([...data.data]);
          setMaxPage(parseInt(data.maxPage));
          setLoading(false);
        })
        .catch();
    } catch {
      setLoading(false);
    }
  }, [page, keyword, searchFilter]);

  return (
    <div className="w-full h-screen">
      <Navbar />
      {/* 게임모아 배너 이미지 */}
      <div className="w-full tablet:w-per75 m-auto bg-[#1E1B1C] laptop:h-[10em] h-[8em] flex items-center">
        <img src="../ImgAssets/GameMoa_Main.gif" alt="게임모아 메인 배너" className="laptop:object-none object-none w-full h-full"/>
      </div>
      {/* 검색 컨테이너 */}
      <GameSearchContainer />
      {/* 게임 리스트 */}
      <div className="w-per95 tablet:w-per75 m-auto">
        <GameList gameList={gameList} isLoading={loading} />
      </div>

      {/* 페이지네이션 */}
      <div className="w-per95 tablet:w-per75 m-auto flex justify-center py-5">
        <GamePagination />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default GameMoa;
