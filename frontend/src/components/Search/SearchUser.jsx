import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchLists } from "../../api/Search";
import MiniPagination from "../MiniPagination";
import ProfileSearchUser from "../Profile/ProfileSearchUser";
import { range } from "lodash";

const SearchUser = (props) => {
  const [searchParams] = useSearchParams();
  const keyword = decodeURIComponent(searchParams.get("word"));

  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [contentCnt, setContentCnt] = useState(0);
  const [totPage, setTotPage] = useState(1);
  const [viewablePages, setViewablePages] = useState([]);
  const reviewsPerPage = 5;
  const [showContents, setShowContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640 ? true : false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [isMobile]);

  useEffect(async () => {
    try {
      setLoading(true);
      getSearchLists("user", keyword.startsWith('@') ? keyword.slice(1, keyword.length) : (keyword))
        .then(({ data }) => {
          const { users } = data;
          setUserList([...users]);
          setLoading(false);
        })
        .catch();
    } catch {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    setContentCnt(userList.length);
    setTotPage(Math.ceil(contentCnt / reviewsPerPage));
    setViewablePages(userList.length ? [...range(1, Math.min(totPage, 5) + 1)] : []);
  }, [userList, contentCnt, totPage]);

  useEffect(() => {
    const tmp = userList.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);
    setShowContents(tmp);
  }, [page, userList]);

  return (
    <div className="laptop:w-per50 tablet:w-per75 w-per90 mx-auto">
      <div className="w-full py-7">
        <div className="w-full flex flex-row justify-between items-end text-white mb-2">
          <span className="font-blackSans text-3xl text-moa-purple">유저모아</span>
        </div>
        {loading ? (
          <div className="w-full laptop:h-[27vw] tablet:h-[41vh] mobile:h-[52vh] bg-card-lightgray rounded-lg"></div>
        ) : showContents.length ? (
          <div className="w-full grid grid-cols-1 gap-3">
            {showContents.map((user) => (
              <ProfileSearchUser key={user.userId} user={user} isMobile={ isMobile } />
            ))}
          </div>
        ) : (
          <div className="text-center bg-main-400 p-2 rounded text-white">
            해당 유저가 없습니다.
          </div>
        )}

        <div className="flex flex-row justify-center text-white mt-3">
          {userList.length ? (
            <MiniPagination
              totPage={totPage}
              page={page}
              viewablePages={viewablePages}
              setPage={setPage}
              setViewablePages={setViewablePages}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchUser;
