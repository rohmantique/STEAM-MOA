import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MoaCard from "../MoaCard";
import "../../assets/neon.css";

const MiniMoa = (props) => {
  const { parties, isLoading } = props;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640 ? true : false);
  const [index, setIndex] = useState(0);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [index, isMobile]);

  const moaCarousel = (parties) => {
    if (parties.length >= 5) {
      return [...Array(5)].map((_, index) => {
        if (isMobile) {
          return (
            <div className="w-per100 overflow-hidden" key={index}>
              <MoaCard party={parties[index]} key={index}></MoaCard>
            </div>
          )
        } else if (parties.length >= 15) {
          return (
            <div className="w-full grid grid-cols-3 gap-1" key={index}>
              {[...Array(3)].map((_, idx) => {
                return <MoaCard party={parties[3 * index + idx]} key={3 * index + idx}></MoaCard>;
              })}
            </div>
          );
        }
      });
    } else {
      return "";
    }
  };

  return (
    <div className="mini-moa bg-miniMoa-dark rounded flex justify-center items-center my-9 tablet:mt-12">
      <div
        className="w-10 tablet:w-14 laptop:w-16 hover:cursor-pointer text-center"
        onClick={() => {
          if (index === 0) {
            setIndex(4);
          } else {
            setIndex(index - 1);
          }
        }}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-white mobile:text-xl tablet:text-2xl laptop:text-3xl"
        />
      </div>
      <div className="mini-moa-content flex flex-col justify-around items-center w-per80 tablet:w-per95">
        <div className="font-Sans font-semibold text-lg tablet:text-xl laptop:text-2xl my-3 tablet:my-6 miniMoa-neonText text-white">
          MOA PARTY
        </div>
        <div className="carousel-container w-full overflow-hidden mb-3 tablet:mb-6">
          <div
            className="carousel-items w-per500 flex ease-in duration-700"
            // translate3d() 메소드는 현재 위치에서 해당 요소를 주어진 x축과 y축, z축의 거리만큼 이동시킵니다.
            style={{ transform: `translate3d(${-index * 20}%,0,0)` }}>
            {isLoading? 
              (isMobile ? 
                <div className="bg-card-lightgray w-per20 h-[60vw] opacity-80">
                  <div className="bg-mainBtn-disabled w-full h-per60 animate-pulse"></div>
                  <div className="h-per40 w-full p-2.5 flex flex-col justify-between">
                    <div className="h-per40 w-per30 animate-pulse bg-mainBtn-disabled rounded"></div>
                    <div className="h-per40 w-full animate-pulse bg-mainBtn-disabled rounded"></div>
                  </div>
                </div>
                : 
                <div className="w-per20 grid grid-cols-3 gap-1">
                  {[...Array(3)].map((_, idx) => {
                    return (
                      <div className="bg-card-lightgray w-full h-[18vw] max-h-[250px]" key={idx}>
                        <div className="bg-mainBtn-disabled w-full h-per60 animate-pulse"></div>
                        <div className="h-per40 w-full p-2.5 flex flex-col justify-between">
                          <div className="h-per40 w-per40 animate-pulse bg-mainBtn-disabled rounded"></div>
                          <div className="h-per40 w-full animate-pulse bg-mainBtn-disabled rounded"></div>
                        </div>
                      </div>
                    )
                  })}
                </div>)

              :
              moaCarousel(parties)
            }  
          </div>
          <div className="slideshowDots flex justify-center mt-2">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className={
                  index === idx
                    ? " rounded-full w-1.5 h-1.5 bg-gray-500 mx-1"
                    : "rounded-full w-1.5 h-1.5 bg-white mx-1"
                }
                onClick={() => {
                  setIndex(idx);
                }}></div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="w-10 tablet:w-14 laptop:w-16 hover:cursor-pointer text-center"
        onClick={() => {
          if (index === 4) {
            setIndex(0);
          } else {
            setIndex(index + 1);
          }
        }}>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-white mobile:text-xl tablet:text-2xl laptop:text-3xl"
        />
      </div>
    </div>
  );
};

export default MiniMoa;
