import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style.css";

const Banner = () => {
  const navigate = useNavigate();
  const banners = [
    { img: "../../ImgAssets/Main-banner-1.png", path: "/moazone" },
    { img: "../../ImgAssets/Main-banner-2.png", path: "/moazone?page=1&word=Goose Goose Duck" },
    { img: "../../ImgAssets/Main-banner-3.png", path: "/gamemoa/detail/22517" },
  ];
  const delay = 7000;
  // carousel index
  const [index, setIndex] = useState(0);
  // 자동 시간 설정
  const timeoutRef = useRef(null);

  // 시간 카운팅
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    // setTimeout => 일정 시간 이후 함수 실행
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="carousel-container w-full overflow-hidden h-auto relative">
      <div
        className="carousel-items w-full flex ease-in duration-700"
        // translate3d() 메소드는 현재 위치에서 해당 요소를 주어진 x축과 y축, z축의 거리만큼 이동시킵니다.
        style={{ transform: `translate3d(${-index * 100}%,0,0)` }}>
        {banners.map((banner, index) => (
          <img
            src={banner.img}
            alt="bannerImg"
            className="w-full hover:cursor-pointer"
            key={index}
            onClick={() => navigate(`${banner.path}`)}
          />
        ))}
      </div>
      <div className="slideshowDots flex items-center justify-center mt-2 absolute-carousel">
        {banners.map((_, idx) => (
          <div
            key={idx}
            className={
              index === idx
                ? " rounded-full w-1 h-1 tablet:w-1.5 tablet:h-1.5 laptop:w-2 laptop:h-2 bg-moa-pink-dark mx-1 tablet:mx-1.5"
                : "rounded-full w-1 h-1 tablet:w-1.5 tablet:h-1.5 laptop:w-2 laptop:h-2 bg-white mx-1 tablet:mx-1.5"
            }
            onClick={() => {
              setIndex(idx);
            }}></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
