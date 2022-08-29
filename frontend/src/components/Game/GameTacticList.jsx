import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTacticGame } from "../../api/Tactic";
import MiniPagination from "../MiniPagination";
import GameTacticListItem from "./GameTacticListItem";
import { range } from "lodash";

const GameTacticList = (props) => {
  const params = useParams();
  const gameId = params.game_id;

  const [contentList, setContentList] = useState([]);
  const [page, setPage] = useState(1);
  const [contentCnt, setContentCnt] = useState(0);
  const [totPage, setTotPage] = useState(0);
  const [viewablePages, setViewablePages] = useState([]);
  const reviewsPerPage = 4;
  const [showContents, setShowContents] = useState([]);

  useEffect(() => {
    getTacticGame(gameId)
      .then(({ data }) => {
        setContentList([...data]);
      })
      .catch();
  }, [gameId]);

  useEffect(() => {
    setContentCnt(contentList.length);
    setTotPage(Math.ceil(contentCnt / reviewsPerPage));
    setViewablePages(contentList.length ? [...range(1, Math.min(totPage, 5) + 1)] : []);
  }, [contentList, gameId, contentCnt, totPage]);

  useEffect(() => {
    const tmp = contentList.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);
    setShowContents(tmp);
  }, [page, contentList]);

  return (
    <div className="p-4">
      {contentList && contentList.length ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-2">
            {showContents.map((tactic) => (
              <GameTacticListItem key={tactic.tacticId} tactic={tactic} />
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <MiniPagination
              totPage={totPage}
              page={page}
              viewablePages={viewablePages}
              setPage={setPage}
              setViewablePages={setViewablePages}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-lg p-5">
          <span>
            <strong className="text-moa-purple">첫 번째</strong> 공략러가 될 기회입니다{" "}
            <span>&#128521;</span>
          </span>
          <Link
            to={`/tactic/create?game=${gameId}`}
            className="bg-moa-purple hover:bg-moa-purple-dark text-white text-sm rounded-md p-2">
            공략글 작성
          </Link>
        </div>
      )}
    </div>
  );
};

export default GameTacticList;
