import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { moaCreate } from "../../api/Moazone";
import Swal from "sweetalert2";
import { auth } from "../../recoil/Auth";
import { useRecoilState } from "recoil";
import GameSearchModal from "../../components/GameSearchModal/GameSearchModal";
import { getGame } from "../../api/Game";

function MoaCreate() {
  const user = useRecoilState(auth);
  const userId = user[0].userId;
  const [game, setGame] = useState({});
  const [modalHidden, setModalHidden] = useState(true);
  const [isFiexedGame, setIsFixedGame] = useState(false);

  const [moa, setMoa] = useState({
    chatLink: "",
    gameId: "",
    maxPlayer: "",
    partyDescription: "",
    partyTags: [],
    partyTitle: "",
    startTime: new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .replace(/\..*/, "")
      .substring(0, 16),
    userId: userId,
  });

  const date = new Date(+new Date() + 3240 * 10000).toISOString().replace(/\..*/, "");
  const realDate = date.substring(0, 16);

  // 파티 태그 요소 하드 코딩
  const [searchParams] = useSearchParams();
  const game_id = searchParams.get("game") ? searchParams.get("game") : null;

  const items = ["즐겜", "빡겜", "공략겜", "무지성겜", "친목겜"];

  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState([]);

  const onCheckedElement = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      let newChk = [...checkedList];
      newChk.push(value);
      setCheckedList(newChk);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== value));
    }
  };

  const onRemove = (item) => {
    setCheckedList(checkedList.filter((el) => el !== item));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  useEffect(() => {
    if (!userId) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "로그인이 필요한 서비스 입니다. &#128521",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/login`);
    }
    if (game_id) {
      getGame(game_id)
        .then(({ data }) => {
          if (!data) return;
          const { name, imgpath } = data;
          setGame({
            userServiceId: userId,
            gameId: game_id,
            gameName: name,
            gameImgPath: imgpath,
          });
          setIsFixedGame(true);
        })
        .catch(() => {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "해당 게임을 불러올 수 없습니다. &#128521",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(-1);
        });
    }
  }, []);

  useEffect(() => {
    setMoa({
      ...moa,
      partyTags: checkedList,
    });
  }, [checkedList]);

  // 데이터 변경사항 저장
  const onChange = (event) => {
    let { name, value } = event.target;
    if (name === "maxPlayer") value = Number(value);
    setMoa({
      ...moa,
      [name]: value,
    });
  };

  // 데이터 보내기
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      moa.gameId ||
      !moa.maxPlayer ||
      !moa.partyDescription ||
      !moa.partyTags ||
      !moa.partyTitle ||
      !moa.startTime ||
      !moa.userId
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "모든 칸을 입력해주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    moaCreate({
      ...moa,
      gameId: game.gameId,
    })
      .then((data) => {
        if (data.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "모아글 업로드 성공!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/moazone");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "모아글 업로드 실패...",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch();
  };

  const handleCancel = () => {
    Swal.fire({
      title: "정말로 나가시겠어요?",
      text: "지금까지 작성한 내용은 저장되지 않습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "나갈래요",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/moazone`);
      }
    });
  };

  const onToggleModal = () => {
    setModalHidden(!modalHidden);
  };

  return (
    <>
      <Navbar />
      <div className="w-full tablet:w-per75 mx-auto min-h-full text-white font-sans">
      <div className="w-full bg-[#1E1B1C] laptop:h-[10em] h-[8em] flex items-center">
        <img src="../../ImgAssets/MoaZone_CreateVer.gif" alt="게임모아 메인 배너" className="laptop:object-none object-none w-full h-full"/>
      </div>
        <div className="w-full h-[1.5em] mb-2 bg-main-300 text-main-300 bg-gradient-to-b from-bg-search-gradient-from via-bg-search-gradient-via to-bg-search-gradient-to "></div>
        <div className="m-auto h-full mb-2 bg-main-400">
          <div className="createContainer p-4">
            <div className="font-blackSans text-[1.2em] mb-[0.6em] ">모아글 작성</div>
            <div className="flex">
              <input
                name="partyTitle"
                value={moa.partyTitle}
                onChange={onChange}
                className="w-full text-main-500 text-[0.9em] bg-createInput-gray rounded mb-[0.6em]"
                type="text"
                placeholder="파티 모집 제목을 입력해주세요."
              />
            </div>
            {/* 게임 아이디 찾기 */}
            <div className="mb-[0.6em] grid grid-cols-7 gap-2">
              <div className="flex laptop:col-span-6 tablet:col-span-5 col-span-5">
                {game.gameId ? (
                  <div className="w-full max-h-10 border-solid border-stone-700 bg-createInput-gray rounded flex p-1">
                    <img
                      src={game.gameImgPath}
                      alt="게임 이미지"
                      className="laptop:w-per10 tablet:w-per30 w-per50 rounded"
                    />
                    <span className="laptop:w-per90 tablet:w-per70 w-per50 whitespace-nowrap p-1.5 text-gray-900 align-center pt-1 overflow-hidden text-ellipsis">
                      {game.gameName}
                    </span>
                  </div>
                ) : (
                  <div className="bg-createInput-gray text-createInput-gray border-solid border-stone-700 w-full h-full p-1 rounded">
                    **
                  </div>
                )}
              </div>
              <button
                disabled={isFiexedGame}
                className={`${
                  isFiexedGame
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-moa-pink hover:bg-moa-pink-dark"
                } laptop:col-span-1 tablet:col-span-2 col-span-2 text-white font-medium rounded-lg text-[0.8em] px-[0.5em] py-2.5 text-center`}
                onClick={onToggleModal}>
                게임 검색
              </button>
              {/* 모달 */}
              {isFiexedGame ? (
                ""
              ) : (
                <GameSearchModal hidden={modalHidden} setHidden={onToggleModal} setGame={setGame} />
              )}
            </div>
            <div className="grid tablet:grid-flow-col grid-flow-row mb-3">
              <div className="grid grid-flow-col col-span-2 tablet:mx-2 mr-1 tablet:mb-0 mb-[0.6em]">
                <span className="tablet:col-span-1 flex items-center text-[0.9em]">
                  플레이 인원
                </span>
                <input
                  name="maxPlayer"
                  value={moa.maxPlayer}
                  onChange={onChange}
                  type="number"
                  className="tablet:col-span-4 col-span-5 w-full text-main-500 bg-createInput-gray rounded text-[0.9em]"
                  min="2"
                  max="12"
                  placeholder="최대 플레이 인원은 12명입니다."
                />
              </div>
              <div className="grid grid-flow-col col-span-2">
                <span className="col-span-1 flex tablet:justify-center items-center tablet:mr-2 text-[0.9em]">
                  시작시간
                </span>
                <div className="tablet:col-span-7 col-span-3">
                  <input
                    name="startTime"
                    value={moa.startTime}
                    onChange={onChange}
                    className="w-full text-main-500 bg-createInput-gray rounded text-[0.9em]"
                    type="datetime-local"
                    min={realDate}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3 flex">
              <textarea
                name="partyDescription"
                value={moa.partyDescription}
                onChange={onChange}
                className="w-full text-main-500 bg-createInput-gray rounded min-h-[10em] tablet:min-h-[13em]"
                id=""
                cols=""
                rows="10"
                placeholder="모집 내용을 입력해주세요."></textarea>
            </div>
            <div className="grid grid-flow-col mb-[1.2em]">
              <span className="col-span-1 flex items-center text-[0.9em]">음성 채팅 링크</span>
              <input
                name="chatLink"
                value={moa.chatLink}
                onChange={onChange}
                className="col-span-11 text-main-500 bg-createInput-gray w-full rounded"
                type="text"
                placeholder="파티원에게 공유할 채팅 링크를 입력해주세요. (선택)"
              />
            </div>
            {/* 파티 태그 하드 코딩 */}
            <div className="grid tablet:grid-flow-col grid-flow-row">
              <div className="col-span-1 tablet:text-[1em] text-[0.9em] mb-[0.5em]">파티 태그</div>
              <div>
                <div className="grid grid-flow-col tablet:col-span-5">
                  {items.map((item, index) => (
                    <div key={index}>
                      <input
                        checked={checkedList.includes(`${index + 1}`) ? true : false}
                        onChange={onCheckedElement}
                        value={index + 1}
                        id={item}
                        name={item}
                        type="checkbox"
                        className="w-[0.9em] h-[0.9em] tablet:w-4 tablet:h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={item}
                        className="ml-[0.2em] tablet:ml-2 tablet:text-[0.95em] text-[0.8em] font-medium text-main-100">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex my-5">
            <div className="m-auto mt-[0.5em] mb-[3em]">
              <button
                onClick={handleCancel}
                className="w-32 h-12 mx-3 bg-mainBtn-blue hover:bg-mainBtn-blue-hover rounded-lg text-sm">
                취소
              </button>
              <button
                onClick={handleSubmit}
                className="w-32 h-12 mx-3 bg-moa-pink hover:bg-moa-pink-dark rounded-lg text-sm">
                파티 만들기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoaCreate;
