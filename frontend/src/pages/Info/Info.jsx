import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Main from "../../components/Info/Main";
import PartyDetail from "../../components/Info/PartyDetail";
import PartyMain from "../../components/Info/PartyMain";
import Game from "../../components/Info/Game";
import Search from "../../components/Info/Search";
import Last from "../../components/Info/Last";
const Info = (props) => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="w-full h-full">
      <Main />
      <div data-aos="fade-up" data-aos-easing="linear" data-aos-duration="800">
        <PartyMain />
      </div>
      <div data-aos="fade-up" data-aos-easing="linear" data-aos-duration="800">
        <PartyDetail />
      </div>
      <div data-aos="fade-up" data-aos-easing="linear" data-aos-duration="800">
        <Game />
      </div>
      <div data-aos="fade-up" data-aos-easing="linear" data-aos-duration="800">
        <Search />
      </div>
      <div data-aos="fade-up" data-aos-easing="linear" data-aos-duration="800">
        <Last />
      </div>
    </div>
  );
};

export default Info;
