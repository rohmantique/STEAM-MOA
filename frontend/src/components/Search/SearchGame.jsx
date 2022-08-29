import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getSearchLists } from "../../api/Search";
import GameCard from "../Game/GameCard";
import MoaCard from "../MoaCard";
import TacticSearchCard from "../TacticSearchCard";

const SearchGame = (props) => {
  const [searchParams] = useSearchParams();
  const keyword = decodeURIComponent(searchParams.get("word"));

  const [gameList, setGameList] = useState([]);
  const [moaList, setMoaList] = useState([]);
  const [tacticList, setTacticList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      setLoading(true);
      await getSearchLists("content", keyword)
        .then(({ data }) => {
          const { parties, games, tactics } = data.contents;
          setMoaList([...parties]);
          setGameList([...games]);
          setTacticList([...tactics]);
          setLoading(false);
        })
        .catch();
    } catch {
      setLoading(false);
    }
  }, [keyword]);

  return (
    <div className="w-per90 tablet:w-per75 mx-auto">
      {/* 파티모아 */}
      <div className="w-full pt-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-yellow">파티모아</span>
          {moaList.length ? (
            <Link
              className="text-white text-[10px] tablet:text-xs font-semibold hover:cursor-pointer hover:font-bold"
              to={`/moazone?page=${encodeURIComponent("1")}&word=${encodeURIComponent(keyword)}`}>
              More+
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="w-full rounded bg-main-400">
          {loading ? (
            <div className="w-full grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-2">
              {[...Array(8)].map((v, index) => (
                <div key={index} className="w-full laptop:h-[15.4vw] tablet:h-[22vw] mobile:h-[51.8vw]  bg-card-lightgray"></div>
              ))}
            </div>
          ) : moaList.length ? (
            <div className="w-full grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-2">
              {moaList.map((party) => (
                <MoaCard key={party.partyId} party={party} />
              ))}
            </div>
          ) : (
            <div className=" flex flex-col justify-center items-center text-white text-lg p-5">
              <span>
                <strong className="text-moa-yellow-dark">첫 번째</strong> 파티 개설자가 될
                기회입니다 <span>&#127881;</span>
              </span>
              <Link
                to="/moazone/create"
                className=" w-fit bg-moa-yellow hover:bg-moa-yellow-dark text-white text-sm rounded-md p-2 mt-1">
                파티 만들기
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 게임모아 */}
      <div className="w-full pt-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-pink">게임모아</span>

          {gameList.length ? (
            <Link
              className="text-white text-[10px] tablet:text-xs font-semibold hover:cursor-pointer hover:font-bold"
              to={`/gamemoa?page=${encodeURIComponent("1")}&word=${encodeURIComponent(keyword)}`}>
              More+
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="w-full rounded bg-main-400">
          {loading ? (
            <div className="w-full grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-2">
              {[...Array(4)].map((v, index) => (
                <div key={index} className="w-full laptop:h-[12.7vw] tablet:h-[17.8vw] mobile:h-[48.5vw] bg-card-lightgray"></div>
              ))}
            </div>
          ) : gameList.length ? (
            <div className="w-full grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-2">
              {gameList.map((game) => (
                <GameCard key={game.gameId} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-white text-center text-lg p-5">
              해당하는 <strong className="text-moa-pink-dark">게임</strong>이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 공략모아 */}
      <div className="w-full py-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-green">공략모아</span>
        </div>
        <div className="w-full rounded bg-main-400">
          {loading ? (
            <div className="w-full grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-2">
              {[...Array(8)].map((v, index) => (
                <div key={index} className="w-full laptop:h-[14vw] tablet:h-[20vw] mobile:h-[50vw] bg-card-lightgray"></div>
              ))}
            </div>
          ) : tacticList.length ? (
            <div className="w-full grid laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-2">
              {tacticList.map((tactic) => (
                <TacticSearchCard key={tactic.tacticId} tactic={tactic} />
              ))}
            </div>
          ) : (
            <div className=" flex flex-col justify-center items-center text-white text-lg p-5">
              <span>
                <strong className="text-moa-green-dark">첫 번째</strong> 공략러가 될 기회입니다{" "}
                <span>&#127881;</span>
              </span>
              <Link
                to="/tactic/create"
                className=" w-fit bg-moa-green hover:bg-moa-green-dark text-white text-sm rounded-md p-2 mt-1">
                공략글 쓰러 가기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchGame;
