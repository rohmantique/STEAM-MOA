import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";


const Footer = () => {
  return (
    <div className='w-'>
      <hr className="w-per95 tablet:w-per75 mx-auto mt-[2.5em] border-mainBtn-disabled opacity-50"/>
      <div className='h-20 w-per95 tablet:w-per75 mx-auto'>
        <img src="../../ImgAssets/TypoLogo_white.png" alt="" className='w-[7em] my-[2.1em] opacity-90'/>
        <div className='text-white text-[0.8em] opacity-80'>
        <div>대표: 김다은 김연준 노희진 박남주 이지현</div>
        <div>주소: 서울특별시 강남구 테헤란로 212 멀티캠퍼스</div>      
        <div>사업자 등록번호: 000-00-00000</div>
        <br />
        <div className='flex justify-between items-center mb-[0.8em]'>
          <div>
            <div>고객센터: oursteammoa@gmail.com</div>
            <div>광고문의: oursteammoa@gmail.com</div>
          </div>
          <div className='w-[7.5em] flex justify-around'>
            <a href="mailto:oursteammoa@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} className='h-[1.5em] text-white hover:curor-pointer' />
            </a>
            <a href="https://www.instagram.com/steam_moa/">
              <FontAwesomeIcon icon={faInstagram} className='w-[1.5em] h-[1.5em] text-white hover:curor-pointer' />
            </a>
            <a href="">
              <FontAwesomeIcon icon={faYoutube} className='h-[1.5em] text-white hover:curor-pointer' />
            </a>
          </div>
        </div>
        <div className='text-[1.1em] flex justify-end'>STEAMMOA © 2022 by A303, Inc. All rights reserved.</div>
        </div>
      <div className='h-[2.5em]'></div>
      </div>
    </div>
  )
}

export default Footer