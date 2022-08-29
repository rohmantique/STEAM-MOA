import React, { useEffect, useState } from "react";
import { range } from "lodash";
import MiniPagination from "../MiniPagination";
import { Link, useParams } from "react-router-dom";
import GameTacticListItem from "../Game/GameTacticListItem";
import { getTacticUser } from "../../api/Tactic";

const ProfileMyWalk = (props) => {
  const params = useParams;
  const { profileName, isMyPage } = props;
  const [render, setRender] = useState(1);
  const [contentList, setContentList] = useState([]);
  const [page, setPage] = useState(1);
  const [contentCnt, setContentCnt] = useState(0);
  const [totPage, setTotPage] = useState(0);
  const [viewablePages, setViewablePages] = useState([]);
  const reviewsPerPage = 6;
  const [showContents, setShowContents] = useState([]);
  const [rerender, setRerender] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const titleText = isMyPage ? "MY" : `${profileName}'s`;

  useEffect(() => {
    getTacticUser(profileName)
      .then((res) => {
        if (res.data.status === 406) {
          setContentList([]);
          setIsLoading(false);
        } else {
          setContentList(res.data);
          setRender((render) => render + 1);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setContentList([]);
        setIsLoading(false);
        setRender((render) => render + 1);
      });
  }, [isMyPage, params, rerender]);

  useEffect(() => {
    setContentCnt(contentList.length);
    setTotPage(Math.ceil(contentCnt / reviewsPerPage));
    setViewablePages(contentList.length ? [...range(1, Math.min(totPage, 5) + 1)] : []);
  }, [contentList, contentCnt, totPage]);

  useEffect(() => {
    const tmp = contentList.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);
    setShowContents(tmp);
  }, [page, contentList, rerender]);

  return isLoading ? (
    <div className="my-20 flex flex-col justify-center items-center p-24">
      <div className="dots-bars-3"></div>
    </div>
  ) : (
    <div className="my-10 flex flex-col justify-center">
      {!contentList.length ? (
        <div className="w-per90 flex flex-col justify-center drop-shadow-lg py-24 mt-2 rounded-lg text-center bg-sidebar-dark mx-auto text-white font-semibold">
          <div className="mb-2">작성한 공략이 없습니다.</div>
          {isMyPage ? (
            <div>
              지금 공략 작성하러{" "}
              <Link to={"/gamemoa"} className="text-moa-yellow font-bold text-lg">
                출발!
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        // 컨텐츠
        <>
          <div className="text-center text-2xl text-white font-blackSans">{titleText} Tactic</div>
          <div className="w-per90 mx-auto drop-shadow-lg rounded-lg py-7 px-5 bg-sidebar-dark my-5">
            <div className="my-2">
              {showContents.map((tactic, index) => {
                return <GameTacticListItem profile={true} tactic={tactic} key={index} />;
              })}
            </div>
          </div>
          {contentList.length ? (
            <div className="flex justify-center">
              <MiniPagination
                totPage={totPage}
                page={page}
                viewablePages={viewablePages}
                setPage={setPage}
                setViewablePages={setViewablePages}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileMyWalk;
