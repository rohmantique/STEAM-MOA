/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'mobile':'320px',
        // => @media (min-width: 320px) { ... }
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
      },
      fontFamily: {
        sans: ["Noto Sans"],
        blackSans: ["Black Han Sans"],
        neon: ["neon"],
        neonSans: ["Neon Sans"],
        //font-sans
      },
      minWidth:{
        '90':'90px',
        '144':'144px'
      },
      maxWidth:{
        '144':'144px'
      },
      minWidth:{
        '90':'90px',
        '144':'144px'
      },
      maxWidth:{
        '144':'144px'
      },
      width:{
        'per5':'5%',
        'per10':'10%',
        'per15':'15%',
        'per20':'20%',
        'per25':'25%',
        'per30':'30%',
        'per35':'35%',
        'per40':'40%',
        'per45':'45%',
        'per50':'50%',
        'per55':'55%',
        'per60':'60%',
        'per65':'65%',
        'per70':'70%',
        'per75':'75%',
        'per80':'80%',
        'per85':'85%',
        'per90':'90%',
        'per95':'95%',
        'per100':'100%',
        'per105':'105%',
        'per110':'110%',
        'per115':'115%',
        'per120':'120%',
        'per500':'500%'
      },
      height: {
        per5: "5%",
        per10: "10%",
        per15: "15%",
        per20: "20%",
        per25: "25%",
        per30: "30%",
        per35: "35%",
        per40: "40%",
        per45: "45%",
        per50: "50%",
        per55: "55%",
        per60: "60%",
        per65: "65%",
        per70: "70%",
        per75: "75%",
        per80: "80%",
        per85: "85%",
        per90: "90%",
        per95: "95%",
        per100: "100%",
        per105: "105%",
        per110: "110%",
        per115: "115%",
        per120: "120%",
      },
      colors: {
        // main colors
        "main-100": "#C9DFEF",
        "main-200": "#94B3CC",
        "main-300": "#415671",
        "main-400": "#202B3C",
        "main-500": "#141F31", // html&&body 배경색

        // point colors
        "moa-pink": "#FA448C",
        "moa-pink-light": "#F372A5",
        "moa-pink-dark": "#C22A66",
        "moa-yellow": "#FEC859",
        "moa-yellow-light": "#FFD784",
        "moa-yellow-dark": "#ECAE2F",
        "moa-green": "#43B5A0",
        "moa-green-light": "#73BDAF",
        "moa-green-dark": "#399685",
        "moa-purple": "#8D38D0",
        "moa-purple-light": "#A366D2",
        "moa-purple-dark": "#68279B",
        "moa-blue":"#4461FA",
        "moa-blue-dark":"#2A39C2",


        // component colors : 미묘한 차이...
        'centerDiv-blue':'#455166', // 가운데 80% 색상 들어가는 경우
        'sidebar-dark':'#1A2535', // 마이페이지 사이드바 상단 프로필 배경
        'sidebar-light':'#293953', // 마이페이지 사이드바
        'miniMoa-dark':'#1B2637', // 메인페이지 미니모아 배경
        'searchbar-gray':'#A1A7B4', // 각종 서치바, 정렬바
        'mainBtn-blue':'#788DB1', // 일반적인 버튼 색
        'mainBtn-blue-hover':'#5C6D8A',
        'mainBtn-disabled':'#A9ACB1',
        'createInput-gray':'#E7E7E7', // 글쓰기 input
        'card-lightgray':'#D9D9D9', // 모아카드 배경색
        'detailContent-light':'#EFEDED', // 상세페이지 디테일 컨텐츠 등...

        // gradient
        "bg-search-gradient-from": "#415570",
        "bg-search-gradient-via": "#263850",
        "bg-search-gradient-to": "#263850",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
