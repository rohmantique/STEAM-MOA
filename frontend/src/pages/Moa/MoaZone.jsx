import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MoaSearchContainer from "../../components/Moa/MoaSearchContainer";
import MoaCardList from "../../components/MoaCardList";
import MoaPagination from "../../components/Moa/MoaPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";
import { getMoaListSearch } from "../../api/Moazone";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { moaMaxPage, moaSearchFilter } from "../../recoil/Moazone";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../recoil/Auth";
import Swal from "sweetalert2";

function MoaZone() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [moaList, setMoaList] = useState([]);
  const page = searchParams.get("page") ? parseInt(decodeURIComponent(searchParams.get("page"))) : 1;
  const keyword = searchParams.get("word") ? decodeURIComponent(searchParams.get("word")) : "";
  const sort = searchParams.get("sort") ? decodeURIComponent(searchParams.get("sort")) : "";
  const setMaxPage = useSetRecoilState(moaMaxPage);
  const searchFilter = useRecoilValue(moaSearchFilter);
  const [loading, setLoading] = useState(true);


  const user = useRecoilValue(auth);
  const user_id = user.userId;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  useEffect(() => {
    getMoaListSearch(page, sort, keyword, searchFilter)
      .then(({ data }) => {
        setMoaList([...data.data]);
        setMaxPage(parseInt(data.maxPage));
        setLoading(false);
      })
      .catch();
  }, [page, sort, keyword, searchFilter]);

  const handleNavigate = () => {
    if (user_id) {
      navigate(`/moazone/create`);
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "로그인이 필요한 서비스입니다. &#128521;",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      {/* 모아존 배너 */}
      <div className="w-perfull tablet:w-per75 m-auto bg-[#1E1B1C] laptop:h-[10em] h-[8em] flex items-center">
        <img src="../ImgAssets/MoaZone_Main.gif" alt="게임모아 메인 배너" className="laptop:object-none object-none w-full h-full"/>
      </div>
      {/* 검색 컨테이너 */}
      <MoaSearchContainer />
      {/* 모아 만들기 버튼 */}
      <div className="w-per95 tablet:w-per75 mx-auto tablet:my-3 my-1.5 flex justify-end">
        <button
          className=" bg-moa-pink hover:bg-moa-pink-dark text-white rounded-lg px-2 py-1 text-xs"
          onClick={handleNavigate}>
          <FontAwesomeIcon icon={faChampagneGlasses} className="mr-1" />
          파티 만들기
        </button>
      </div>
      {/* 모아 리스트 */}
      <div className="w-per95 tablet:w-per75 m-auto">
        <MoaCardList parties={moaList} isLoading={loading}></MoaCardList>
      </div>
      {/* 페이지네이션 */}
      <div className="w-per75 m-auto flex justify-center py-5">
        <MoaPagination />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MoaZone;