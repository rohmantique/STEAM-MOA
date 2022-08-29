import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";

const Sidebar = (props) => {
  const { isMobile, isMyPage, userProfile, followerList, followingList, tier, tierColor, showMobileSide, setShowMobileSide } = props;
  const profileName = userProfile.userServiceId;
  const param = useParams();
  const subParam = Object.values(param);
  const isMain = subParam.includes("");

  const midLocation = isMyPage ? "mypage" : "profile";
  const titleName = isMyPage ? "나의" : `${profileName}님의`;

  const menus = [
    {
      title: `Party`,
      submenus: [
        { name: `${titleName} 파티`, path: `/${midLocation}/${profileName}/myparty` },
        { name: "진행 파티", path: `/${midLocation}/${profileName}/curparty` },
        { name: "종료 파티", path: `/${midLocation}/${profileName}/pastparty` },
      ],
      icon: <FontAwesomeIcon icon={faChampagneGlasses} className="text-center" />,
    },
    {
      title: "Posting",
      submenus: [
        { name: "게임 리뷰", path: `/${midLocation}/${profileName}/myreview` },
        { name: "게임 공략", path: `/${midLocation}/${profileName}/mywalkthrough` },
      ],
      icon: <FontAwesomeIcon icon={faFileLines} className="text-center" />,
    },
  ];

  const closeSide = () => {
    if (showMobileSide&&isMobile){
      setShowMobileSide(false)
    }
  }


  const body = document.body,
  html = document.documentElement;

  const height =  (body) => Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

  return (
    <>
      <div className={(isMobile&&(showMobileSide) ? "h-full w-full absolute top-0 left-0 z-40 bg-black opacity-50":"")} onClick={closeSide}></div>
      <div className={`min-h-screen h-[${height(body)}px] bg-sidebar-light w-per25 min-w-[150px] tablet:min-w-[130px] max-w-[225px] ${(isMobile ? "absolute top-0 left-0 z-50"+(showMobileSide ? "": " hidden"):"")}`}>
        {/* 프로필 */}
        <NavLink
          onClick={closeSide}
          to={`/${midLocation}/${profileName}`}
          className={
            isMain
              ? `block py-5 px-[10%] bg-${tierColor.tierColor}-500 hover:cursor-pointer shadow-inner`
              : "block py-5 px-[10%] bg-sidebar-dark hover:cursor-pointer"
          }>
          <div className="flex justify-around items-center">
            <img
              src={`../../ImgAssets/Tier${tier}.png`}
              alt=""
              className="w-per20 min-w-[35px] drop-shadow-md"
            />
            <div className="flex flex-col justify-center">
              <span className="text-xs font-blackSans text-white">{profileName}</span>
              <div className="grid grid-cols-1 laptop:grid-cols-2 gap-1">
                <span className="text-white text-[10px]">{`팔로잉: ${followingList.length}`}</span>
                <span className="text-white text-[10px]">{`팔로워: ${followerList.length}`}</span>
              </div>
            </div>
          </div>
        </NavLink>
        {/* 메뉴 */}
        <div className="p-[10%]">
          {menus.map((menu, index) => {
            return (
              <div key={index} className="mb-8">
                <div className="flex text-base tablet:text-lg font-bold text-white">
                  <div className="mr-1.5">{menu.icon}</div>
                  <div className="">{menu.title}</div>
                </div>
                <hr className="text-gray-300 my-1" />
                <div className="text-sm tablet:text-base">
                  {menu.submenus.map((submenu, idx) => {
                    return (
                      <div key={idx} className="py-1">
                        <NavLink
                          onClick={closeSide}
                          className={({ isActive }) =>
                            isActive
                              ? `text-white flex justify-end px-2 font-bold ${tierColor.tierColorLight} rounded py-0.5`
                              : "text-gray-400 py-0.5"
                          }
                          to={submenu.path}>
                          {submenu.name}
                        </NavLink>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

};

export default Sidebar;
