import React, {useEffect} from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import NavbarLoginOptions from "./NavbarLoginOptions";
import "../assets/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640 ? true:false)
  const [showSearchModal, setShowSearchModal] = useState(false)

  const body = document.querySelector('body')

  
  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
      setShowSearchModal(false)
    }
  }
  useEffect(()=>{
    window.addEventListener("resize", handleResize)
  }, 
  [isMobile]
  )

  const activeClass =
    "text-white border-b-2 border-main-100 text-xs laptop:text-base tablet:text-sm mobile:text-sm font-blackSans mx-4 block min-w-10 text-center";
  const inactiveClass =
    "text-gray-300 text-xs laptop:text-base tablet:text-sm mobile:text-sm font-blackSans mx-4 block min-w-10 text-center";
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
      setSearch("");
    }
  };

  const onSearch = () => {
    if (search.startsWith("@")) {
      if (search.length-1 < 3) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: '아이디는 3글자 이상 입력해주세요. &#128521',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        setShowSearchModal(false)
        navigate(`/search/user?word=${encodeURIComponent(search)}`);
      }
    } else {
      if (search.length < 2) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: '게임명은 2글자 이상 입력해주세요. &#128521',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        setShowSearchModal(false)
        navigate(`/search/game?word=${encodeURIComponent(search)}`);
      }
    }
  };

  const onShowSearchModal = () => {
    setShowSearchModal(true)
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
  }

  const onCloseSearchModal = () => {
    setShowSearchModal(false)
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
  }

  return (
    <div className="nav-container w-full nav-grad">
      {/* 내부 2칸 */}
      <div className="w-per95 tablet:w-per75 mx-auto">
        <div className="h-9 flex justify-between items-center">
          {/* 로고 */}
          <Link to="/" className="w-per15 min-w-90 max-w-144">
            <img
              src="../../ImgAssets/TypoIconLogo.png"
              alt="Logo"
              className="w-full mt-1.5"
            />
          </Link>
          <div className="flex items-end h-3/5">
            <NavbarLoginOptions />
          </div>
        </div>
        <div className="h-10 flex justify-between items-center">
          <div className="flex">
            <NavLink
              exact="true"
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              홈
            </NavLink>
            <NavLink
              to="/moazone"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              모아존
            </NavLink>
            <NavLink
              to="/gamemoa"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              게임 모아
            </NavLink>
          </div>
          {(!isMobile ? 
              <div className="h-per70 w-per35 max-w-[250px]">
              {/* 검색바 */}
              <div className="flex items-center p-1 w-full text-gray-900 bg-gray-400 rounded-lg border border-gray-500 sm:text-xs focus:ring-slate-500 focus:border-slate-500 h-full">
                <input
                  type="text"
                  id="small-input"
                  value={search}
                  placeholder="@사용자 혹은 게임을 검색하세요"
                  onChange={onChangeSearch}
                  onKeyPress={onKeyPress}
                  className="w-full h-5/6 text-gray-900 bg-gray-400 rounded-sm border-0 focus:border-none text-xs focus:border-slate-500border-transparent focus:border-transparent focus:ring-0"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="h-5/6 hover:cursor-pointer text-white mr-1"
                  onClick={onSearch}
                />
              </div>
            </div>
           :
           (showSearchModal ? 
            <FontAwesomeIcon
            icon={faXmark}
            className="h-per35 hover:cursor-pointer font-bold text-white mr-2"
            onClick={onCloseSearchModal}
            />
            :
            <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="h-per35 hover:cursor-pointer text-white mr-2"
            onClick={onShowSearchModal}
            />
           )
           
           )}

        </div>
      </div>

            {/*follower modal */}
        <div id="follower-modal" className={`${(showSearchModal ? "bg-black bg-opacity-[45%]":"hidden")} overflow-y-hidden overflow-x-hidden fixed top-[76px] right-0 left-0 z-50 w-full h-modal`}>
        <div className="relative w-full h-full md:h-auto mx-auto">
          {/* <!-- Modal content --> */}
          <div className="relative top-0 right-0 left-0 nav-grad shadow w-full">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center p-3 rounded-t">
              <div className="h-per70 w-full">
                {/* 검색바 */}
                <div className="flex items-center p-1 w-full text-gray-900 bg-gray-400 rounded-lg border border-gray-500 sm:text-xs focus:ring-slate-500 focus:border-slate-500 h-full">
                  <input
                    type="text"
                    id="small-input"
                    value={search}
                    placeholder="@사용자 혹은 게임을 검색하세요"
                    onChange={onChangeSearch}
                    onKeyPress={onKeyPress}
                    className="w-full h-5/6 text-gray-900 bg-gray-400 rounded-sm border-0 focus:border-none text-xs focus:border-slate-500border-transparent focus:border-transparent focus:ring-0"
                  />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="w-4 h-4 hover:cursor-pointer text-white mr-1"
                    onClick={onSearch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
