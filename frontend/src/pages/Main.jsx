import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import Banner from "../components/Main/Banner";
import MiniMoa from "../components/Main/MiniMoa";
import MiniGameMoa from "../components/Main/MiniGameMoa";
import MainGameSpread from "../components/Main/MainGameSpread";
import Footer from "../components/Footer";
import { getMainInfo } from "../api/Main";

const Main = () => {
  const [parties, setParties] = useState([]);
  const [bestGames, setBestGames] = useState([]);
  const [freeGames, setFreeGames] = useState([]);
  const [todayGames, setTodayGames] = useState([]);
  const [pickGames, setPickGames] = useState([]);
  const [hotGames, setHotGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  useEffect(() => {
    getMainInfo()
      .then((res) => {
        setParties([...res.data.parties]);
        setBestGames([...res.data.bests]);
        setFreeGames([...res.data.frees]);
        setTodayGames([...res.data.today]);
        setPickGames([...res.data.picks]);
        setHotGames([...res.data.hots]);
        setIsLoading(false)
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full tablet:w-per75 m-auto">
        {/* 배너 Carousel*/}
        <Banner />
        {/* 미니 모아 */}
        <MiniMoa parties={parties} isLoading={isLoading}/>
        {/* 게임존 */}
        <MiniGameMoa
          isLoading={isLoading}
          bests={bestGames}
          frees={freeGames}
          today={todayGames}
          hots={hotGames}
          picks={pickGames}
        />

        <MainGameSpread
          isLoading={isLoading}
          bests={bestGames}
          frees={freeGames}
          today={todayGames}
          hots={hotGames}
          picks={pickGames}
        />
      </div>
      <Footer></Footer>
    </>
  );
};

export default Main;
