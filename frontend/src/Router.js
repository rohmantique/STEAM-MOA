import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import SignUp from "./pages/Login/Signup";
import SignupForm from "./pages/Login/SignupForm";
import Login from "./pages/Login/Login";
import MoaZone from "./pages/Moa/MoaZone";
import MoaDetail from "./pages/Moa/MoaDetail";
import MoaCreate from "./pages/Moa/MoaCreate";
import MoaUpdate from "./pages/Moa/MoaUpdate";
import GameMoa from "./pages/Game/GameMoa";
import GameDetail from "./pages/Game/GameDetail";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import TacticDetail from "./pages/Tactic/TacticDetail";
import TacticCreate from "./pages/Tactic/TacticCreate";
import TacticUpdate from "./pages/Tactic/TacticUpdate";
import VideoChatWrapper from "./pages/VideoChat/VideoChatWrapper";
import Info from "./pages/Info/Info";

function Router() {
  return (
    <Routes>
      {/* 메인 */}
      <Route path="/" element={<Main />} />
      {/* 로그인 */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signupform" element={<SignupForm />} />
      <Route path="/login" element={<Login />} />
      {/* 모아존 */}
      <Route path="/moazone" element={<MoaZone />} />
      <Route path="/moazone/detail/:party_id" element={<MoaDetail />} />
      <Route path="/moazone/create" element={<MoaCreate />} />
      <Route path="/moazone/update/:party_id" element={<MoaUpdate />} />
      {/* 게임모아 */}
      <Route path="/gamemoa" element={<GameMoa />} />
      <Route path="/gamemoa/detail/:game_id/*" element={<GameDetail />} />
      {/* 공략글 */}
      <Route path="/tactic/detail/:tactic_id" element={<TacticDetail/>} />
      <Route path="/tactic/create" element={<TacticCreate/>} />
      <Route path="/tactic/update/:tactic_id" element={<TacticUpdate/>} />
      {/* 프로필 */}
      <Route path="/profile/:user_id/*" element={<Profile />} />
      <Route path="/mypage/:user_id/*" element={<Profile />} />
      {/* 통합검색 */}
      <Route path="/search/*" element={<Search />} />
      <Route path="*" element={<NotFound />} />
      {/* openvidu */}
      <Route path="/chat/:chat_id" element={<VideoChatWrapper />} />
      {/* 설명 */}
      <Route path="/info" element={ <Info/> } />
    </Routes>
  );
}

export default Router;
